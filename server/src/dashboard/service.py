"""Database aggregation queries used by dashboard endpoints."""

from collections import Counter
from datetime import date, datetime, timedelta

from sqlalchemy import String, cast, func, select
from sqlalchemy.orm import Session

from ..entities.models import Activity, Contract, Obligation, Renewal, User


COMPLIANCE_NAMES = ["Compliant", "Pending", "Delayed", "Non-Compliant", "High Risk"]


def _month_labels(months: int = 7) -> list[tuple[int, int, str]]:
    today = date.today().replace(day=1)
    labels = []
    for offset in range(months - 1, -1, -1):
        month_index = today.year * 12 + today.month - 1 - offset
        year, zero_based_month = divmod(month_index, 12)
        month = zero_based_month + 1
        labels.append((year, month, date(year, month, 1).strftime("%b")))
    return labels


def _normalized(column):
    return func.lower(cast(column, String))


def get_stats(db: Session) -> list[dict]:
    today = date.today()
    total = db.scalar(select(func.count()).select_from(Contract)) or 0
    active = db.scalar(select(func.count()).select_from(Contract).where(_normalized(Contract.status) == "active")) or 0
    upcoming = db.scalar(select(func.count()).select_from(Renewal).where(Renewal.renewal_date.between(today, today + timedelta(days=180)))) or 0
    pending = db.scalar(select(func.count()).select_from(Obligation).where(_normalized(Obligation.status).in_(["pending", "in progress", "overdue"]))) or 0
    completed = db.scalar(select(func.count()).select_from(Obligation).where(_normalized(Obligation.status) == "completed")) or 0
    obligation_total = db.scalar(select(func.count()).select_from(Obligation)) or 0
    compliance = round(completed * 100 / obligation_total) if obligation_total else 0
    return [
        {"key": "total_contracts", "label": "Total Contracts", "value": total, "change": "All categories", "detail": ""},
        {"key": "active_contracts", "label": "Active Contracts", "value": active, "change": "Active now", "detail": ""},
        {"key": "upcoming_renewals", "label": "Upcoming Renewals", "value": upcoming, "change": "Next 180 days", "trend": "down", "detail": ""},
        {"key": "pending_obligations", "label": "Pending Obligations", "value": pending, "change": "Needs attention", "trend": "down", "detail": ""},
        {"key": "compliance_score", "label": "Compliance Score", "value": f"{compliance}%", "change": "Completion rate", "detail": ""},
    ]


def get_contract_volume(db: Session) -> list[dict]:
    contracts = db.scalars(select(Contract)).all()
    result = []
    for year, month, label in _month_labels():
        month_start = date(year, month, 1)
        next_month = date(year + (month == 12), 1 if month == 12 else month + 1, 1)
        month_end = next_month - timedelta(days=1)
        active = sum(1 for item in contracts if item.start_date and item.start_date <= month_end and (not item.end_date or item.end_date >= month_start) and str(item.status).lower() == "active")
        new = sum(1 for item in contracts if item.created_at.year == year and item.created_at.month == month)
        expired = sum(1 for item in contracts if item.end_date and item.end_date.year == year and item.end_date.month == month)
        result.append({"month": label, "active": active, "new": new, "expired": expired})
    return result


def get_compliance(db: Session) -> list[dict]:
    buckets = Counter({name: 0 for name in COMPLIANCE_NAMES})
    today = date.today()
    for obligation in db.scalars(select(Obligation)).all():
        status = str(obligation.status).lower()
        if obligation.compliance_level in buckets:
            buckets[obligation.compliance_level] += 1
        elif status == "completed":
            buckets["Compliant"] += 1
        elif status in {"non-compliant", "non compliant"}:
            buckets["Non-Compliant"] += 1
        elif status == "overdue":
            buckets["High Risk"] += 1
        elif obligation.due_date and obligation.due_date < today:
            buckets["Delayed"] += 1
        else:
            buckets["Pending"] += 1
    return [{"name": name, "value": buckets[name]} for name in COMPLIANCE_NAMES]


def get_renewal_trend(db: Session) -> list[dict]:
    renewals = db.scalars(select(Renewal)).all()
    return [{"month": label, "renewals": sum(1 for item in renewals if item.renewal_date and item.renewal_date.year == year and item.renewal_date.month == month)} for year, month, label in _month_labels()]


def _elapsed(when: datetime) -> str:
    hours = max(0, int((datetime.now() - when).total_seconds() // 3600))
    return f"{hours}h ago" if hours < 24 else f"{hours // 24}d ago"


def get_activities(db: Session) -> list[dict]:
    rows = db.execute(select(Activity, Contract.contract_number).outerjoin(Contract, Activity.contract_id == Contract.contract_id).order_by(Activity.activity_time.desc()).limit(8)).all()
    return [{"id": str(item.activity_id), "message": f"{number + ' ' if number else ''}{item.activity}", "time_ago": _elapsed(item.activity_time), "type": "warning" if "renew" in item.activity.lower() else "default"} for item, number in rows]


def get_deadlines(db: Session) -> list[dict]:
    rows = db.execute(select(Obligation, Contract.contract_number, User.full_name).join(Contract, Obligation.contract_id == Contract.contract_id).outerjoin(User, Obligation.assigned_to == User.user_id).where(Obligation.due_date.between(date.today(), date.today() + timedelta(days=90))).order_by(Obligation.due_date).limit(10)).all()
    return [{"id": str(item.obligation_id), "contract_number": number, "obligation": item.title, "due_date": item.due_date.strftime("%b %d, %Y"), "assignee": name or "Unassigned", "assignee_initials": "".join(part[0] for part in (name or "Unassigned").split()[:2]).upper(), "priority": "Critical" if item.due_date <= date.today() + timedelta(days=7) else "High", "status": str(item.status)} for item, number, name in rows]


def get_profile(db: Session) -> dict:
    user = db.scalars(select(User).where(User.status.is_(True)).order_by(User.full_name).limit(1)).first()
    return {"full_name": user.full_name, "role": str(user.role)} if user else {"full_name": None, "role": None}
