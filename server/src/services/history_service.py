from sqlalchemy.orm import Session

from app.models.history import History
from app.schemas.history import HistoryCreate


def get_all_history(db: Session):
    return db.query(History).all()


def get_history_by_id(db: Session, history_id: int):
    return db.query(History).filter(History.id == history_id).first()


def create_history(db: Session, history: HistoryCreate):

    new_history = History(**history.model_dump())

    db.add(new_history)
    db.commit()
    db.refresh(new_history)

    return new_history


def update_history(db: Session, history_id: int, history: HistoryCreate):

    existing = db.query(History).filter(History.id == history_id).first()

    if not existing:
        return None

    existing.activity = history.activity
    existing.department = history.department
    existing.status = history.status
    existing.activity_date = history.activity_date

    db.commit()
    db.refresh(existing)

    return existing


def delete_history(db: Session, history_id: int):

    existing = db.query(History).filter(History.id == history_id).first()

    if not existing:
        return None

    db.delete(existing)
    db.commit()

    return {"message": "History deleted successfully"}
