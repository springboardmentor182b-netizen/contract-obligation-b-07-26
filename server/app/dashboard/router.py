from fastapi import APIRouter
from app.dashboard.services import (
    get_dashboard_summary,
    get_recent_activities,
    get_notifications,
    get_deadlines,
    get_profile,
)

router = APIRouter(
    prefix="/api/dashboard",
    tags=["Dashboard"]
)


@router.get("/")
def dashboard_summary():
    return get_dashboard_summary()


@router.get("/activities")
def activities():
    return get_recent_activities()


@router.get("/notifications")
def notifications():
    return get_notifications()


@router.get("/deadlines")
def deadlines():
    return get_deadlines()


@router.get("/profile")
def profile():
    return get_profile()