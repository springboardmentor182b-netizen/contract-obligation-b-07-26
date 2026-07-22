"""FastAPI routes owned by the dashboard module."""

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..database.session import get_db
from . import service

router = APIRouter(prefix="/api", tags=["Dashboard"])


@router.get("/dashboard")
def dashboard(db: Session = Depends(get_db)) -> dict:
    return {"stats": service.get_stats(db), "contracts": service.get_contract_volume(db), "compliance": service.get_compliance(db), "renewals": service.get_renewal_trend(db), "activities": service.get_activities(db), "deadlines": service.get_deadlines(db)}


@router.get("/dashboard/stats")
def dashboard_stats(db: Session = Depends(get_db)) -> list[dict]: return service.get_stats(db)


@router.get("/dashboard/contracts")
def dashboard_contracts(db: Session = Depends(get_db)) -> list[dict]: return service.get_contract_volume(db)


@router.get("/dashboard/compliance")
def dashboard_compliance(db: Session = Depends(get_db)) -> list[dict]: return service.get_compliance(db)


@router.get("/dashboard/renewals")
def dashboard_renewals(db: Session = Depends(get_db)) -> list[dict]: return service.get_renewal_trend(db)


@router.get("/dashboard/activities")
def dashboard_activities(db: Session = Depends(get_db)) -> list[dict]: return service.get_activities(db)


@router.get("/dashboard/deadlines")
def dashboard_deadlines(db: Session = Depends(get_db)) -> list[dict]: return service.get_deadlines(db)


@router.get("/users/profile")
def user_profile(db: Session = Depends(get_db)) -> dict: return service.get_profile(db)
