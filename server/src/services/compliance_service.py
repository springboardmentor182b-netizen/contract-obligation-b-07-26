from sqlalchemy.orm import Session

from app.models.compliance import Compliance
from app.schemas.compliance import ComplianceCreate


def get_all_compliance(db: Session):

    return db.query(Compliance).all()


def get_compliance_by_id(db: Session, compliance_id: int):

    return db.query(Compliance).filter(
        Compliance.id == compliance_id
    ).first()


def create_compliance(
    db: Session,
    compliance: ComplianceCreate
):

    new_compliance = Compliance(**compliance.model_dump())

    db.add(new_compliance)

    db.commit()

    db.refresh(new_compliance)

    return new_compliance


def update_compliance(
    db: Session,
    compliance_id: int,
    compliance: ComplianceCreate
):

    existing = db.query(Compliance).filter(
        Compliance.id == compliance_id
    ).first()

    if not existing:
        return None

    existing.title = compliance.title
    existing.department = compliance.department
    existing.status = compliance.status
    existing.compliance_score = compliance.compliance_score
    existing.risk_level = compliance.risk_level

    db.commit()

    db.refresh(existing)

    return existing


def delete_compliance(
    db: Session,
    compliance_id: int
):

    existing = db.query(Compliance).filter(
        Compliance.id == compliance_id
    ).first()

    if not existing:
        return None

    db.delete(existing)

    db.commit()

    return {
        "message": "Compliance deleted successfully"
    }
