from sqlalchemy.orm import Session

from app.models.missed_obligation import MissedObligation
from app.schemas.missed_obligation import MissedObligationCreate


def get_all_missed_obligations(db: Session):
    return db.query(MissedObligation).all()


def get_missed_obligation_by_id(db: Session, obligation_id: int):
    return db.query(MissedObligation).filter(
        MissedObligation.id == obligation_id
    ).first()


def create_missed_obligation(
    db: Session,
    obligation: MissedObligationCreate
):

    new_obligation = MissedObligation(**obligation.model_dump())

    db.add(new_obligation)
    db.commit()
    db.refresh(new_obligation)

    return new_obligation


def update_missed_obligation(
    db: Session,
    obligation_id: int,
    obligation: MissedObligationCreate
):

    existing = db.query(MissedObligation).filter(
        MissedObligation.id == obligation_id
    ).first()

    if not existing:
        return None

    existing.obligation_name = obligation.obligation_name
    existing.contract = obligation.contract
    existing.department = obligation.department
    existing.owner = obligation.owner
    existing.due_date = obligation.due_date
    existing.missed_days = obligation.missed_days
    existing.priority = obligation.priority
    existing.status = obligation.status

    db.commit()
    db.refresh(existing)

    return existing


def delete_missed_obligation(
    db: Session,
    obligation_id: int
):

    existing = db.query(MissedObligation).filter(
        MissedObligation.id == obligation_id
    ).first()

    if not existing:
        return None

    db.delete(existing)
    db.commit()

    return {
        "message": "Missed Obligation deleted successfully"
    }
