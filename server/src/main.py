from __future__ import annotations

from datetime import date, datetime
from typing import Any
from fastapi import FastAPI
from app.config.database import Base, engine
from fastapi import Depends, FastAPI, HTTPException, Query, status
from fastapi.middleware.cors import CORSMiddleware

from app.routers.obligation_routers import router as obligation_router
from app.routers.dashboard_routers import router as dashboard_router

from .auth.security import create_token, get_current_user, hash_password, require_roles, verify_password
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
    Role,
    TokenResponse,
    UserCreate,
    UserLogin,
    UserPublic,
)
from .storage import store


app = FastAPI(
    title="ContractIQ: Contract Obligation Tracking API",
    version="1.0.0",
    description="Backend API for contracts, obligations, renewals, compliance, notifications, reports, and audit logs.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(obligation_router)

app.include_router(dashboard_router)

def public_user(user: dict[str, Any]) -> dict[str, Any]:
    return {key: value for key, value in user.items() if key != "password_hash"}


def model_payload(model: Any) -> dict[str, Any]:
    return model.model_dump(mode="json", exclude_unset=True)


def find_user_by_email(email: str) -> dict[str, Any] | None:
    normalized = email.lower()
    return next((user for user in store.list("users") if user["email"].lower() == normalized), None)


def ensure_record(table: str, record_id: str) -> dict[str, Any]:
    record = store.get(table, record_id)
    if not record:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f"{table} record not found")
    return record


def parse_date(value: str | None) -> date | None:
    return date.fromisoformat(value) if value else None


@app.get("/health")
def health() -> dict[str, str]:
    return {"status": "ok", "service": "contractiq-api"}


@app.post("/api/auth/register", response_model=UserPublic, status_code=status.HTTP_201_CREATED)
def register(payload: UserCreate) -> dict[str, Any]:
    if find_user_by_email(payload.email):
        raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail="Email is already registered")

    user = store.create(
        "users",
        {
            "name": payload.name,
            "email": payload.email.lower(),
            "password_hash": hash_password(payload.password),
            "role": payload.role.value,
            "department": payload.department,
            "is_active": True,
        },
    )
    store.audit("registered", "user", user["id"], user["id"])
    return public_user(user)


@app.post("/api/auth/login", response_model=TokenResponse)
def login(payload: UserLogin) -> dict[str, str]:
    user = find_user_by_email(payload.email)
    if not user or not verify_password(payload.password, user["password_hash"]):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password")
    store.audit("logged in", "user", user["id"], user["id"])
    return {"access_token": create_token(user), "token_type": "bearer"}


@app.get("/api/auth/me", response_model=UserPublic)
def me(current_user: dict[str, Any] = Depends(get_current_user)) -> dict[str, Any]:
    return public_user(current_user)


@app.get("/api/users", response_model=list[UserPublic])
def list_users(_: dict[str, Any] = Depends(require_roles(Role.administrator.value, Role.legal_manager.value))) -> list[dict[str, Any]]:
    return [public_user(user) for user in store.list("users")]


@app.get("/api/contracts", response_model=list[APIRecord])
def list_contracts(
    search: str | None = Query(default=None),
    status_filter: ContractStatus | None = Query(default=None, alias="status"),
    category: str | None = None,
    _: dict[str, Any] = Depends(get_current_user),
) -> list[dict[str, Any]]:
    contracts = store.list("contracts")
    if search:
        needle = search.lower()
        contracts = [
            contract
            for contract in contracts
            if needle in contract["title"].lower() or needle in contract["counterparty"].lower()
        ]
    if status_filter:
        contracts = [contract for contract in contracts if contract["status"] == status_filter.value]
    if category:
        contracts = [contract for contract in contracts if contract["category"].lower() == category.lower()]
    return contracts


@app.post("/api/contracts", response_model=APIRecord, status_code=status.HTTP_201_CREATED)
def create_contract(payload: ContractCreate, current_user: dict[str, Any] = Depends(get_current_user)) -> dict[str, Any]:
    data = model_payload(payload)
    data["owner_id"] = data.get("owner_id") or current_user["id"]
    contract = store.create("contracts", data)
    store.audit("created", "contract", contract["id"], current_user["id"])
    return contract


@app.get("/api/contracts/{contract_id}", response_model=APIRecord)
def get_contract(contract_id: str, _: dict[str, Any] = Depends(get_current_user)) -> dict[str, Any]:
    contract = ensure_record("contracts", contract_id)
    contract["versions"] = [item for item in store.list("contract_versions") if item["contract_id"] == contract_id]
    contract["obligations"] = [item for item in store.list("obligations") if item["contract_id"] == contract_id]
    contract["renewals"] = [item for item in store.list("renewals") if item["contract_id"] == contract_id]
    return contract


@app.patch("/api/contracts/{contract_id}", response_model=APIRecord)
def update_contract(
    contract_id: str,
    payload: ContractUpdate,
    current_user: dict[str, Any] = Depends(get_current_user),
) -> dict[str, Any]:
    contract = store.update("contracts", contract_id, model_payload(payload))
    if not contract:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Contract not found")
    store.audit("updated", "contract", contract_id, current_user["id"], model_payload(payload))
    return contract


@app.post("/api/contracts/{contract_id}/archive", response_model=APIRecord)
def archive_contract(contract_id: str, current_user: dict[str, Any] = Depends(get_current_user)) -> dict[str, Any]:
    contract = store.update("contracts", contract_id, {"status": ContractStatus.archived.value})
    if not contract:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Contract not found")
    store.audit("archived", "contract", contract_id, current_user["id"])
    return contract


@app.post("/api/contract-versions", response_model=APIRecord, status_code=status.HTTP_201_CREATED)
def create_contract_version(
    payload: ContractVersionCreate,
    current_user: dict[str, Any] = Depends(get_current_user),
) -> dict[str, Any]:
    ensure_record("contracts", payload.contract_id)
    version = store.create("contract_versions", model_payload(payload))
    store.audit("created", "contract_version", version["id"], current_user["id"])
    return version


@app.get("/api/obligations", response_model=list[APIRecord])
def list_obligations(
    contract_id: str | None = None,
    status_filter: ObligationStatus | None = Query(default=None, alias="status"),
    _: dict[str, Any] = Depends(get_current_user),
) -> list[dict[str, Any]]:
    obligations = store.list("obligations")
    if contract_id:
        obligations = [item for item in obligations if item["contract_id"] == contract_id]
    if status_filter:
        obligations = [item for item in obligations if item["status"] == status_filter.value]
    return obligations


@app.post("/api/obligations", response_model=APIRecord, status_code=status.HTTP_201_CREATED)
def create_obligation(payload: ObligationCreate, current_user: dict[str, Any] = Depends(get_current_user)) -> dict[str, Any]:
    ensure_record("contracts", payload.contract_id)
    obligation = store.create("obligations", model_payload(payload))
    store.audit("created", "obligation", obligation["id"], current_user["id"])
    return obligation


@app.patch("/api/obligations/{obligation_id}", response_model=APIRecord)
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


@app.get("/api/renewals", response_model=list[APIRecord])
def list_renewals(
    status_filter: RenewalStatus | None = Query(default=None, alias="status"),
    _: dict[str, Any] = Depends(get_current_user),
) -> list[dict[str, Any]]:
    renewals = store.list("renewals")
    if status_filter:
        renewals = [item for item in renewals if item["status"] == status_filter.value]
    return renewals


@app.post("/api/renewals", response_model=APIRecord, status_code=status.HTTP_201_CREATED)
def create_renewal(payload: RenewalCreate, current_user: dict[str, Any] = Depends(get_current_user)) -> dict[str, Any]:
    ensure_record("contracts", payload.contract_id)
    renewal = store.create("renewals", model_payload(payload))
    store.audit("created", "renewal", renewal["id"], current_user["id"])
    return renewal


@app.patch("/api/renewals/{renewal_id}", response_model=APIRecord)
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


@app.get("/api/compliance/summary")
def compliance_summary(_: dict[str, Any] = Depends(get_current_user)) -> dict[str, Any]:
    obligations = store.list("obligations")
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


@app.get("/api/dashboard")
def dashboard(_: dict[str, Any] = Depends(get_current_user)) -> dict[str, Any]:
    contracts = store.list("contracts")
    obligations = store.list("obligations")
    renewals = store.list("renewals")
    notifications = store.list("notifications")
    activities = sorted(store.list("activities"), key=lambda item: item["created_at"], reverse=True)[:10]

    return {
        "active_contracts": sum(1 for item in contracts if item["status"] == ContractStatus.active.value),
        "upcoming_renewals": sum(1 for item in renewals if item["status"] == RenewalStatus.upcoming.value),
        "pending_obligations": sum(1 for item in obligations if item["status"] in {ObligationStatus.pending.value, ObligationStatus.in_progress.value}),
        "unread_notifications": sum(1 for item in notifications if not item.get("read", False)),
        "compliance": compliance_summary(),
        "recent_activities": activities,
    }


@app.get("/api/notifications", response_model=list[APIRecord])
def list_notifications(current_user: dict[str, Any] = Depends(get_current_user)) -> list[dict[str, Any]]:
    notifications = store.list("notifications")
    if current_user["role"] != Role.administrator.value:
        notifications = [
            item for item in notifications if item.get("recipient_user_id") in {None, current_user["id"]}
        ]
    return notifications


@app.post("/api/notifications", response_model=APIRecord, status_code=status.HTTP_201_CREATED)
def create_notification(
    payload: NotificationCreate,
    current_user: dict[str, Any] = Depends(require_roles(Role.administrator.value, Role.legal_manager.value, Role.compliance_officer.value)),
) -> dict[str, Any]:
    notification = store.create("notifications", {**model_payload(payload), "read": False})
    store.audit("created", "notification", notification["id"], current_user["id"])
    return notification


@app.post("/api/notifications/{notification_id}/read", response_model=APIRecord)
def mark_notification_read(notification_id: str, current_user: dict[str, Any] = Depends(get_current_user)) -> dict[str, Any]:
    notification = ensure_record("notifications", notification_id)
    if notification.get("recipient_user_id") not in {None, current_user["id"]} and current_user["role"] != Role.administrator.value:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Cannot update this notification")
    updated = store.update("notifications", notification_id, {"read": True})
    return updated


@app.post("/api/reports", response_model=APIRecord, status_code=status.HTTP_201_CREATED)
def create_report(payload: ReportCreate, current_user: dict[str, Any] = Depends(get_current_user)) -> dict[str, Any]:
    report = store.create(
        "reports",
        {
            **model_payload(payload),
            "generated_by": current_user["id"],
            "generated_at": datetime.utcnow().isoformat(),
            "download_url": None,
        },
    )
    store.audit("generated", "report", report["id"], current_user["id"])
    return report


@app.get("/api/reports", response_model=list[APIRecord])
def list_reports(_: dict[str, Any] = Depends(get_current_user)) -> list[dict[str, Any]]:
    return store.list("reports")


@app.get("/api/audit-logs", response_model=list[APIRecord])
def list_audit_logs(_: dict[str, Any] = Depends(require_roles(Role.administrator.value, Role.compliance_officer.value))) -> list[dict[str, Any]]:
    return sorted(store.list("audit_logs"), key=lambda item: item["created_at"], reverse=True)


@app.get("/api/activities", response_model=list[APIRecord])
def list_activities(_: dict[str, Any] = Depends(get_current_user)) -> list[dict[str, Any]]:
    return sorted(store.list("activities"), key=lambda item: item["created_at"], reverse=True)

@app.get("/")

def home():

    return {

        "message": "Contract Obligation Tracking API"

    }
