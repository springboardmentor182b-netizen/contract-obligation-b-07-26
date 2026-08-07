import uuid
from datetime import datetime, timedelta
from uuid import UUID
from typing import Optional

from sqlalchemy import func, extract
from sqlalchemy.orm import Session

from app.renewals.models import Renewal, RenewalReminderSettings, RenewalStatus
from app.renewals import schemas

MONTH_LABELS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

# Fixed id for the single reminder-settings row.
REMINDER_SETTINGS_SINGLETON_ID = UUID("00000000-0000-0000-0000-000000000002")

DEFAULT_UPCOMING_WINDOW_DAYS = 90


class RenewalNotFoundError(Exception):
    pass


def to_item(renewal: Renewal) -> schemas.RenewalItem:
    return schemas.RenewalItem(
        id=renewal.id,
        displayId=renewal.display_id,
        contractName=renewal.contract_name,
        counterparty=renewal.counterparty,
        expiryDate=renewal.expiry_date,
        value=float(renewal.value),
        status=renewal.status.value,
        noticePeriodDays=renewal.notice_period_days,
    )


# ---- Summary ----

def get_summary(db: Session) -> schemas.RenewalsSummary:
    now = datetime.utcnow()
    window_end = now + timedelta(days=DEFAULT_UPCOMING_WINDOW_DAYS)
    quarter_ago = now - timedelta(days=90)
    two_quarters_ago = now - timedelta(days=180)
    fiscal_year_start = datetime(now.year, 1, 1)

    upcoming_count = (
        db.query(func.count(Renewal.id))
        .filter(Renewal.status == RenewalStatus.upcoming, Renewal.expiry_date <= window_end)
        .scalar()
        or 0
    )

    renewed_this_quarter = (
        db.query(func.count(Renewal.id))
        .filter(Renewal.status == RenewalStatus.renewed, Renewal.updated_at >= quarter_ago)
        .scalar()
        or 0
    )
    renewed_last_quarter = (
        db.query(func.count(Renewal.id))
        .filter(
            Renewal.status == RenewalStatus.renewed,
            Renewal.updated_at >= two_quarters_ago,
            Renewal.updated_at < quarter_ago,
        )
        .scalar()
        or 0
    )

    expired_count = db.query(func.count(Renewal.id)).filter(Renewal.status == RenewalStatus.expired).scalar() or 0
    cancelled_count = (
        db.query(func.count(Renewal.id))
        .filter(Renewal.status == RenewalStatus.cancelled, Renewal.updated_at >= fiscal_year_start)
        .scalar()
        or 0
    )

    return schemas.RenewalsSummary(
        upcomingRenewals=upcoming_count,
        upcomingWindowDays=DEFAULT_UPCOMING_WINDOW_DAYS,
        renewedCount=renewed_this_quarter,
        renewedDeltaVsLastQuarter=renewed_this_quarter - renewed_last_quarter,
        expiredCount=expired_count,
        expiredNeedsReview=expired_count > 0,
        cancelledCount=cancelled_count,
    )


# ---- Activity trend ----

def get_activity_trend(db: Session, year: int) -> schemas.ActivityTrendResponse:
    rows = (
        db.query(
            extract("month", Renewal.expiry_date).label("month"),
            Renewal.status,
            func.count(Renewal.id).label("count"),
        )
        .filter(extract("year", Renewal.expiry_date) == year)
        .group_by("month", Renewal.status)
        .all()
    )

    counts = {i: {"renewed": 0, "expired": 0, "upcoming": 0} for i in range(1, 13)}
    for month, status, count in rows:
        month = int(month)
        if status == RenewalStatus.renewed:
            counts[month]["renewed"] = count
        elif status == RenewalStatus.expired:
            counts[month]["expired"] = count
        elif status == RenewalStatus.upcoming:
            counts[month]["upcoming"] = count

    months = [
        schemas.MonthlyActivityPoint(month=MONTH_LABELS[i - 1], **counts[i])
        for i in range(1, 13)
    ]
    return schemas.ActivityTrendResponse(year=year, months=months)


# ---- Reminders ----

def _urgency_for_days(days: int) -> str:
    # Thresholds are approximate defaults — see RenewalReminderSettings for
    # the org-configurable version used to decide *which* renewals surface
    # here in the first place; this just buckets them into a label.
    if days <= 14:
        return "critical"
    if days <= 75:
        return "soon"
    if days <= 100:
        return "upcoming"
    return "planned"


def get_reminder_schedule(db: Session, limit: int) -> schemas.ReminderScheduleResponse:
    now = datetime.utcnow()
    renewals = (
        db.query(Renewal)
        .filter(Renewal.status == RenewalStatus.upcoming, Renewal.expiry_date >= now)
        .order_by(Renewal.expiry_date.asc())
        .limit(limit)
        .all()
    )

    items = [
        schemas.ReminderItem(
            id=r.id,
            contractName=r.contract_name,
            expiresInDays=(r.expiry_date - now).days,
            urgency=_urgency_for_days((r.expiry_date - now).days),
        )
        for r in renewals
    ]
    return schemas.ReminderScheduleResponse(items=items)


# ---- Pipeline (paginated table) ----

def get_pipeline(db: Session, page: int, page_size: int, status: Optional[str], search: Optional[str]) -> schemas.RenewalPipelineResponse:
    query = db.query(Renewal)

    if status:
        query = query.filter(Renewal.status == status)
    if search:
        like = f"%{search}%"
        query = query.filter((Renewal.contract_name.ilike(like)) | (Renewal.counterparty.ilike(like)))

    total = query.count()
    rows = (
        query.order_by(Renewal.expiry_date.asc())
        .offset((page - 1) * page_size)
        .limit(page_size)
        .all()
    )

    return schemas.RenewalPipelineResponse(items=[to_item(r) for r in rows], total=total)


# ---- CRUD ----

def get_renewal(db: Session, renewal_id: UUID) -> Renewal:
    renewal = db.query(Renewal).filter(Renewal.id == renewal_id).first()
    if not renewal:
        raise RenewalNotFoundError(f"Renewal {renewal_id} not found")
    return renewal


def create_renewal(db: Session, payload: schemas.RenewalCreate) -> Renewal:
    renewal = Renewal(
        id=uuid.uuid4(),
        contract_name=payload.contractName,
        counterparty=payload.counterparty,
        expiry_date=payload.expiryDate,
        value=payload.value,
        notice_period_days=payload.noticePeriodDays,
        status=RenewalStatus.upcoming,
    )
    db.add(renewal)
    db.commit()
    db.refresh(renewal)
    return renewal


def update_renewal(db: Session, renewal_id: UUID, payload: schemas.RenewalUpdate) -> Renewal:
    renewal = get_renewal(db, renewal_id)

    if payload.contractName is not None:
        renewal.contract_name = payload.contractName
    if payload.counterparty is not None:
        renewal.counterparty = payload.counterparty
    if payload.expiryDate is not None:
        renewal.expiry_date = payload.expiryDate
    if payload.value is not None:
        renewal.value = payload.value
    if payload.noticePeriodDays is not None:
        renewal.notice_period_days = payload.noticePeriodDays
    if payload.status is not None:
        renewal.status = RenewalStatus(payload.status)

    db.commit()
    db.refresh(renewal)
    return renewal


def renew_contract(db: Session, renewal_id: UUID, payload: schemas.RenewContractRequest) -> Renewal:
    renewal = get_renewal(db, renewal_id)
    renewal.expiry_date = payload.newExpiryDate
    if payload.value is not None:
        renewal.value = payload.value
    renewal.status = RenewalStatus.renewed
    db.commit()
    db.refresh(renewal)
    return renewal


def delete_renewal(db: Session, renewal_id: UUID) -> None:
    renewal = get_renewal(db, renewal_id)
    db.delete(renewal)
    db.commit()


# ---- Reminder settings (singleton) ----

def get_or_create_reminder_settings(db: Session) -> RenewalReminderSettings:
    settings = db.query(RenewalReminderSettings).filter(RenewalReminderSettings.id == REMINDER_SETTINGS_SINGLETON_ID).first()
    if not settings:
        settings = RenewalReminderSettings(id=REMINDER_SETTINGS_SINGLETON_ID)
        db.add(settings)
        db.commit()
        db.refresh(settings)
    return settings


def update_reminder_settings(db: Session, thresholds: list[int]) -> RenewalReminderSettings:
    settings = get_or_create_reminder_settings(db)
    settings.thresholds = thresholds
    db.commit()
    db.refresh(settings)
    return settings
