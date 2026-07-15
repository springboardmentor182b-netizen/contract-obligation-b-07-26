from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from sqlalchemy import func

from datetime import date, timedelta

from app.config.database import get_db

from app.services.dashboard_service import get_dashboard_kpis

from app.services.dashboard_service import get_upcoming_deadlines

from app.services.dashboard_service import get_calendar_events

from app.services.dashboard_service import get_weekly_chart

router = APIRouter(

    prefix="/dashboard",

    tags=["Dashboard"]

)

@router.get("/kpis")

def dashboard_kpis(

        db: Session = Depends(get_db)

):

    return get_dashboard_kpis(db)

@router.get("/deadlines")

def deadlines(

    db: Session = Depends(get_db)

):

    return get_upcoming_deadlines(db)

@router.get("/calendar")

def calendar(

    db: Session = Depends(get_db)

):

    return get_calendar_events(db)

@router.get("/weekly-chart")

def weekly(

    db: Session = Depends(get_db)

):

    return get_weekly_chart(db)
