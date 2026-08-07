from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.database.session import engine, Base
from src.routers import (
    auth,
    audit as audit_router,
    compliance as compliance_router,
    contracts,
    dashboard_routers,
    header,
    history as history_router,
    kpi,
    missed_obligation as missed_obligation_router,
    obligation_routers,
    report as report_router,
    risk as risk_router,
    users,
)
from src.dashboard.router import router as dashboard_router
from src.models import audit, compliance, history, missed_obligation, report, risk  # noqa: F401
from src.database import (
    create_user,
    find_user_by_email,
    initialize_database,
    initialize_notifications_table,
    list_users as list_database_users,
    update_user_password,
)

app = FastAPI(
    title="ContractIQ: Contract Obligation Tracking API",
    version="1.0.0",
    description="Backend API for contracts, obligations, renewals, compliance, notifications, reports, and audit logs.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",
        "http://127.0.0.1:5174",
        "http://localhost:5175",
        "http://127.0.0.1:5175",
        "http://localhost:5176",
        "http://127.0.0.1:5176",
        "http://localhost:5177",
        "http://127.0.0.1:5177",
        "http://localhost:5178",
        "http://127.0.0.1:5178",
        "http://localhost:5179",
        "http://127.0.0.1:5179",
        "http://localhost:5180",
        "http://127.0.0.1:5180",
        "http://localhost:5181",
        "http://127.0.0.1:5181",
        "http://localhost:5182",
        "http://127.0.0.1:5182",
        "http://localhost:5183",
        "http://127.0.0.1:5183",
        "http://localhost:5184",
        "http://127.0.0.1:5184",
        "http://localhost:5185",
        "http://127.0.0.1:5185",
        "http://localhost:5186",
        "http://127.0.0.1:5186",
        "http://localhost:5187",
        "http://127.0.0.1:5187",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def startup() -> None:
    Base.metadata.create_all(bind=engine)

# Include routers from both branches
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(users.router, prefix="/api/users", tags=["users"])
app.include_router(contracts.router, prefix="/api/contracts", tags=["contracts"])
app.include_router(obligation_routers.router, prefix="/api/obligations", tags=["obligations"])
app.include_router(dashboard_routers.router, prefix="/api/dashboard", tags=["dashboard"])
app.include_router(dashboard_router)
app.include_router(kpi.router)
app.include_router(header.router)
app.include_router(compliance_router.router)
app.include_router(audit_router.router)
app.include_router(report_router.router)
app.include_router(history_router.router)
app.include_router(risk_router.router)
app.include_router(missed_obligation_router.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to the Contract Management API"}

@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": "contractiq-api"
    }
