"""
Router for the Reports module.

ASSUMPTIONS (adjust imports below if these don't match your team's setup):
  - app/database.py exposes a `get_db` dependency (yields a SQLAlchemy Session)
  - app/security.py exposes a `get_current_user` dependency (returns the
    authenticated user, raising 401 if there isn't one) — since auth/ has
    no dependencies.py in the current scaffold, security.py seemed the
    most likely home for this given it's a top-level shared file.

If get_current_user actually lives somewhere else (e.g. app/auth/services.py),
just change the import on the line below — nothing else needs to change.
"""
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.security import get_current_user
from app.reports import schemas, services

router = APIRouter(prefix="/reports", tags=["reports"])


@router.get("/summary", response_model=schemas.ReportsSummary)
def read_summary(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return services.get_reports_summary(db)


@router.get("/monthly-activity", response_model=schemas.MonthlyActivityResponse)
def read_monthly_activity(
    year: int = Query(default=None),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    from datetime import datetime

    resolved_year = year or datetime.utcnow().year
    return services.get_monthly_activity(db, resolved_year)


@router.get("/library", response_model=schemas.ReportLibraryResponse)
def read_library(
    page: int = Query(default=1, ge=1),
    pageSize: int = Query(default=10, ge=1, le=100),
    filter: str = Query(default=""),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return services.get_report_library(db, page=page, page_size=pageSize, filter_text=filter or None)


@router.post("/export", response_model=schemas.ExportResponse)
def export_report(
    payload: schemas.ExportRequest,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return services.create_export(db, report_type=payload.type, current_user_id=current_user.id)


@router.post("/schedule", response_model=schemas.ScheduleResponse)
def schedule_report(
    payload: schemas.ScheduleRequest,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return services.create_schedule(db, payload=payload, current_user_id=current_user.id)
