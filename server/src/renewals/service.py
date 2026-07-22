from sqlalchemy.orm import Session

from src.renewals.models import Renewal


def get_all_renewals(db: Session):
    return db.query(Renewal).all()


def get_renewal_by_id(db: Session, renewal_id: int):
    return (
        db.query(Renewal)
        .filter(Renewal.id == renewal_id)
        .first()
    )


def create_renewal(db: Session, renewal: Renewal):
    db.add(renewal)
    db.commit()
    db.refresh(renewal)
    return renewal


def update_renewal(db: Session, renewal_id: int, data: dict):
    renewal = (
        db.query(Renewal)
        .filter(Renewal.id == renewal_id)
        .first()
    )

    if not renewal:
        return None

    for key, value in data.items():
        setattr(renewal, key, value)

    db.commit()
    db.refresh(renewal)

    return renewal


def delete_renewal(db: Session, renewal_id: int):
    renewal = (
        db.query(Renewal)
        .filter(Renewal.id == renewal_id)
        .first()
    )

    if not renewal:
        return None

    db.delete(renewal)
    db.commit()

    return renewal