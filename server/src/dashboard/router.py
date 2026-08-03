"""FastAPI routes owned by the dashboard module."""

from fastapi import APIRouter, Depends
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from ..database.session import get_db
from . import service

router = APIRouter(prefix="/api", tags=["Dashboard"])


def empty_dashboard() -> dict:
    return {
        "stats": [
            {"key": "total_contracts", "label": "Total Contracts", "value": 0, "change": "", "detail": ""},
            {"key": "active_contracts", "label": "Active Contracts", "value": 0, "change": "", "detail": ""},
            {"key": "upcoming_renewals", "label": "Upcoming Renewals", "value": 0, "change": "", "trend": "down", "detail": ""},
            {"key": "pending_obligations", "label": "Pending Obligations", "value": 0, "change": "", "trend": "down", "detail": ""},
            {"key": "compliance_score", "label": "Compliance Score", "value": "0%", "change": "", "detail": ""},
        ],
        "contracts": [],
        "compliance": [],
        "renewals": [],
        "activities": [],
        "deadlines": [],
    }


def safe_value(loader, fallback):
    try:
        return loader()
    except SQLAlchemyError:
        return fallback


@router.get("/dashboard")
def dashboard(db: Session = Depends(get_db)) -> dict:
    empty = empty_dashboard()
    return {
        "stats": safe_value(lambda: service.get_stats(db), empty["stats"]),
        "contracts": safe_value(lambda: service.get_contract_volume(db), empty["contracts"]),
        "compliance": safe_value(lambda: service.get_compliance(db), empty["compliance"]),
        "renewals": safe_value(lambda: service.get_renewal_trend(db), empty["renewals"]),
        "activities": safe_value(lambda: service.get_activities(db), empty["activities"]),
        "deadlines": safe_value(lambda: service.get_deadlines(db), empty["deadlines"]),
    }


@router.get("/dashboard/stats")
def dashboard_stats(db: Session = Depends(get_db)) -> list[dict]: return safe_value(lambda: service.get_stats(db), empty_dashboard()["stats"])


@router.get("/dashboard/contracts")
def dashboard_contracts(db: Session = Depends(get_db)) -> list[dict]: return safe_value(lambda: service.get_contract_volume(db), [])


@router.get("/dashboard/compliance")
def dashboard_compliance(db: Session = Depends(get_db)) -> list[dict]: return safe_value(lambda: service.get_compliance(db), [])


@router.get("/dashboard/renewals")
def dashboard_renewals(db: Session = Depends(get_db)) -> list[dict]: return safe_value(lambda: service.get_renewal_trend(db), [])


@router.get("/dashboard/activities")
def dashboard_activities(db: Session = Depends(get_db)) -> list[dict]: return safe_value(lambda: service.get_activities(db), [])


@router.get("/dashboard/deadlines")
def dashboard_deadlines(db: Session = Depends(get_db)) -> list[dict]: return safe_value(lambda: service.get_deadlines(db), [])


@router.get("/users/profile")
def user_profile(db: Session = Depends(get_db)) -> dict: return safe_value(lambda: service.get_profile(db), {"full_name": None, "role": None})
