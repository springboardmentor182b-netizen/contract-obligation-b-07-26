from __future__ import annotations

import csv
from datetime import date, datetime, timedelta
from io import StringIO
from typing import Any

from fastapi import APIRouter, Depends, FastAPI, HTTPException, Query, Response, status
from fastapi.middleware.cors import CORSMiddleware
from psycopg.rows import dict_row

from .dashboard.router import router as dashboard_router
from .models import audit, compliance, history, missed_obligation, report, risk  # noqa: F401
from .routers import audit as audit_router
from .routers import compliance as compliance_router
from .routers import header, history as history_router, kpi, missed_obligation as missed_obligation_router
from .routers import report as report_router
from .routers import risk as risk_router
from .routers import settings

from .auth.security import create_token, get_current_user, hash_password, require_roles, verify_password
from .database import create_api_key, create_report as create_postgres_report, create_session, create_user, delete_report as delete_postgres_report, delete_user, find_user_by_email, get_preferences, get_report as get_postgres_report, initialize_database, initialize_notifications_table, initialize_reports_table, initialize_sessions_table, initialize_settings_table, list_api_keys, list_reports as list_postgres_reports, list_sessions, list_users as list_database_users, restore_user, revoke_api_key, revoke_session, update_preferences, update_user, update_user_password
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
    description="Backend API for contracts, obligations, renewals, compliance, notifications, reports, audit logs, and settings.",
)
api_router = APIRouter()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_origin_regex=r"^http://(localhost|127\.0\.0\.1):\d+$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup() -> None:
    initialize_database()
    initialize_notifications_table()
    initialize_reports_table()
    initialize_settings_table()
    initialize_sessions_table()
    Base.metadata.create_all(bind=engine)

def public_user(user: dict[str, Any]) -> dict[str, Any]:
    return {key: value for key, value in user.items() if key != "password_hash"}


def model_payload(model: Any) -> dict[str, Any]:
    return model.model_dump(mode="json", exclude_unset=True)


def database_role(role: str) -> str:
    return {
        "administrator": "Administrator",
        "legal_manager": "Legal Manager",
        "compliance_officer": "Compliance Officer",
        "contract_manager": "Contract Manager",
        "user": "Employee",
    }.get(role, role)


def ensure_record(table: str, record_id: str) -> dict[str, Any]:
    record = store.get(table, record_id)
    if not record:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"{table} record not found")
    return record


def parse_date(value: str | None) -> date | None:
    if isinstance(value, date):
        return value
    return date.fromisoformat(value) if value else None


def csv_download(filename: str, header: list[str], rows: list[list[Any]], media_type: str = "text/csv") -> Response:
    output = StringIO()
    writer = csv.writer(output)
    writer.writerow(header)
    writer.writerows(rows)
    return Response(
        content=output.getvalue(),
        media_type=f"{media_type}; charset=utf-8",
        headers={"Content-Disposition": f'attachment; filename="{filename}"'},
    )
@api_router.get("/")
def home():
    return {
        "message": "Contract Obligation Tracking API"
    }

@api_router.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "contractiq-api"}


@api_router.post("/api/auth/register", response_model=UserPublic, status_code=status.HTTP_201_CREATED)
def register(payload: dict[str, Any]) -> dict[str, Any]:
    name = str(payload.get("name") or payload.get("full_name") or "").strip()
    email = str(payload.get("email") or "").strip().lower()
    password = str(payload.get("password") or "")
    role = str(payload.get("role") or "").strip()
    department = str(payload.get("department") or "").strip() or None

    if not name or not email or not password or not role:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_CONTENT,
            detail="Name, email, password, and role are required",
        )
    if "@" not in email or email.startswith("@") or email.endswith("@"):
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_CONTENT, detail="Enter a valid email address")

    if find_user_by_email(email):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email is already registered")

    user = create_user(
        {
            "name": name,
            "email": email,
            "password_hash": hash_password(password),
            "role": database_role(role),
            "department": department,
        },
    )
    store.audit("registered", "user", user["id"], user["id"])
    return public_user(user)


@api_router.post("/api/auth/login", response_model=TokenResponse)
def login(payload: dict[str, str]) -> dict[str, str]:
    email = str(payload.get("email", "")).strip()
    password = str(payload.get("password", ""))
    selected_role = str(payload.get("role", "")).strip()
    if not email or not password or not selected_role:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_CONTENT, detail="Email, password, and role are required")
    user = find_user_by_email(email)
    if not user or not verify_password(password, user["password_hash"]):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")
    if user["role"].casefold() != database_role(selected_role).casefold():
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Selected role is incorrect for this account")
    store.audit("logged in", "user", user["id"], user["id"])
    import secrets
    token_id = secrets.token_urlsafe(24)
    create_session(user["id"], token_id)
    return {"access_token": create_token(user, token_id), "token_type": "bearer"}


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


@api_router.get("/api/users/{user_id}/activities", response_model=list[dict[str, Any]])
def user_activity_history(
    user_id: str,
    _: dict[str, Any] = Depends(get_current_user),
) -> list[dict[str, Any]]:
    with get_connection() as connection:
        with connection.cursor(row_factory=dict_row) as cursor:
            cursor.execute("""
                SELECT audit_id::text AS id, action AS message, module AS entity_type, created_at
                FROM audit_logs WHERE user_id = %s
                UNION ALL
                SELECT activity_id::text AS id, activity AS message, 'activity' AS entity_type, activity_time AS created_at
                FROM activities WHERE user_id = %s
                ORDER BY created_at DESC
            """, (user_id, user_id))
            return [dict(activity) for activity in cursor.fetchall()]


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


@api_router.get("/api/settings/profile")
def get_settings_profile(current_user: dict[str, Any] = Depends(get_current_user)) -> dict[str, Any]:
    profile = get_preferences(current_user["id"]).get("profile", {})
    name_parts = current_user["name"].split(maxsplit=1)
    return {
        "first_name": profile.get("first_name", name_parts[0] if name_parts else ""),
        "last_name": profile.get("last_name", name_parts[1] if len(name_parts) > 1 else ""),
        "email": current_user["email"],
        "department": current_user.get("department") or "",
        "phone": profile.get("phone", ""),
        "job_title": profile.get("job_title", current_user.get("role", "")),
        "timezone": profile.get("timezone", "UTC"),
        "profile_image": profile.get("profile_image", ""),
    }


@api_router.put("/api/settings/profile")
def update_settings_profile(payload: dict[str, Any], current_user: dict[str, Any] = Depends(get_current_user)) -> dict[str, Any]:
    first_name = str(payload.get("first_name", "")).strip()
    last_name = str(payload.get("last_name", "")).strip()
    name = " ".join(part for part in (first_name, last_name) if part) or current_user["name"]
    update_user(current_user["id"], {
        "name": name,
        "email": payload.get("email") or current_user["email"],
        "department": payload.get("department"),
    })
    preferences = update_preferences(current_user["id"], "profile", {
        key: payload[key]
        for key in ("first_name", "last_name", "phone", "job_title", "timezone", "profile_image")
        if key in payload
    })
    store.audit("updated settings", "user", current_user["id"], current_user["id"])
    return {**get_settings_profile(current_user), "preferences": preferences.get("profile", {})}


@api_router.get("/api/settings/section/{section}")
def get_settings_section(section: str, current_user: dict[str, Any] = Depends(get_current_user)) -> dict[str, Any]:
    if section not in {"security", "notifications", "appearance", "organization", "integrations"}:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Settings section not found")
    return get_preferences(current_user["id"]).get(section, {})


@api_router.put("/api/settings/section/{section}")
def update_settings_section(section: str, payload: dict[str, Any], current_user: dict[str, Any] = Depends(get_current_user)) -> dict[str, Any]:
    if section not in {"security", "notifications", "appearance", "organization", "integrations"}:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Settings section not found")
    if section == "security" and payload.get("new_password"):
        if not verify_password(str(payload.get("current_password", "")), current_user["password_hash"]):
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Current password is incorrect")
        update_user(current_user["id"], {"password_hash": hash_password(str(payload["new_password"]))})
        payload = {key: value for key, value in payload.items() if key not in {"current_password", "new_password"}}
    preferences = update_preferences(current_user["id"], section, payload)
    store.audit("updated settings", section, current_user["id"], current_user["id"])
    return preferences.get(section, {})


@api_router.get("/api/settings/api-keys")
def get_api_keys(current_user: dict[str, Any] = Depends(get_current_user)) -> dict[str, Any]:
    return {"keys": list_api_keys(current_user["id"]), "webhook_url": get_preferences(current_user["id"]).get("api_keys", {}).get("webhook_url", "")}


@api_router.post("/api/settings/api-keys", status_code=status.HTTP_201_CREATED)
def generate_api_key(payload: dict[str, Any], current_user: dict[str, Any] = Depends(get_current_user)) -> dict[str, Any]:
    import secrets

    label = str(payload.get("label") or "API Key").strip()[:100]
    environment = str(payload.get("environment") or "Production").strip()[:30]
    secret = f"ciq_{secrets.token_urlsafe(32)}"
    record = create_api_key(current_user["id"], label, environment, secret[:16], hash_password(secret))
    store.audit("created", "api_key", record["id"], current_user["id"])
    return {**record, "secret": secret}


@api_router.delete("/api/settings/api-keys/{key_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_api_key(key_id: str, current_user: dict[str, Any] = Depends(get_current_user)) -> None:
    if not revoke_api_key(current_user["id"], key_id):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="API key not found")
    store.audit("revoked", "api_key", key_id, current_user["id"])


@api_router.put("/api/settings/api-keys/webhook")
def update_webhook(payload: dict[str, Any], current_user: dict[str, Any] = Depends(get_current_user)) -> dict[str, Any]:
    webhook_url = str(payload.get("webhook_url") or "").strip()
    if webhook_url and not webhook_url.startswith(("https://", "http://")):
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_CONTENT, detail="Webhook URL must start with http:// or https://")
    return update_preferences(current_user["id"], "api_keys", {"webhook_url": webhook_url}).get("api_keys", {})


@api_router.get("/api/settings/security/sessions")
def get_security_sessions(current_user: dict[str, Any] = Depends(get_current_user)) -> dict[str, Any]:
    return {"sessions": list_sessions(current_user["id"]), "current_session_id": current_user.get("session_id")}


@api_router.delete("/api/settings/security/sessions/{session_id}", status_code=status.HTTP_204_NO_CONTENT)
def revoke_security_session(session_id: str, current_user: dict[str, Any] = Depends(get_current_user)) -> None:
    if current_user.get("session_id") == session_id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Use logout to end the current session")
    if not revoke_session(current_user["id"], session_id):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Session not found")
    store.audit("revoked", "session", session_id, current_user["id"])


@api_router.get("/api/contracts")
def list_contracts(
    search: str | None = Query(default=None),
    status_filter: str | None = Query(default=None, alias="status"),
    category: str | None = None,
    _: dict[str, Any] = Depends(get_current_user),
) -> list[dict[str, Any]]:
    clauses: list[str] = []
    parameters: list[Any] = []
    if search:
        clauses.append("(title ILIKE %s OR contract_number ILIKE %s OR category ILIKE %s)")
        parameters.extend([f"%{search}%", f"%{search}%", f"%{search}%"])
    if status_filter and status_filter != "All":
        clauses.append("status ILIKE %s")
        parameters.append(status_filter)
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


@api_router.post("/api/contracts/import", status_code=status.HTTP_201_CREATED)
def import_contracts(payload: list[dict[str, Any]], current_user: dict[str, Any] = Depends(get_current_user)) -> dict[str, Any]:
    if not payload:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_CONTENT, detail="Provide at least one contract to import")

    imported: list[dict[str, Any]] = []
    with get_connection() as connection:
        with connection.cursor(row_factory=dict_row) as cursor:
            for item in payload:
                title = str(item.get("title") or "").strip()
                if not title:
                    continue
                status_value = str(item.get("status") or "Draft")
                cursor.execute("""
                    INSERT INTO contracts (title, contract_number, category, description, start_date, end_date, status, uploaded_by, assigned_to)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
                    RETURNING contract_id::text AS id, title, contract_number, end_date
                """, (
                    title, str(item.get("contract_number") or "").strip() or None,
                    str(item.get("category") or "Service Agreements"),
                    str(item.get("counterparty") or item.get("description") or "").strip() or None,
                    item.get("effective_date") or item.get("start_date") or None,
                    item.get("expiry_date") or item.get("end_date") or None,
                    status_value, current_user["id"], current_user["id"],
                ))
                contract = dict(cursor.fetchone())
                due_date = contract.get("end_date") or date.today() + timedelta(days=30)
                cursor.execute("""
                    INSERT INTO obligations (contract_id, title, obligation_type, assigned_to, due_date, status, compliance_level, remarks)
                    VALUES (%s, %s, 'Contract Review', %s, %s, 'Pending', 'Medium', %s)
                """, (contract["id"], f"Review obligations for {contract['title']}", current_user["id"], due_date, "Created automatically from contract import."))
                if contract.get("end_date"):
                    cursor.execute("""
                        INSERT INTO renewals (contract_id, renewal_date, reminder_date, status, remarks)
                        VALUES (%s, %s, %s - INTERVAL '30 days', 'upcoming', 'Created automatically from contract import.')
                    """, (contract["id"], contract["end_date"], contract["end_date"]))
                imported.append(contract)

            if not imported:
                raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_CONTENT, detail="Each imported contract needs a title")
            cursor.execute("""
                INSERT INTO notifications (user_id, title, message, notification_type)
                VALUES (%s, %s, %s, 'contract')
            """, (current_user["id"], "Contracts imported", f"{len(imported)} contract(s) were imported with linked obligations and renewals."))
            cursor.execute("""
                INSERT INTO activities (activity_id, user_id, activity, activity_time)
                VALUES (gen_random_uuid(), %s, %s, NOW())
            """, (current_user["id"], f"Imported {len(imported)} contract(s)"))
            cursor.execute("""
                INSERT INTO audit_logs (audit_id, user_id, action, module, new_value, created_at)
                VALUES (gen_random_uuid(), %s, 'imported contracts', 'contracts', %s::jsonb, NOW())
            """, (current_user["id"], '{"source":"csv_import"}'))

    report = create_postgres_report({
        "name": f"Contract Import Summary ({len(imported)} contracts)",
        "report_type": "Contract Import",
        "department": None,
        "status": "Generated",
        "value": 0,
        "due_date": None,
        "filters": {"imported_contracts": len(imported)},
    }, current_user["id"])
    return {"imported_count": len(imported), "contracts": imported, "report_id": report["id"]}


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


@api_router.get("/api/obligations", response_model=list[dict[str, Any]])
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


def resolve_obligation_contract(cursor: Any, payload: dict[str, Any]) -> str | None:
    reference = str(payload.get("contract_id") or payload.get("contract") or payload.get("department") or "").strip()
    if not reference:
        return None
    cursor.execute("""
        SELECT contract_id::text AS id FROM contracts
        WHERE contract_id::text = %s OR title ILIKE %s OR contract_number ILIKE %s
        ORDER BY contract_id LIMIT 1
    """, (reference, reference, reference))
    record = cursor.fetchone()
    return record["id"] if record else None


def resolve_obligation_owner(cursor: Any, value: Any) -> str | None:
    reference = str(value or "").strip()
    if not reference:
        return None
    cursor.execute("""
        SELECT user_id::text AS id FROM users
        WHERE user_id::text = %s OR full_name ILIKE %s
        ORDER BY user_id LIMIT 1
    """, (reference, reference))
    record = cursor.fetchone()
    return record["id"] if record else None


@api_router.post("/api/obligations", response_model=dict[str, Any], status_code=status.HTTP_201_CREATED)
def create_obligation(payload: dict[str, Any], current_user: dict[str, Any] = Depends(get_current_user)) -> dict[str, Any]:
    title = str(payload.get("title") or "").strip()
    due_date = payload.get("due_date")
    if not title or not due_date:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_CONTENT, detail="Title and due date are required")

    with get_connection() as connection:
        with connection.cursor(row_factory=dict_row) as cursor:
            contract_id = resolve_obligation_contract(cursor, payload)
            if not contract_id:
                raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_CONTENT, detail="Select a valid existing contract")
            owner_id = resolve_obligation_owner(cursor, payload.get("owner") or payload.get("assigned_to"))
            cursor.execute("""
                INSERT INTO obligations (contract_id, title, obligation_type, assigned_to, due_date, status, compliance_level, remarks)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING obligation_id::text AS id, contract_id::text AS contract_id, title,
                          due_date, status, compliance_level, remarks, created_at
            """, (
                contract_id, title, str(payload.get("obligation_type") or "General"), owner_id,
                due_date, str(payload.get("status") or "Pending"),
                str(payload.get("priority") or payload.get("compliance_level") or "Medium"),
                str(payload.get("description") or payload.get("notes") or payload.get("remarks") or "").strip() or None,
            ))
            obligation = dict(cursor.fetchone())
    store.audit("created", "obligation", obligation["id"], current_user["id"])
    return obligation


@api_router.patch("/api/obligations/{obligation_id}", response_model=dict[str, Any])
def update_obligation(
    obligation_id: str,
    payload: dict[str, Any],
    current_user: dict[str, Any] = Depends(get_current_user),
) -> dict[str, Any]:
    with get_connection() as connection:
        with connection.cursor(row_factory=dict_row) as cursor:
            fields: dict[str, Any] = {
                "title": payload.get("title"), "due_date": payload.get("due_date"),
                "status": payload.get("status"), "compliance_level": payload.get("priority") or payload.get("compliance_level"),
                "remarks": payload.get("description") or payload.get("notes") or payload.get("remarks"),
            }
            if "owner" in payload or "assigned_to" in payload:
                fields["assigned_to"] = resolve_obligation_owner(cursor, payload.get("owner") or payload.get("assigned_to"))
            changes = {key: value for key, value in fields.items() if value is not None}
            if not changes:
                raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_CONTENT, detail="Provide at least one obligation field to update")
            assignments = ", ".join(f"{key} = %s" for key in changes)
            cursor.execute(f"""
                UPDATE obligations SET {assignments}
                WHERE obligation_id = %s
                RETURNING obligation_id::text AS id, contract_id::text AS contract_id, title,
                          due_date, status, compliance_level, remarks, created_at
            """, [*changes.values(), obligation_id])
            obligation = cursor.fetchone()
    if not obligation:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Obligation not found")
    result = dict(obligation)
    store.audit("updated", "obligation", obligation_id, current_user["id"], changes)
    return result


@api_router.delete("/api/obligations/{obligation_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_obligation(obligation_id: str, current_user: dict[str, Any] = Depends(get_current_user)) -> None:
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute("DELETE FROM obligations WHERE obligation_id = %s", (obligation_id,))
            if cursor.rowcount == 0:
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Obligation not found")
    store.audit("deleted", "obligation", obligation_id, current_user["id"])


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


@api_router.get("/api/renewals/contracts")
def list_renewal_contracts(_: dict[str, Any] = Depends(get_current_user)) -> list[dict[str, str]]:
    with get_connection() as connection:
        with connection.cursor(row_factory=dict_row) as cursor:
            cursor.execute("""
                SELECT contract_id::text AS id,
                       COALESCE(contract_number, title) AS contract_number,
                       title
                FROM contracts
                ORDER BY title, contract_number
            """)
            return [dict(item) for item in cursor.fetchall()]


@api_router.post("/api/renewals", response_model=dict[str, Any], status_code=status.HTTP_201_CREATED)
def create_renewal(payload: dict[str, Any], current_user: dict[str, Any] = Depends(get_current_user)) -> dict[str, Any]:
    contract_id = str(payload.get("contract_id", "")).strip()
    renewal_date = payload.get("renewal_date")
    if not contract_id or not renewal_date:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_CONTENT, detail="Contract and renewal date are required")

    with get_connection() as connection:
        with connection.cursor(row_factory=dict_row) as cursor:
            cursor.execute("SELECT 1 FROM contracts WHERE contract_id = %s", (contract_id,))
            if not cursor.fetchone():
                raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Contract not found")
            cursor.execute("""
                INSERT INTO renewals (contract_id, renewal_date, reminder_date, status, remarks)
                VALUES (%s, %s, %s, %s, %s)
                RETURNING renewal_id::text AS id, contract_id::text AS contract_id,
                          renewal_date, reminder_date, status, remarks
            """, (
                contract_id,
                renewal_date,
                payload.get("reminder_date") or None,
                str(payload.get("status") or "upcoming").lower().replace(" ", "_"),
                str(payload.get("remarks") or "").strip() or None,
            ))
            renewal = dict(cursor.fetchone())
    store.audit("created", "renewal", renewal["id"], current_user["id"])
    return renewal


@api_router.patch("/api/renewals/{renewal_id}", response_model=dict[str, Any])
def update_renewal(
    renewal_id: str,
    payload: dict[str, Any],
    current_user: dict[str, Any] = Depends(get_current_user),
) -> dict[str, Any]:
    fields = {
        "renewal_date": payload.get("renewal_date"),
        "reminder_date": payload.get("reminder_date"),
        "status": str(payload["status"]).lower().replace(" ", "_") if payload.get("status") else None,
        "remarks": payload.get("remarks"),
    }


def exported_contracts(search: str | None, status_filter: str | None, category: str | None) -> list[dict[str, Any]]:
    clauses: list[str] = []
    parameters: list[Any] = []
    if search:
        clauses.append("(title ILIKE %s OR contract_number ILIKE %s OR category ILIKE %s)")
        parameters.extend([f"%{search}%", f"%{search}%", f"%{search}%"])
    if status_filter and status_filter != "All":
        clauses.append("status ILIKE %s")
        parameters.append(status_filter)
    if category and category != "All":
        clauses.append("category ILIKE %s")
        parameters.append(category)
    where_clause = f"WHERE {' AND '.join(clauses)}" if clauses else ""
    with get_connection() as connection:
        with connection.cursor(row_factory=dict_row) as cursor:
            cursor.execute(f"""
                SELECT contract_number, title, category, description, status, start_date, end_date
                FROM contracts {where_clause} ORDER BY created_at DESC NULLS LAST, contract_id
            """, parameters)
            return [dict(record) for record in cursor.fetchall()]


@api_router.get("/api/contracts/export/csv")
def export_contracts_csv(
    search: str | None = Query(default=None),
    status_filter: str | None = Query(default=None, alias="status"),
    category: str | None = None,
    _: dict[str, Any] = Depends(get_current_user),
) -> Response:
    contracts = exported_contracts(search, status_filter, category)
    return csv_download("contracts.csv", ["Contract Number", "Title", "Category", "Description", "Status", "Start Date", "End Date"], [
        [item.get("contract_number"), item.get("title"), item.get("category"), item.get("description"), item.get("status"), item.get("start_date"), item.get("end_date")]
        for item in contracts
    ])


@api_router.get("/api/contracts/export/excel")
def export_contracts_excel(
    search: str | None = Query(default=None),
    status_filter: str | None = Query(default=None, alias="status"),
    category: str | None = None,
    _: dict[str, Any] = Depends(get_current_user),
) -> Response:
    contracts = exported_contracts(search, status_filter, category)
    return csv_download("contracts.xls", ["Contract Number", "Title", "Category", "Description", "Status", "Start Date", "End Date"], [
        [item.get("contract_number"), item.get("title"), item.get("category"), item.get("description"), item.get("status"), item.get("start_date"), item.get("end_date")]
        for item in contracts
    ], "application/vnd.ms-excel")
    changes = {key: value for key, value in fields.items() if value is not None}
    if not changes:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_CONTENT, detail="Provide at least one renewal field to update")

    assignments = ", ".join(f"{key} = %s" for key in changes)
    with get_connection() as connection:
        with connection.cursor(row_factory=dict_row) as cursor:
            cursor.execute(f"""
                UPDATE renewals SET {assignments}
                WHERE renewal_id = %s
                RETURNING renewal_id::text AS id, contract_id::text AS contract_id,
                          renewal_date, reminder_date, status, remarks
            """, [*changes.values(), renewal_id])
            renewal = cursor.fetchone()
    if not renewal:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Renewal not found")
    result = dict(renewal)
    store.audit("updated", "renewal", renewal_id, current_user["id"], changes)
    return result


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


COMPLIANCE_TABLES: dict[str, tuple[str, tuple[str, ...]]] = {
    "compliance": ("compliance", ("title", "department", "status", "compliance_score", "risk_level")),
    "missed-obligations": ("missed_obligation", ("obligation_name", "contract", "department", "owner", "due_date", "missed_days", "priority", "status")),
    "risk": ("risk", ("risk_name", "department", "severity", "status", "owner")),
    "audit": ("audit", ("audit_name", "department", "severity", "status", "audit_date")),
    "history": ("history", ("activity", "department", "status", "activity_date")),
}


def compliance_record(table_key: str, record_id: int) -> dict[str, Any] | None:
    table, _ = COMPLIANCE_TABLES[table_key]
    with get_connection() as connection:
        with connection.cursor(row_factory=dict_row) as cursor:
            cursor.execute(f"SELECT * FROM {table} WHERE id = %s", (record_id,))
            record = cursor.fetchone()
    return dict(record) if record else None


def create_compliance_record(table_key: str, payload: dict[str, Any]) -> dict[str, Any]:
    table, allowed_fields = COMPLIANCE_TABLES[table_key]
    values = {field: payload.get(field) for field in allowed_fields if field in payload}
    if not values:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_CONTENT, detail="No valid fields were supplied")
    fields = list(values)
    with get_connection() as connection:
        with connection.cursor(row_factory=dict_row) as cursor:
            cursor.execute(
                f"INSERT INTO {table} ({', '.join(fields)}) VALUES ({', '.join(['%s'] * len(fields))}) RETURNING *",
                [values[field] for field in fields],
            )
            return dict(cursor.fetchone())


def update_compliance_record(table_key: str, record_id: int, payload: dict[str, Any]) -> dict[str, Any] | None:
    table, allowed_fields = COMPLIANCE_TABLES[table_key]
    values = {field: payload.get(field) for field in allowed_fields if field in payload}
    if not values:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_CONTENT, detail="No valid fields were supplied")
    fields = list(values)
    assignments = ', '.join(f"{field} = %s" for field in fields)
    with get_connection() as connection:
        with connection.cursor(row_factory=dict_row) as cursor:
            cursor.execute(
                f"UPDATE {table} SET {assignments} WHERE id = %s RETURNING *",
                [values[field] for field in fields] + [record_id],
            )
            record = cursor.fetchone()
    return dict(record) if record else None


def delete_compliance_record(table_key: str, record_id: int) -> bool:
    table, _ = COMPLIANCE_TABLES[table_key]
    with get_connection() as connection:
        with connection.cursor() as cursor:
            cursor.execute(f"DELETE FROM {table} WHERE id = %s", (record_id,))
            return cursor.rowcount > 0


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


@api_router.get("/api/compliance/{record_id}")
def get_compliance_record(record_id: int, _: dict[str, Any] = Depends(get_current_user)) -> dict[str, Any]:
    record = compliance_record("compliance", record_id)
    if not record:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Compliance record not found")
    return record


@api_router.post("/api/compliance/", status_code=status.HTTP_201_CREATED)
def create_compliance(payload: dict[str, Any], current_user: dict[str, Any] = Depends(get_current_user)) -> dict[str, Any]:
    record = create_compliance_record("compliance", payload)
    store.audit("created", "compliance", str(record["id"]), current_user["id"])
    return record


@api_router.put("/api/compliance/{record_id}")
def update_compliance(record_id: int, payload: dict[str, Any], current_user: dict[str, Any] = Depends(get_current_user)) -> dict[str, Any]:
    record = update_compliance_record("compliance", record_id, payload)
    if not record:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Compliance record not found")
    store.audit("updated", "compliance", str(record_id), current_user["id"], payload)
    return record


@api_router.delete("/api/compliance/{record_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_compliance(record_id: int, current_user: dict[str, Any] = Depends(get_current_user)) -> None:
    if not delete_compliance_record("compliance", record_id):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Compliance record not found")
    store.audit("deleted", "compliance", str(record_id), current_user["id"])


@api_router.get("/api/compliance-dashboard/export/csv")
def export_compliance_dashboard(_: dict[str, Any] = Depends(get_current_user)) -> Response:
    records = postgres_records(
        "SELECT title, department, status, compliance_score, risk_level, created_at FROM compliance ORDER BY created_at DESC NULLS LAST, id DESC"
    )
    return csv_download(
        "contractiq-compliance-dashboard.csv",
        ["Title", "Department", "Status", "Compliance score", "Risk level", "Created at"],
        [[record.get(key) for key in ("title", "department", "status", "compliance_score", "risk_level", "created_at")] for record in records],
    )


@api_router.get("/api/dashboard/kpis")
def dashboard_kpis(_: dict[str, Any] = Depends(get_current_user)) -> dict[str, Any]:
    with get_connection() as connection:
        with connection.cursor(row_factory=dict_row) as cursor:
            cursor.execute("""
                SELECT COALESCE(ROUND(AVG(CASE lower(COALESCE(compliance_level, ''))
                    WHEN 'compliant' THEN 100 WHEN 'low' THEN 85 WHEN 'medium' THEN 70
                    WHEN 'high' THEN 55 WHEN 'non-compliant' THEN 40 ELSE 70 END))::int, 0) AS score
                FROM obligations
            """)
            score = cursor.fetchone()["score"]
            cursor.execute("SELECT COUNT(*) AS total FROM reports WHERE lower(status) IN ('generated', 'ready', 'completed')")
            reports_ready = cursor.fetchone()["total"]
            cursor.execute("""
                SELECT COUNT(*) AS total FROM obligations
                WHERE due_date < CURRENT_DATE AND lower(COALESCE(status, '')) <> 'completed'
            """)
            missed_obligations = cursor.fetchone()["total"]
            cursor.execute("SELECT COUNT(*) AS total FROM audit")
            audit_findings = cursor.fetchone()["total"]
            cursor.execute("SELECT COUNT(*) AS total FROM risk WHERE lower(severity) = 'high'")
            high_risks = cursor.fetchone()["total"]
            cursor.execute("SELECT COUNT(*) AS total FROM obligations WHERE lower(COALESCE(status, '')) = 'pending'")
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
        """
        SELECT
            o.obligation_id::text AS id,
            o.title AS obligation_name,
            COALESCE(c.title, c.contract_number, 'Unassigned') AS contract,
            COALESCE(c.category, 'Unassigned') AS department,
            COALESCE(u.full_name, 'Unassigned') AS owner,
            o.due_date,
            GREATEST(CURRENT_DATE - o.due_date, 0) AS missed_days,
            CASE lower(COALESCE(o.compliance_level, ''))
                WHEN 'high' THEN 'High' WHEN 'non-compliant' THEN 'High'
                WHEN 'medium' THEN 'Medium' ELSE 'Low' END AS priority,
            CASE WHEN o.due_date < CURRENT_DATE AND lower(COALESCE(o.status, '')) <> 'completed'
                 THEN 'Overdue' ELSE o.status END AS status
        FROM obligations AS o
        LEFT JOIN contracts AS c ON c.contract_id = o.contract_id
        LEFT JOIN users AS u ON u.user_id = o.assigned_to
        WHERE o.due_date < CURRENT_DATE AND lower(COALESCE(o.status, '')) <> 'completed'
        ORDER BY o.due_date ASC NULLS LAST, o.obligation_id DESC
        """
    )


@api_router.get("/api/missed-obligations/{record_id}")
def get_missed_obligation(record_id: int, _: dict[str, Any] = Depends(get_current_user)) -> dict[str, Any]:
    record = compliance_record("missed-obligations", record_id)
    if not record:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Missed obligation not found")
    return record


@api_router.post("/api/missed-obligations/", status_code=status.HTTP_201_CREATED)
def create_missed_obligation(payload: dict[str, Any], current_user: dict[str, Any] = Depends(get_current_user)) -> dict[str, Any]:
    record = create_compliance_record("missed-obligations", payload)
    store.audit("created", "missed_obligation", str(record["id"]), current_user["id"])
    return record


@api_router.put("/api/missed-obligations/{record_id}")
def update_missed_obligation(record_id: int, payload: dict[str, Any], current_user: dict[str, Any] = Depends(get_current_user)) -> dict[str, Any]:
    record = update_compliance_record("missed-obligations", record_id, payload)
    if not record:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Missed obligation not found")
    store.audit("updated", "missed_obligation", str(record_id), current_user["id"], payload)
    return record


@api_router.delete("/api/missed-obligations/{record_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_missed_obligation(record_id: int, current_user: dict[str, Any] = Depends(get_current_user)) -> None:
    if not delete_compliance_record("missed-obligations", record_id):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Missed obligation not found")
    store.audit("deleted", "missed_obligation", str(record_id), current_user["id"])


@api_router.get("/api/risk/")
def list_risks(_: dict[str, Any] = Depends(get_current_user)) -> list[dict[str, Any]]:
    return postgres_records("SELECT id, risk_name, department, severity, status, owner FROM risk ORDER BY id DESC")


@api_router.get("/api/risk/{record_id}")
def get_risk(record_id: int, _: dict[str, Any] = Depends(get_current_user)) -> dict[str, Any]:
    record = compliance_record("risk", record_id)
    if not record:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Risk not found")
    return record


@api_router.post("/api/risk/", status_code=status.HTTP_201_CREATED)
def create_risk(payload: dict[str, Any], current_user: dict[str, Any] = Depends(get_current_user)) -> dict[str, Any]:
    record = create_compliance_record("risk", payload)
    store.audit("created", "risk", str(record["id"]), current_user["id"])
    return record


@api_router.put("/api/risk/{record_id}")
def update_risk(record_id: int, payload: dict[str, Any], current_user: dict[str, Any] = Depends(get_current_user)) -> dict[str, Any]:
    record = update_compliance_record("risk", record_id, payload)
    if not record:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Risk not found")
    store.audit("updated", "risk", str(record_id), current_user["id"], payload)
    return record


@api_router.delete("/api/risk/{record_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_risk(record_id: int, current_user: dict[str, Any] = Depends(get_current_user)) -> None:
    if not delete_compliance_record("risk", record_id):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Risk not found")
    store.audit("deleted", "risk", str(record_id), current_user["id"])


@api_router.get("/api/audit/")
def list_compliance_audits(_: dict[str, Any] = Depends(get_current_user)) -> list[dict[str, Any]]:
    return postgres_records("SELECT id, audit_name, department, severity, status, audit_date FROM audit ORDER BY audit_date DESC NULLS LAST, id DESC")


@api_router.get("/api/audit/{record_id}")
def get_compliance_audit(record_id: int, _: dict[str, Any] = Depends(get_current_user)) -> dict[str, Any]:
    record = compliance_record("audit", record_id)
    if not record:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Audit not found")
    return record


@api_router.post("/api/audit/", status_code=status.HTTP_201_CREATED)
def create_compliance_audit(payload: dict[str, Any], current_user: dict[str, Any] = Depends(get_current_user)) -> dict[str, Any]:
    record = create_compliance_record("audit", payload)
    store.audit("created", "audit", str(record["id"]), current_user["id"])
    return record


@api_router.put("/api/audit/{record_id}")
def update_compliance_audit(record_id: int, payload: dict[str, Any], current_user: dict[str, Any] = Depends(get_current_user)) -> dict[str, Any]:
    record = update_compliance_record("audit", record_id, payload)
    if not record:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Audit not found")
    store.audit("updated", "audit", str(record_id), current_user["id"], payload)
    return record


@api_router.delete("/api/audit/{record_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_compliance_audit(record_id: int, current_user: dict[str, Any] = Depends(get_current_user)) -> None:
    if not delete_compliance_record("audit", record_id):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Audit not found")
    store.audit("deleted", "audit", str(record_id), current_user["id"])


@api_router.get("/api/history/")
def list_compliance_history(_: dict[str, Any] = Depends(get_current_user)) -> list[dict[str, Any]]:
    return postgres_records("SELECT id, activity, department, status, activity_date FROM history ORDER BY activity_date DESC NULLS LAST, id DESC")


@api_router.get("/api/history/{record_id}")
def get_compliance_history_record(record_id: int, _: dict[str, Any] = Depends(get_current_user)) -> dict[str, Any]:
    record = compliance_record("history", record_id)
    if not record:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="History record not found")
    return record


@api_router.post("/api/history/", status_code=status.HTTP_201_CREATED)
def create_compliance_history_record(payload: dict[str, Any], current_user: dict[str, Any] = Depends(get_current_user)) -> dict[str, Any]:
    record = create_compliance_record("history", payload)
    store.audit("created", "history", str(record["id"]), current_user["id"])
    return record


@api_router.put("/api/history/{record_id}")
def update_compliance_history_record(record_id: int, payload: dict[str, Any], current_user: dict[str, Any] = Depends(get_current_user)) -> dict[str, Any]:
    record = update_compliance_record("history", record_id, payload)
    if not record:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="History record not found")
    store.audit("updated", "history", str(record_id), current_user["id"], payload)
    return record


@api_router.delete("/api/history/{record_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_compliance_history_record(record_id: int, current_user: dict[str, Any] = Depends(get_current_user)) -> None:
    if not delete_compliance_record("history", record_id):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="History record not found")
    store.audit("deleted", "history", str(record_id), current_user["id"])


@api_router.get("/api/report/")
def list_compliance_reports(_: dict[str, Any] = Depends(get_current_user)) -> list[dict[str, Any]]:
    return postgres_records("SELECT id, title, department, status, file_size, generated_date FROM report ORDER BY generated_date DESC NULLS LAST, id DESC")

def role_dashboard(role: str) -> dict[str, Any]:
    dashboards = {
        "Administrator": {
            "name": "Admin Dashboard",
            "features": ["User Management", "Contract Statistics", "System Monitoring", "Activity Logs"],
        },
        "Legal Manager": {
            "name": "Legal Dashboard",
            "features": ["Active Contracts", "Upcoming Renewals", "Pending Obligations", "Recent Activities"],
        },
        "Compliance Officer": {
            "name": "Compliance Dashboard",
            "features": ["Compliance Reports", "Missed Deadlines", "Risk Indicators", "Audit Summary"],
        },
        "Contract Manager": {
            "name": "Contract Manager Dashboard",
            "features": ["Contract Repository", "Approval Workflow", "Version Management", "Assignments"],
        },
        "Department Head": {
            "name": "Department Head Dashboard",
            "features": ["Department Contracts", "Obligation Ownership", "Renewal Approvals", "Performance"],
        },
        "Employee": {
            "name": "Employee Dashboard",
            "features": ["Assigned Obligations", "Notifications", "Contract Access", "Profile"],
        },
    }
    return dashboards.get(role, dashboards["Employee"])


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
            as_date(item.get("end_date")) if str(item.get("status", "")).casefold() == "expired" else None,
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
                if str(item.get("status", "")).casefold() == "active"
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
                if str(item.get("status", "")).casefold() == "expired"
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

    active_contracts = sum(1 for item in contracts if str(item.get("status", "")).casefold() == "active")
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


@api_router.get("/api/dashboard/export/csv")
def export_dashboard_csv(current_user: dict[str, Any] = Depends(get_current_user)) -> Response:
    data = dashboard(current_user)
    rows: list[list[Any]] = [["Dashboard Summary", "Value"]]
    rows.extend([[item["label"], item["value"]] for item in data.get("stats", [])])
    rows.append([])
    rows.append(["Upcoming Deadlines", ""])
    rows.append(["Contract", "Obligation", "Due Date", "Assignee", "Priority", "Status"])
    rows.extend([
        [item.get("contract_number"), item.get("obligation"), item.get("due_date"), item.get("assignee"), item.get("priority"), item.get("status")]
        for item in data.get("deadlines", [])
    ])
    return csv_download("contractiq-dashboard.csv", ["Section", "Value"], rows)


@api_router.get("/api/notifications", response_model=list[dict[str, Any]])
def list_notifications(current_user: dict[str, Any] = Depends(get_current_user)) -> list[dict[str, Any]]:
    return list_postgres_notifications(current_user["id"], current_user["role"] == Role.administrator.value)


@api_router.post("/api/notifications", response_model=dict[str, Any], status_code=status.HTTP_201_CREATED)
def create_notification(
    payload: NotificationCreate,
    current_user: dict[str, Any] = Depends(require_roles(Role.administrator.value, Role.legal_manager.value, Role.compliance_officer.value)),
) -> dict[str, Any]:
    notification = create_postgres_notification(model_payload(payload))
    store.audit("created", "notification", notification["id"], current_user["id"])
    return notification


@api_router.post("/api/notifications/{notification_id}/read", response_model=dict[str, Any])
def mark_notification_read(notification_id: str, current_user: dict[str, Any] = Depends(get_current_user)) -> dict[str, Any]:
    updated = mark_postgres_notification_read(notification_id, current_user["id"], current_user["role"] == Role.administrator.value)
    if not updated:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Notification not found")
    return updated


@api_router.post("/api/notifications/read-all")
def mark_all_notifications_as_read(current_user: dict[str, Any] = Depends(get_current_user)) -> dict[str, int]:
    updated_count = mark_all_notifications_read(current_user["id"], current_user["role"] == Role.administrator.value)
    return {"updated_count": updated_count}


@api_router.post("/api/reports", response_model=dict[str, Any], status_code=status.HTTP_201_CREATED)
def create_report(payload: dict[str, Any], current_user: dict[str, Any] = Depends(get_current_user)) -> dict[str, Any]:
    name = str(payload.get("name") or payload.get("title") or "").strip()
    report_type = str(payload.get("report_type") or "").strip()
    if not name or not report_type:
        raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_CONTENT, detail="Report name and type are required")
    report = create_postgres_report({
        "name": name,
        "report_type": report_type,
        "department": payload.get("department"),
        "status": payload.get("status") or "Generated",
        "value": payload.get("value") or 0,
        "due_date": payload.get("due_date"),
        "filters": payload.get("filters") or {},
    }, current_user["id"])
    store.audit("generated", "report", report["id"], current_user["id"])
    return report


@api_router.get("/api/reports", response_model=list[dict[str, Any]])
def list_reports(_: dict[str, Any] = Depends(get_current_user)) -> list[dict[str, Any]]:
    return list_postgres_reports()


@api_router.get("/api/reports/{report_id}/csv")
def export_single_report_csv(report_id: str, _: dict[str, Any] = Depends(get_current_user)) -> Response:
    report = get_postgres_report(report_id)
    if not report:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Report not found")
    return csv_download(
        f"contractiq-report-{report_id}.csv",
        ["Name", "Type", "Department", "Status", "Value", "Due date", "Generated at"],
        [[report.get(key) for key in ("name", "report_type", "department", "status", "value", "due_date", "generated_at")]],
    )


@api_router.get("/api/reports/{report_id}/excel")
def export_single_report_excel(report_id: str, _: dict[str, Any] = Depends(get_current_user)) -> Response:
    report = get_postgres_report(report_id)
    if not report:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Report not found")
    return csv_download(
        f"contractiq-report-{report_id}.xls",
        ["Name", "Type", "Department", "Status", "Value", "Due date", "Generated at"],
        [[report.get(key) for key in ("name", "report_type", "department", "status", "value", "due_date", "generated_at")]],
        media_type="application/vnd.ms-excel",
    )


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


@api_router.get("/api/audit-logs")
def list_audit_logs(_: dict[str, Any] = Depends(get_current_user)) -> list[dict[str, Any]]:
    return list_database_audit_logs()


@api_router.get("/api/activities", response_model=list[APIRecord])
def list_activities(_: dict[str, Any] = Depends(get_current_user)) -> list[dict[str, Any]]:
    return sorted(store.list("activities"), key=lambda item: item["created_at"], reverse=True)


app.include_router(api_router)
