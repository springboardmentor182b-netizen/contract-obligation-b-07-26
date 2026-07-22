from sqlalchemy.orm import Session

from app.models.risk import Risk
from app.schemas.risk import RiskCreate


def get_all_risks(db: Session):
    return db.query(Risk).all()


def get_risk_by_id(db: Session, risk_id: int):
    return db.query(Risk).filter(Risk.id == risk_id).first()


def create_risk(db: Session, risk: RiskCreate):

    new_risk = Risk(**risk.model_dump())

    db.add(new_risk)
    db.commit()
    db.refresh(new_risk)

    return new_risk


def update_risk(db: Session, risk_id: int, risk: RiskCreate):

    existing = db.query(Risk).filter(Risk.id == risk_id).first()

    if not existing:
        return None

    existing.risk_name = risk.risk_name
    existing.department = risk.department
    existing.severity = risk.severity
    existing.status = risk.status
    existing.owner = risk.owner

    db.commit()
    db.refresh(existing)

    return existing


def delete_risk(db: Session, risk_id: int):

    existing = db.query(Risk).filter(Risk.id == risk_id).first()

    if not existing:
        return None

    db.delete(existing)
    db.commit()

    return {"message": "Risk deleted successfully"}
