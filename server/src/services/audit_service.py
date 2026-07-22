from sqlalchemy.orm import Session

from app.models.audit import Audit
from app.schemas.audit import AuditCreate


def get_all_audits(db: Session):
    return db.query(Audit).all()


def get_audit_by_id(db: Session, audit_id: int):
    return db.query(Audit).filter(Audit.id == audit_id).first()


def create_audit(db: Session, audit: AuditCreate):
    new_audit = Audit(**audit.model_dump())

    db.add(new_audit)
    db.commit()
    db.refresh(new_audit)

    return new_audit


def update_audit(db: Session, audit_id: int, audit: AuditCreate):

    existing = db.query(Audit).filter(Audit.id == audit_id).first()

    if not existing:
        return None

    existing.audit_name = audit.audit_name
    existing.department = audit.department
    existing.severity = audit.severity
    existing.status = audit.status
    existing.audit_date = audit.audit_date

    db.commit()
    db.refresh(existing)

    return existing


def delete_audit(db: Session, audit_id: int):

    existing = db.query(Audit).filter(Audit.id == audit_id).first()

    if not existing:
        return None

    db.delete(existing)
    db.commit()

    return {"message": "Audit deleted successfully"}
