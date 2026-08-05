"""
Business logic for the Reports module — called by router.py.

Kept separate from router.py so the DB/query logic is testable without
spinning up FastAPI, matching the models/router/schemas/services split
already used by the auth and users modules.
"""
import uuid
from datetime import datetime, timedelta
from typing import Optional

from sqlalchemy import func, extract
from sqlalchemy.orm import Session

from app.reports.models import Report, ReportDownload, ReportSchedule, ReportStatus
from app.reports import schemas

MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


def get_reports_summary(db: Session) -> schemas.ReportsSummary:
    now = datetime.utcnow()
    start_of_month = now.replace(day=1, hour=0, minute=0, second=0, microsecond=0)

    generated_total = db.query(func.count(Report.id)).scalar() or 0
    generated_this_month = (
        db.query(func.count(Report.id)).filter(Report.created_at >= start_of_month).scalar() or 0
    )

    scheduled_total = db.query(func.count(ReportSchedule.id)).scalar() or 0

    downloads_total = db.query(func.count(ReportDownload.id)).scalar() or 0
    downloads_this_month = (
        db.query(func.count(ReportDownload.id))
        .filter(ReportDownload.downloaded_at >= start_of_month)
        .scalar()
        or 0
    )

    pending_total = (
        db.query(func.count(Report.id)).filter(Report.status == ReportStatus.processing).scalar() or 0
    )

    return schemas.ReportsSummary(
        generatedReports=generated_total,
        generatedDelta=generated_this_month,
        scheduledReports=scheduled_total,
        scheduledWindowDays=30,
        downloads=downloads_total,
        downloadsDelta=downloads_this_month,
        pendingReports=pending_total,
    )


def get_monthly_activity(db: Session, year: int) -> schemas.MonthlyActivityResponse:
    rows = (
        db.query(
            extract("month", Report.created_at).label("month"),
            Report.is_scheduled,
            func.count(Report.id).label("count"),
        )
        .filter(extract("year", Report.created_at) == year)
        .group_by("month", Report.is_scheduled)
        .all()
    )

    counts = {i: {"generated": 0, "scheduled": 0} for i in range(1, 13)}
    for month, is_scheduled, count in rows:
        month = int(month)
        key = "scheduled" if is_scheduled else "generated"
        counts[month][key] = count

    months = [
        schemas.MonthlyActivityPoint(month=MONTH_LABELS[i - 1], generated=counts[i]["generated"], scheduled=counts[i]["scheduled"])
        for i in range(1, 13)
    ]
    return schemas.MonthlyActivityResponse(year=year, months=months)


def get_report_library(db: Session, page: int, page_size: int, filter_text: Optional[str]) -> schemas.ReportLibraryResponse:
    query = db.query(Report)
    if filter_text:
        query = query.filter(Report.name.ilike(f"%{filter_text}%"))

    total = query.count()
    items = (
        query.order_by(Report.created_at.desc())
        .offset((page - 1) * page_size)
        .limit(page_size)
        .all()
    )

    return schemas.ReportLibraryResponse(
        items=[schemas.ReportLibraryItem.model_validate(r) for r in items],
        total=total,
    )


def create_export(db: Session, report_type: str, current_user_id: uuid.UUID) -> schemas.ExportResponse:
    report = Report(
        name=f"{report_type.replace('-', ' ').title()} — {datetime.utcnow():%Y-%m-%d}",
        type=report_type,
        format="Excel" if report_type in ("contract-summary", "user-activity") else "PDF",
        status=ReportStatus.processing,
        is_scheduled=False,
        created_by=current_user_id,
    )
    db.add(report)
    db.commit()
    db.refresh(report)

    # TODO: hand off to the actual file-generation job (e.g. a Celery task
    # that renders the PDF/Excel and uploads it to storage). For now this
    # marks the report ready immediately with a placeholder URL so the
    # frontend flow can be tested end-to-end.
    report.status = ReportStatus.ready
    report.file_url = f"/files/reports/{report.id}.{'xlsx' if report.format == 'Excel' else 'pdf'}"
    db.commit()

    return schemas.ExportResponse(downloadUrl=report.file_url)


def create_schedule(db: Session, payload: schemas.ScheduleRequest, current_user_id: uuid.UUID) -> schemas.ScheduleResponse:
    frequency_to_delta = {
        "daily": timedelta(days=1),
        "weekly": timedelta(weeks=1),
        "monthly": timedelta(days=30),
    }
    next_run_at = datetime.utcnow() + frequency_to_delta.get(payload.frequency, timedelta(days=1))

    schedule = ReportSchedule(
        report_type=payload.reportType,
        frequency=payload.frequency,
        recipients=payload.recipients,
        next_run_at=next_run_at,
        created_by=current_user_id,
    )
    db.add(schedule)
    db.commit()
    db.refresh(schedule)

    return schemas.ScheduleResponse(id=schedule.id, nextRunAt=schedule.next_run_at)


def log_download(db: Session, report_id: uuid.UUID, user_id: Optional[uuid.UUID]) -> None:
    db.add(ReportDownload(report_id=report_id, downloaded_by=user_id))
    db.commit()
