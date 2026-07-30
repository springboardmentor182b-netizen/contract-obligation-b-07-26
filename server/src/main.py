from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.database.session import engine, Base
from src.routers import auth, contracts, users, obligation_routers, dashboard_routers


# Create database tables
Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="ContractIQ: Contract Obligation Tracking API",
    version="1.0.0",
    description="Backend API for contracts, obligations, renewals, compliance, notifications, reports, and audit logs.",
)


# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Register routers
app.include_router(
    auth.router,
    prefix="/api/auth",
    tags=["auth"]
)

app.include_router(
    users.router,
    prefix="/api/users",
    tags=["users"]
)

app.include_router(
    contracts.router,
    prefix="/api/contracts",
    tags=["contracts"]
)

app.include_router(
    obligation_routers.router,
    prefix="/api/obligations",
    tags=["obligations"]
)

app.include_router(
    dashboard_routers.router,
    prefix="/api/dashboard",
    tags=["dashboard"]
)


@app.get("/")
def read_root():
    return {
        "message": "Welcome to the Contract Management API"
    }


@app.get("/health")
def health():
    return {
<<<<<<< HEAD
        "status": "ok",
        "service": "contractiq-api"
    }
=======
        "active_contracts": sum(1 for item in contracts if item["status"] == ContractStatus.active.value),
        "upcoming_renewals": sum(1 for item in renewals if item["status"] == RenewalStatus.upcoming.value),
        "pending_obligations": sum(1 for item in obligations if item["status"] in {ObligationStatus.pending.value, ObligationStatus.in_progress.value}),
        "unread_notifications": sum(1 for item in notifications if not item.get("read", False)),
        "compliance": compliance_summary(),
        "recent_activities": activities,
        "user": public_user(current_user),
        "role_dashboard": role_dashboard(current_user["role"]),
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


from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config.database import Base, engine

# Import Models
from app.models import compliance
from app.models import audit
from app.models import report
from app.models import history
from app.models import risk
from app.models import missed_obligation


# Import Routes
from app.routes import compliance
from app.routes import audit
from app.routes import report
from app.routes import history
from app.routes import risk
from app.routes import missed_obligation
from app.routes import header
from app.routes import kpi

app = FastAPI(
    title="Compliance Monitoring API",
    version="1.0.0"
)

# ===========================
# Enable CORS
# ===========================

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create Database Tables
Base.metadata.create_all(bind=engine)

# Register Routes
app.include_router(compliance.router)
app.include_router(audit.router)
app.include_router(report.router)
app.include_router(history.router)
app.include_router(risk.router)
app.include_router(missed_obligation.router)
app.include_router(header.router)
app.include_router(kpi.router)

@app.get("/")
def home():
    return {
        "message": "Compliance Monitoring API Running Successfully"
    }
>>>>>>> 2de895e060763dca44da81c5888f3a8f8a7256e3
