from fastapi import APIRouter

from .service import (
    get_dashboard_summary,
    get_compliance_levels,
    get_contract_growth,
    get_contract_status,
    get_upcoming_renewals,
    get_recent_contracts,
    get_contracts_by_department,
    get_recent_activity,
    get_compliance_summary,
)

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


@router.get("/summary")
def dashboard_summary():
    return get_dashboard_summary()


@router.get("/compliance-levels")
def compliance_levels():
    return get_compliance_levels()


@router.get("/contract-growth")
def contract_growth():
    return get_contract_growth()


@router.get("/contract-status")
def contract_status():
    return get_contract_status()


@router.get("/upcoming-renewals")
def upcoming_renewals():
    return get_upcoming_renewals()


@router.get("/recent-contracts")
def recent_contracts():
    return get_recent_contracts()

@router.get("/contracts-by-department")
def contracts_by_department():
    return get_contracts_by_department()

@router.get("/recent-activity")
def recent_activity():
    return get_recent_activity()

@router.get("/compliance-summary")
def compliance_summary():
    return get_compliance_summary()