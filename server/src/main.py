from __future__ import annotations

from datetime import date, datetime, timedelta
from typing import Any

from fastapi import APIRouter, Depends, FastAPI, HTTPException, Query, Response, status
from fastapi.middleware.cors import CORSMiddleware
from psycopg.rows import dict_row

from .auth.security import create_token, get_current_user, hash_password, require_roles, verify_password
from .database import create_report as create_postgres_report, create_user, delete_report as delete_postgres_report, delete_user, find_user_by_email, get_report as get_postgres_report, initialize_database, initialize_notifications_table, initialize_reports_table, list_reports as list_postgres_reports, list_users as list_database_users, restore_user, update_user, update_user_password
from .database.audit_logs import list_audit_logs as list_database_audit_logs
from .database.notifications import create_notification as create_postgres_notification, list_notifications as list_postgres_notifications, mark_all_notifications_read, mark_notification_read as mark_postgres_notification_read
from .database.obligations import list_obligations as list_postgres_obligations
from .database.session import Base, engine
from .database.users import get_connection
from .schemas import (
    APIRecord,
    ComplianceLevel,
    ContractCreate,
    ContractStatus,
    ContractUpdate,
    ContractVersionCreate,
    NotificationCreate,
    ObligationCreate,
    ObligationStatus,
    ObligationUpdate,
    RenewalCreate,
    RenewalStatus,
    RenewalUpdate,
    ReportCreate,
    PasswordReset,
    Role,
    TokenResponse,
    UserCreate,
    UserLogin,
    UserPublic,
    UserUpdate,
)
from .storage import store

app = FastAPI(
    title="ContractIQ: Contract Obligation Tracking API",
    version="1.0.0",
    description="Backend API for contracts, obligations, renewals, compliance, notifications, reports, and audit logs.",
)
api_router = APIRouter()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
@app.on_event("startup")
def startup() -> None:
    initialize_database()
    initialize_notifications_table()
    initialize_reports_table()
    Base.metadata.create_all(bind=engine)

def public_user(user: dict[str, Any]) -> dict[str, Any]:
    return {key: value for key, value in user.items() if key != "password_hash"}


def model_payload(model: Any) -> dict[str, Any]:
    return model.model_dump(mode="json", exclude_unset=True)


def ensure_record(table: str, record_id: str) -> dict[str, Any]:
    record = store.get(table, record_id)
    if not record:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"{table} record not found")
    return record


def parse_date(value: str | None) -> date | None:
    if isinstance(value, date):
        return value
    return date.fromisoformat(value) if value else None
@api_router.get("/")
def home():
    return {
        "message": "Contract Obligation Tracking API"
    }

@api_router.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "contractiq-api"}


@api_router.post("/api/auth/register", response_model=UserPublic, status_code=status.HTTP_201_CREATED)
def register(payload: UserCreate) -> dict[str, Any]:
    if find_user_by_email(payload.email):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email is already registered")

    user = create_user(
        {
            "name": payload.name,
            "email": payload.email.lower(),
            "password_hash": hash_password(payload.password),
            "role": payload.role.value,
            "department": payload.department,
        },
    )
    store.audit("registered", "user", user["id"], user["id"])
    return public_user(user)


@api_router.post("/api/auth/login", response_model=TokenResponse)
def login(payload: UserLogin) -> dict[str, str]:
    user = find_user_by_email(payload.email)
    if not user or not verify_password(payload.password, user["password_hash"]):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")
    if user["role"] != payload.role.value:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Selected role does not match this account")
    store.audit("logged in", "user", user["id"], user["id"])
    return {"access_token": create_token(user), "token_type": "bearer"}


@api_router.post("/api/auth/forgot-password")
def forgot_password(payload: PasswordReset) -> dict[str, str]:
    if not find_user_by_email(payload.email):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No account found for this email")

    user = update_user_password(payload.email, hash_password(payload.new_password))
    store.audit("reset password", "user", user["id"], user["id"])
    return {"message": "Password reset successful. You can sign in with the new password."}


@api_router.get("/api/auth/me", response_model=UserPublic)
def me(current_user: dict[str, Any] = Depends(get_current_user)) -> dict[str, Any]:
    return public_user(current_user)


@api_router.get("/api/users", response_model=list[UserPublic])
def list_users(_: dict[str, Any] = Depends(get_current_user)) -> list[dict[str, Any]]:
    return [public_user(user) for user in list_database_users()]


@api_router.get("/api/users/deleted", response_model=list[UserPublic])
def list_deleted_users(_: dict[str, Any] = Depends(get_current_user)) -> list[dict[str, Any]]:
    return [public_user(user) for user in list_database_users(include_deleted=True) if user.get("deleted_at")]


@api_router.get("/api/users/{user_id}/activities", response_model=list[APIRecord])
def user_activity_history(
    user_id: str,
    _: dict[str, Any] = Depends(get_current_user),
) -> list[dict[str, Any]]:
    return [
        activity
        for activity in store.list("activities")
        if activity.get("entity_type") == "user" and activity.get("entity_id") == user_id
    ]


@api_router.patch("/api/users/{user_id}", response_model=UserPublic)
def update_managed_user(
    user_id: str,
    payload: UserUpdate,
    current_user: dict[str, Any] = Depends(get_current_user),
) -> dict[str, Any]:
    data = model_payload(payload)
    if "password" in data:
        data["password_hash"] = hash_password(data.pop("password"))
    user = update_user(user_id, data)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    store.audit("updated", "user", user_id, current_user["id"])
    return public_user(user)


@api_router.delete("/api/users/{user_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_managed_user(
    user_id: str,
    current_user: dict[str, Any] = Depends(get_current_user),
) -> None:
    if user_id == current_user["id"]:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="You cannot delete your own account")
    if not delete_user(user_id):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    store.audit("deleted", "user", user_id, current_user["id"])


@api_router.post("/api/users/{user_id}/restore", response_model=UserPublic)
def restore_managed_user(
    user_id: str,
    current_user: dict[str, Any] = Depends(get_current_user),
) -> dict[str, Any]:
    user = restore_user(user_id)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Deleted user not found")
    store.audit("restored", "user", user_id, current_user["id"])
    return public_user(user)


@api_router.get("/api/contracts")
def list_contracts(
    search: str | None = Query(default=None),
    status_filter: ContractStatus | None = Query(default=None, alias="status"),
    category: str | None = None,
    _: dict[str, Any] = Depends(get_current_user),
) -> list[dict[str, Any]]:
    clauses: list[str] = []
    parameters: list[Any] = []
    if search:
        clauses.append("(title ILIKE %s OR contract_number ILIKE %s OR category ILIKE %s)")
        parameters.extend([f"%{search}%", f"%{search}%", f"%{search}%"])
    if status_filter:
        clauses.append("status = %s")
        parameters.append(status_filter.value)
    if category:
        clauses.append("category ILIKE %s")
        parameters.append(category)

    where_clause = f"WHERE {' AND '.join(clauses)}" if clauses else ""
    with get_connection() as connection:
        with connection.cursor(row_factory=dict_row) as cursor:
            cursor.execute(
                f"""
                SELECT
                    contract_id::text AS id,
                    title AS name,
                    COALESCE(contract_number, contract_id::text) AS contract_id,
                    category,
                    COALESCE(category, 'Unassigned') AS department,
                    COALESCE(description, '-') AS party,
                    status,
                    end_date AS expiry,
                    NULL::numeric AS value,
                    '1.0' AS version
                FROM contracts
                {where_clause}
                ORDER BY created_at DESC NULLS LAST, contract_id
                """,
                parameters,
            )
            return [dict(item) for item in cursor.fetchall()]


@api_router.post("/api/contracts", status_code=status.HTTP_201_CREATED)
def create_contract(payload: ContractCreate, current_user: dict[str, Any] = Depends(get_current_user)) -> dict[str, Any]:
    data = model_payload(payload)
    with get_connection() as connection:
        with connection.cursor(row_factory=dict_row) as cursor:
            cursor.execute(
                """
                INSERT INTO contracts (
                    title, contract_number, category, description, start_date,
                    end_date, status, uploaded_by, assigned_to
                )
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING contract_id::text AS id, title AS name,
                          COALESCE(contract_number, contract_id::text) AS contract_id,
                          category, COALESCE(category, 'Unassigned') AS department,
                          COALESCE(description, '-') AS party, status,
                          end_date AS expiry, NULL::numeric AS value, '1.0' AS version
                """,
                (
                    data["title"], data.get("contract_number"), data["category"],
                    data.get("counterparty"), data.get("effective_date"),
                    data.get("expiry_date"), data["status"], current_user["id"],
                    data.get("owner_id") or current_user["id"],
                ),
            )
            return dict(cursor.fetchone())


@api_router.get("/api/contracts/stats/summary")
def contract_stats(_: dict[str, Any] = Depends(get_current_user)) -> dict[str, int]:
    with get_connection() as connection:
        with connection.cursor(row_factory=dict_row) as cursor:
            cursor.execute("SELECT status, COUNT(*)::int AS total FROM contracts GROUP BY status")
            rows = cursor.fetchall()
    counts = {str(row["status"]).lower().replace(" ", "_"): row["total"] for row in rows}
    return {
        "total": sum(counts.values()),
        "draft": counts.get("draft", 0),
        "under_review": counts.get("under_review", 0),
        "approved": counts.get("approved", 0),
        "active": counts.get("active", 0),
        "expired": counts.get("expired", 0),
        "terminated": counts.get("terminated", 0),
    }


@api_router.get("/api/contracts/{contract_id}")
def get_contract(contract_id: str, _: dict[str, Any] = Depends(get_current_user)) -> dict[str, Any]:
    contracts = list_contracts(None, None, None, {})
    contract = next((item for item in contracts if item["id"] == contract_id), None)
    if not contract:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Contract not found")
    return contract


@api_router.patch("/api/contracts/{contract_id}")
def update_contract(
    contract_id: str,
    payload: ContractUpdate,
    current_user: dict[str, Any] = Depends(get_current_user),
) -> dict[str, Any]:
    data = model_payload(payload)
    fields = {
        "title": "title = %s", "contract_number": "contract_number = %s",
        "category": "category = %s", "counterparty": "description = %s",
        "effective_date": "start_date = %s", "expiry_date": "end_date = %s",
        "status": "status = %s",
    }
    keys = [key for key in data if key in fields]
    if not keys:
        return get_contract(contract_id, current_user)
    with get_connection() as connection:
        with connection.cursor(row_factory=dict_row) as cursor:
            cursor.execute(
                f"""UPDATE contracts SET {', '.join(fields[key] for key in keys)}, updated_at = NOW()
                    WHERE contract_id = %s
                    RETURNING contract_id::text AS id, title AS name,
                              COALESCE(contract_number, contract_id::text) AS contract_id,
                              category, COALESCE(category, 'Unassigned') AS department,
                              COALESCE(description, '-') AS party, status,
                              end_date AS expiry, NULL::numeric AS value, '1.0' AS version""",
                (*[data[key] for key in keys], contract_id),
            )
            contract = cursor.fetchone()
    if not contract:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Contract not found")
    return dict(contract)


@api_router.delete("/api/contracts/{contract_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_contract(contract_id: str, _: dict[str, Any] = Depends(get_current_user)) -> None:
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute("DELETE FROM contracts WHERE contract_id = %s", (contract_id,))
            if cursor.rowcount == 0:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Contract not found")


@api_router.post("/api/contracts/{contract_id}/archive", response_model=APIRecord)
def archive_contract(contract_id: str, current_user: dict[str, Any] = Depends(get_current_user)) -> dict[str, Any]:
    contract = store.update("contracts", contract_id, {"status": ContractStatus.archived.value})
    if not contract:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Contract not found")
    store.audit("archived", "contract", contract_id, current_user["id"])
    return contract


@api_router.post("/api/contract-versions", response_model=APIRecord, status_code=status.HTTP_201_CREATED)
def create_contract_version(
    payload: ContractVersionCreate,
    current_user: dict[str, Any] = Depends(get_current_user),
) -> dict[str, Any]:
    ensure_record("contracts", payload.contract_id)
    version = store.create("contract_versions", model_payload(payload))
    store.audit("created", "contract_version", version["id"], current_user["id"])
    return version


@api_router.get("/api/obligations", response_model=list[APIRecord])
def list_obligations(
    contract_id: str | None = None,
    status_filter: ObligationStatus | None = Query(default=None, alias="status"),
    _: dict[str, Any] = Depends(get_current_user),
) -> list[dict[str, Any]]:
    obligations = list_postgres_obligations()
    if contract_id:
        obligations = [item for item in obligations if item["contract_id"] == contract_id]
    if status_filter:
        obligations = [item for item in obligations if item["status"] == status_filter.value]
    return obligations


@api_router.post("/api/obligations", response_model=APIRecord, status_code=status.HTTP_201_CREATED)
def create_obligation(payload: ObligationCreate, current_user: dict[str, Any] = Depends(get_current_user)) -> dict[str, Any]:
    ensure_record("contracts", payload.contract_id)
    obligation = store.create("obligations", model_payload(payload))
    store.audit("created", "obligation", obligation["id"], current_user["id"])
    return obligation


@api_router.patch("/api/obligations/{obligation_id}", response_model=APIRecord)
def update_obligation(
    obligation_id: str,
    payload: ObligationUpdate,
    current_user: dict[str, Any] = Depends(get_current_user),
) -> dict[str, Any]:
    obligation = store.update("obligations", obligation_id, model_payload(payload))
    if not obligation:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Obligation not found")
    store.audit("updated", "obligation", obligation_id, current_user["id"], model_payload(payload))
    return obligation


@api_router.get("/api/renewals")
def list_renewals(
    status_filter: RenewalStatus | None = Query(default=None, alias="status"),
    _: dict[str, Any] = Depends(get_current_user),
) -> list[dict[str, Any]]:
    query = """
        SELECT
            r.renewal_id::text AS id,
            r.contract_id::text AS contract_id,
            COALESCE(c.contract_number, c.title, 'Contract') AS contract_name,
            r.renewal_date,
            r.reminder_date,
            r.status,
            r.remarks
        FROM renewals AS r
        LEFT JOIN contracts AS c ON c.contract_id = r.contract_id
    """
    parameters: list[Any] = []
    if status_filter:
        query += " WHERE r.status = %s"
        parameters.append(status_filter.value)
    query += " ORDER BY r.renewal_date NULLS LAST, r.renewal_id"
    with get_connection() as connection:
        with connection.cursor(row_factory=dict_row) as cursor:
            cursor.execute(query, parameters)
            return [dict(item) for item in cursor.fetchall()]


@api_router.post("/api/renewals", response_model=APIRecord, status_code=status.HTTP_201_CREATED)
def create_renewal(payload: RenewalCreate, current_user: dict[str, Any] = Depends(get_current_user)) -> dict[str, Any]:
    ensure_record("contracts", payload.contract_id)
    renewal = store.create("renewals", model_payload(payload))
    store.audit("created", "renewal", renewal["id"], current_user["id"])
    return renewal


@api_router.patch("/api/renewals/{renewal_id}", response_model=APIRecord)
def update_renewal(
    renewal_id: str,
    payload: RenewalUpdate,
    current_user: dict[str, Any] = Depends(get_current_user),
) -> dict[str, Any]:
    renewal = store.update("renewals", renewal_id, model_payload(payload))
    if not renewal:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Renewal not found")
    store.audit("updated", "renewal", renewal_id, current_user["id"], model_payload(payload))
    return renewal


@api_router.get("/api/compliance/summary")
def compliance_summary(_: dict[str, Any] = Depends(get_current_user)) -> dict[str, Any]:
    obligations = list_postgres_obligations()
    by_level = {level.value: 0 for level in ComplianceLevel}
    for obligation in obligations:
        by_level[obligation["compliance_level"]] = by_level.get(obligation["compliance_level"], 0) + 1

    overdue = 0
    today = date.today()
    for obligation in obligations:
        due_date = parse_date(obligation.get("due_date"))
        if due_date and due_date < today and obligation["status"] != ObligationStatus.completed.value:
            overdue += 1

    return {"total_obligations": len(obligations), "by_compliance_level": by_level, "overdue_obligations": overdue}


def postgres_records(query: str) -> list[dict[str, Any]]:
    """Read a Compliance module table using PostgreSQL column names."""
    with get_connection() as connection:
        with connection.cursor(row_factory=dict_row) as cursor:
            cursor.execute(query)
            return [dict(item) for item in cursor.fetchall()]


@api_router.get("/api/compliance/")
def list_compliance_records(_: dict[str, Any] = Depends(get_current_user)) -> list[dict[str, Any]]:
    return postgres_records(
        """
        SELECT
            o.obligation_id::text AS id,
            o.title,
            COALESCE(c.category, 'Unassigned') AS department,
            CASE
                WHEN lower(o.status) = 'completed' THEN 'Completed'
                WHEN lower(o.status) = 'pending' THEN 'Pending'
                ELSE o.status
            END AS status,
            CASE lower(COALESCE(o.compliance_level, ''))
                WHEN 'compliant' THEN 100.0
                WHEN 'low' THEN 85.0
                WHEN 'medium' THEN 70.0
                WHEN 'high' THEN 55.0
                WHEN 'non-compliant' THEN 40.0
                ELSE 70.0
            END AS compliance_score,
            CASE
                WHEN lower(COALESCE(o.compliance_level, '')) IN ('high', 'non-compliant') THEN 'High'
                WHEN lower(COALESCE(o.compliance_level, '')) = 'medium' THEN 'Medium'
                ELSE 'Low'
            END AS risk_level,
            o.created_at
        FROM obligations AS o
        LEFT JOIN contracts AS c ON c.contract_id = o.contract_id
        ORDER BY o.created_at DESC NULLS LAST, o.obligation_id DESC
        """
    )


@api_router.get("/api/dashboard/kpis")
def dashboard_kpis(_: dict[str, Any] = Depends(get_current_user)) -> dict[str, Any]:
    with get_connection() as connection:
        with connection.cursor(row_factory=dict_row) as cursor:
            cursor.execute("SELECT COALESCE(ROUND(AVG(compliance_score))::int, 0) AS score FROM compliance")
            score = cursor.fetchone()["score"]
            cursor.execute("SELECT COUNT(*) AS total FROM report WHERE lower(status) IN ('ready', 'completed')")
            reports_ready = cursor.fetchone()["total"]
            cursor.execute("SELECT COUNT(*) AS total FROM missed_obligation")
            missed_obligations = cursor.fetchone()["total"]
            cursor.execute("SELECT COUNT(*) AS total FROM audit")
            audit_findings = cursor.fetchone()["total"]
            cursor.execute("SELECT COUNT(*) AS total FROM risk WHERE lower(severity) = 'high'")
            high_risks = cursor.fetchone()["total"]
            cursor.execute("SELECT COUNT(*) AS total FROM compliance WHERE lower(status) = 'pending'")
            pending_reviews = cursor.fetchone()["total"]
            cursor.execute("SELECT COUNT(*) AS total FROM history")
            history_records = cursor.fetchone()["total"]
    return {
        "compliance_score": score,
        "reports_ready": reports_ready,
        "missed_obligations": missed_obligations,
        "audit_findings": audit_findings,
        "high_risks": high_risks,
        "pending_reviews": pending_reviews,
        "history_records": history_records,
    }


@api_router.get("/api/missed-obligations/")
def list_missed_obligations(_: dict[str, Any] = Depends(get_current_user)) -> list[dict[str, Any]]:
    return postgres_records(
        """SELECT id, obligation_name, contract, department, owner, due_date, missed_days, priority, status
           FROM missed_obligation ORDER BY due_date NULLS LAST, id DESC"""
    )


@api_router.get("/api/risk/")
def list_risks(_: dict[str, Any] = Depends(get_current_user)) -> list[dict[str, Any]]:
    return postgres_records("SELECT id, risk_name, department, severity, status, owner FROM risk ORDER BY id DESC")


@api_router.get("/api/audit/")
def list_compliance_audits(_: dict[str, Any] = Depends(get_current_user)) -> list[dict[str, Any]]:
    return postgres_records("SELECT id, audit_name, department, severity, status, audit_date FROM audit ORDER BY audit_date DESC NULLS LAST, id DESC")


@api_router.get("/api/history/")
def list_compliance_history(_: dict[str, Any] = Depends(get_current_user)) -> list[dict[str, Any]]:
    return postgres_records("SELECT id, activity, department, status, activity_date FROM history ORDER BY activity_date DESC NULLS LAST, id DESC")


@api_router.get("/api/report/")
def list_compliance_reports(_: dict[str, Any] = Depends(get_current_user)) -> list[dict[str, Any]]:
    return postgres_records("SELECT id, title, department, status, file_size, generated_date FROM report ORDER BY generated_date DESC NULLS LAST, id DESC")

def role_dashboard(role: str) -> dict[str, Any]:
    dashboards = {
        Role.administrator.value: {
            "name": "Admin Dashboard",
            "features": ["User Management", "Contract Statistics", "System Monitoring", "Activity Logs"],
        },
        Role.legal_manager.value: {
            "name": "Legal Dashboard",
            "features": ["Active Contracts", "Upcoming Renewals", "Pending Obligations", "Recent Activities"],
        },
        Role.compliance_officer.value: {
            "name": "Compliance Dashboard",
            "features": ["Compliance Reports", "Missed Deadlines", "Risk Indicators", "Audit Summary"],
        },
        Role.contract_manager.value: {
            "name": "Contract Manager Dashboard",
            "features": ["Contract Repository", "Approval Workflow", "Version Management", "Assignments"],
        },
        Role.department_head.value: {
            "name": "Department Head Dashboard",
            "features": ["Department Contracts", "Obligation Ownership", "Renewal Approvals", "Performance"],
        },
        Role.employee.value: {
            "name": "Employee Dashboard",
            "features": ["Assigned Obligations", "Notifications", "Contract Access", "Profile"],
        },
    }
    return dashboards.get(role, dashboards[Role.employee.value])


@api_router.get("/api/dashboard")
def dashboard(current_user: dict[str, Any] = Depends(get_current_user)) -> dict[str, Any]:
    # Dashboard data is read from PostgreSQL.  This ensures the records
    # inserted through pgAdmin/psql are the same records shown after login.
    with get_connection() as connection:
        with connection.cursor(row_factory=dict_row) as cursor:
            cursor.execute(
                """
                SELECT contract_id::text AS id, title, contract_number, category,
                       start_date, end_date, status, created_at
                FROM contracts
                ORDER BY created_at DESC NULLS LAST
                """
            )
            contracts = [dict(item) for item in cursor.fetchall()]
            cursor.execute(
                """
                SELECT renewal_id::text AS id, contract_id::text AS contract_id,
                       renewal_date, reminder_date, status
                FROM renewals
                ORDER BY renewal_date NULLS LAST
                """
            )
            renewals = [dict(item) for item in cursor.fetchall()]

    obligations = list_postgres_obligations()
    notifications = list_postgres_notifications(
        current_user["id"],
        current_user["role"] == Role.administrator.value,
    )
    activities = list_database_audit_logs()[:10]

    # The dashboard page consumes chart and table ready arrays.  Keep this
    # transformation here so the frontend does not have to infer API fields.
    today = date.today()
    compliance_counts: dict[str, int] = {}
    for obligation in obligations:
        level = obligation.get("compliance_level") or "Pending"
        compliance_counts[level] = compliance_counts.get(level, 0) + 1

    deadlines = []
    for obligation in sorted(obligations, key=lambda item: item.get("due_date") or "9999-12-31")[:8]:
        assignee = obligation.get("owner") or "Unassigned"
        deadlines.append({
            "id": obligation["id"],
            "contract_number": obligation.get("contract_number") or "Contract",
            "obligation": obligation.get("title", "Untitled obligation"),
            "due_date": obligation.get("due_date") or "Not scheduled",
            "assignee": assignee,
            "assignee_initials": "".join(part[0] for part in assignee.split()[:2]).upper() or "-",
            "priority": obligation.get("compliance_level") or "Normal",
            "status": obligation.get("status") or "Pending",
        })

    def as_date(value: Any) -> date | None:
        if isinstance(value, datetime):
            return value.date()
        return value if isinstance(value, date) else None

    def previous_months(reference: date, count: int = 7) -> list[date]:
        months = []
        year, month = reference.year, reference.month
        for _ in range(count):
            months.append(date(year, month, 1))
            month -= 1
            if month == 0:
                year, month = year - 1, 12
        return list(reversed(months))

    def next_month_start(value: date) -> date:
        return date(value.year + (value.month == 12), 1 if value.month == 12 else value.month + 1, 1)

    contract_dates = [
        value
        for item in contracts
        for value in (
            as_date(item.get("created_at")),
            as_date(item.get("end_date")) if item.get("status") == ContractStatus.expired.value else None,
        )
        if value
    ]
    contract_reference = max((value for value in contract_dates if value), default=today)
    contract_months = previous_months(contract_reference)
    contract_chart = []
    for month_start in contract_months:
        month_end = next_month_start(month_start)
        contract_chart.append({
            "month": month_start.strftime("%b"),
            "active": sum(
                1 for item in contracts
                if item.get("status") == ContractStatus.active.value
                and (created := as_date(item.get("created_at")))
                and created < month_end
            ),
            "new": sum(
                1 for item in contracts
                if (created := as_date(item.get("created_at")))
                and month_start <= created < month_end
            ),
            "expired": sum(
                1 for item in contracts
                if item.get("status") == ContractStatus.expired.value
                and (expiry_date := as_date(item.get("end_date")))
                and month_start <= expiry_date < month_end
            ),
        })

    renewal_dates = [as_date(item.get("renewal_date")) for item in renewals]
    renewal_reference = max((value for value in renewal_dates if value), default=today)
    renewal_chart = []
    for month_start in previous_months(renewal_reference):
        month_end = next_month_start(month_start)
        renewal_chart.append({
            "month": month_start.strftime("%b"),
            "renewals": sum(
                1 for item in renewals
                if (renewal_date := as_date(item.get("renewal_date")))
                and month_start <= renewal_date < month_end
            ),
        })

    active_contracts = sum(1 for item in contracts if item.get("status") == ContractStatus.active.value)
    upcoming_renewals = sum(
        1 for item in renewals
        if (renewal_date := as_date(item.get("renewal_date")))
        and today <= renewal_date <= date(today.year, today.month, today.day) + timedelta(days=180)
    )
    pending_obligations = sum(
        1 for item in obligations
        if item.get("status") in {ObligationStatus.pending.value, ObligationStatus.in_progress.value}
    )
    compliant_obligations = sum(
        1 for item in obligations if str(item.get("compliance_level", "")).lower() == "compliant"
    )
    compliance_score = round((compliant_obligations / len(obligations)) * 100) if obligations else 0

    return {
        "stats": [
            {"key": "total_contracts", "label": "Total Contracts", "value": len(contracts), "change": "All categories"},
            {"key": "active_contracts", "label": "Active Contracts", "value": active_contracts, "change": "Active now"},
            {"key": "upcoming_renewals", "label": "Upcoming Renewals", "value": upcoming_renewals, "change": "Next 180 days"},
            {"key": "pending_obligations", "label": "Pending Obligations", "value": pending_obligations, "change": "Needs attention"},
            {"key": "compliance_score", "label": "Compliance Score", "value": f"{compliance_score}%", "change": "Completion rate"},
        ],
        "contracts": contract_chart,
        "renewals": renewal_chart,
        "deadlines": deadlines,
        "activities": [
            {
                "id": item["id"],
                "message": item.get("action", "System activity"),
                "type": item.get("entity_type", "default"),
                "time_ago": str(item.get("created_at", ""))[:10],
            }
            for item in activities
        ],
        "active_contracts": active_contracts,
        "upcoming_renewals": upcoming_renewals,
        "pending_obligations": pending_obligations,
        "unread_notifications": sum(1 for item in notifications if not item.get("read", False)),
        "compliance": [{"name": name, "value": value} for name, value in compliance_counts.items()],
        "recent_activities": activities,
        "user": public_user(current_user),
        "role_dashboard": role_dashboard(current_user["role"]),
    }


@api_router.get("/api/notifications", response_model=list[APIRecord])
def list_notifications(current_user: dict[str, Any] = Depends(get_current_user)) -> list[dict[str, Any]]:
    return list_postgres_notifications(current_user["id"], current_user["role"] == Role.administrator.value)


@api_router.post("/api/notifications", response_model=APIRecord, status_code=status.HTTP_201_CREATED)
def create_notification(
    payload: NotificationCreate,
    current_user: dict[str, Any] = Depends(require_roles(Role.administrator.value, Role.legal_manager.value, Role.compliance_officer.value)),
) -> dict[str, Any]:
    notification = create_postgres_notification(model_payload(payload))
    store.audit("created", "notification", notification["id"], current_user["id"])
    return notification


@api_router.post("/api/notifications/{notification_id}/read", response_model=APIRecord)
def mark_notification_read(notification_id: str, current_user: dict[str, Any] = Depends(get_current_user)) -> dict[str, Any]:
    updated = mark_postgres_notification_read(notification_id, current_user["id"], current_user["role"] == Role.administrator.value)
    if not updated:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Notification not found")
    return updated


@api_router.post("/api/notifications/read-all")
def mark_all_notifications_as_read(current_user: dict[str, Any] = Depends(get_current_user)) -> dict[str, int]:
    updated_count = mark_all_notifications_read(current_user["id"], current_user["role"] == Role.administrator.value)
    return {"updated_count": updated_count}


@api_router.post("/api/reports", response_model=APIRecord, status_code=status.HTTP_201_CREATED)
def create_report(payload: ReportCreate, current_user: dict[str, Any] = Depends(get_current_user)) -> dict[str, Any]:
    report = create_postgres_report(model_payload(payload), current_user["id"])
    store.audit("generated", "report", report["id"], current_user["id"])
    return report


@api_router.get("/api/reports", response_model=list[APIRecord])
def list_reports(_: dict[str, Any] = Depends(get_current_user)) -> list[dict[str, Any]]:
    return list_postgres_reports()


@api_router.get("/api/reports/export/csv")
def export_reports_csv(_: dict[str, Any] = Depends(get_current_user)) -> Response:
    reports = list_postgres_reports()
    header = "Name,Type,Department,Status,Value,Due date,Generated at"

    def csv_value(value: Any) -> str:
        text = str(value or "")
        return '"' + text.replace('"', '""') + '"'

    rows = [
        ",".join([
            csv_value(report.get("name")),
            csv_value(report.get("report_type")),
            csv_value(report.get("department")),
            csv_value(report.get("status")),
            csv_value(report.get("value")),
            csv_value(report.get("due_date")),
            csv_value(report.get("generated_at")),
        ])
        for report in reports
    ]
    return Response(
        content="\n".join([header, *rows]),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=contractiq-reports.csv"},
    )


@api_router.delete("/api/reports/{report_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_report(report_id: str, current_user: dict[str, Any] = Depends(get_current_user)) -> None:
    report = get_postgres_report(report_id)
    if not report:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Report not found")
    if report.get("generated_by") != current_user["id"] and current_user["role"] not in {
        Role.administrator.value,
        Role.legal_manager.value,
    }:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient permissions to delete this report")
    delete_postgres_report(report_id)
    store.audit("deleted", "report", report_id, current_user["id"])


@api_router.get("/api/audit-logs", response_model=list[APIRecord])
def list_audit_logs(_: dict[str, Any] = Depends(get_current_user)) -> list[dict[str, Any]]:
    return list_database_audit_logs()


@api_router.get("/api/activities", response_model=list[APIRecord])
def list_activities(_: dict[str, Any] = Depends(get_current_user)) -> list[dict[str, Any]]:
    return sorted(store.list("activities"), key=lambda item: item["created_at"], reverse=True)


app.include_router(api_router)
