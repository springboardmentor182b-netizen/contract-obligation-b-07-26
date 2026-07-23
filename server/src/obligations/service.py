from typing import Optional
from sqlalchemy.orm import Session
from src.entities.obligation import Obligation
from src.entities.contract import Contract
from src.obligations.models import ObligationCreate, ObligationUpdate
from src.exceptions import NotFoundException, ConflictException

def _next_id(db: Session) -> str:
    existing = [row[0] for row in db.query(Obligation.id).all()]
    numbers = []
    for value in existing:
        try:
            numbers.append(int(value.rsplit("-", 1)[-1]))
        except (ValueError, AttributeError):
            continue
    return f"OBL-{max(numbers, default=0) + 1:03d}"

def get_obligations(db: Session, contract_id: Optional[str] = None):
    query = db.query(Obligation)
    if contract_id:
        query = query.filter(Obligation.contract_id == contract_id)
    return query.order_by(Obligation.due, Obligation.id).all()

def get_obligation(db: Session, obligation_id: str) -> Obligation:
    obligation = db.query(Obligation).filter(Obligation.id == obligation_id).first()
    if not obligation:
        raise NotFoundException(f"Obligation '{obligation_id}' not found")
    return obligation

def create_obligation(db: Session, payload: ObligationCreate) -> Obligation:
    if not db.query(Contract).filter(Contract.id == payload.contract_id).first():
        raise NotFoundException(f"Contract '{payload.contract_id}' not found")
    obligation_id = payload.id or _next_id(db)
    if db.query(Obligation).filter(Obligation.id == obligation_id).first():
        raise ConflictException(f"Obligation '{obligation_id}' already exists")
    obligation = Obligation(id=obligation_id, **payload.model_dump(exclude={"id"}))
    db.add(obligation)
    db.commit()
    db.refresh(obligation)
    return obligation

def update_obligation(db: Session, obligation_id: str, payload: ObligationUpdate) -> Obligation:
    obligation = get_obligation(db, obligation_id)
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(obligation, field, value)
    db.commit()
    db.refresh(obligation)
    return obligation

def delete_obligation(db: Session, obligation_id: str) -> None:
    obligation = get_obligation(db, obligation_id)
    db.delete(obligation)
    db.commit()
