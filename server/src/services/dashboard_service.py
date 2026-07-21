from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import date
from src.models.obligation import Obligation


def get_dashboard_kpis(db: Session):

    total = db.query(Obligation).count()

    pending = db.query(Obligation).filter(
        Obligation.status == "Pending"
    ).count()

    completed = db.query(Obligation).filter(
        Obligation.status == "Completed"
    ).count()

    overdue = db.query(Obligation).filter(
        Obligation.status == "Overdue"
    ).count()

    in_progress = db.query(Obligation).filter(
        Obligation.status == "In Progress"
    ).count()

    risk = db.query(Obligation).filter(
        Obligation.priority == "High"
    ).count()

    compliance = round(
        (completed / total) * 100,
        2
    ) if total > 0 else 0

    return {

        "total": total,

        "pending": pending,

        "completed": completed,

        "overdue": overdue,

        "in_progress": in_progress,

        "risk": risk,

        "compliance": compliance

    }
def get_upcoming_deadlines(db: Session):

    return (
        db.query(Obligation)
        .filter(Obligation.due_date >= date.today())
        .order_by(Obligation.due_date.asc())
        .limit(5)
        .all()
    )
def get_calendar_events(db: Session):

    obligations = db.query(Obligation).all()

    events = []

    for obligation in obligations:

        events.append({

            "title": obligation.title,

            "date": obligation.due_date,

            "status": obligation.status

        })

    return events
def get_weekly_chart(db: Session):

    completed = db.query(Obligation).filter(
        Obligation.status == "Completed"
    ).count()

    pending = db.query(Obligation).filter(
        Obligation.status == "Pending"
    ).count()

    return [

        {
            "day":"Monday",
            "completed":completed,
            "pending":pending
        },

        {
            "day":"Tuesday",
            "completed":completed+1,
            "pending":pending
        },

        {
            "day":"Wednesday",
            "completed":completed+2,
            "pending":pending-1
        },

        {
            "day":"Thursday",
            "completed":completed+3,
            "pending":pending
        },

        {
            "day":"Friday",
            "completed":completed+4,
            "pending":pending-1
        },

        {
            "day":"Saturday",
            "completed":completed+5,
            "pending":pending
        },

        {
            "day":"Sunday",
            "completed":completed+6,
            "pending":pending-1
        }

    ]
