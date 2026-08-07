# =============================================================================
# Standard Library Imports
# =============================================================================
# None currently needed

# =============================================================================
# Third-Party Package Imports
# =============================================================================
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# =============================================================================
# Project Imports - Database & Models
# =============================================================================
from src.database.session import engine, Base
from src.models import audit, compliance, history, missed_obligation, report, risk  # noqa: F401

# =============================================================================
# Project Imports - Routers
# =============================================================================
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

# =============================================================================
# FastAPI Application Configuration
# =============================================================================
app = FastAPI(
    title="ContractIQ: Contract Obligation Tracking API",
    version="1.0.0",
    description="Backend API for contracts, obligations, renewals, compliance, notifications, reports, and audit logs.",
)

# =============================================================================
# Middleware Configuration
# =============================================================================
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:5174",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =============================================================================
# Startup Events
# =============================================================================
@app.on_event("startup")
def startup() -> None:
    """Initialize database tables on application startup."""
    Base.metadata.create_all(bind=engine)

# =============================================================================
# Router Registration
# =============================================================================
# Core API routers with explicit prefixes
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(users.router, prefix="/api/users", tags=["users"])
app.include_router(contracts.router, prefix="/api/contracts", tags=["contracts"])
app.include_router(obligation_routers.router, prefix="/api/obligations", tags=["obligations"])

# Dashboard routers (both implementations for compatibility)
app.include_router(dashboard_routers.router, prefix="/api/dashboard", tags=["dashboard"])
app.include_router(dashboard_router)

# Feature routers with their own prefixes
app.include_router(kpi.router)
app.include_router(header.router)
app.include_router(compliance_router.router)
app.include_router(audit_router.router)
app.include_router(report_router.router)
app.include_router(history_router.router)
app.include_router(risk_router.router)
app.include_router(missed_obligation_router.router)

# =============================================================================
# Health Endpoints
# =============================================================================
@app.get("/")
def read_root():
    """Root endpoint providing welcome message."""
    return {"message": "Welcome to the Contract Management API"}

@app.get("/health")
def health():
    """Health check endpoint for monitoring."""
    return {
        "status": "ok",
        "service": "contractiq-api"
    }
