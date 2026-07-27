from typing import Optional
from sqlalchemy.orm import Session
from sqlalchemy import or_

from src.entities.contract import Contract
from src.contracts.models import ContractCreate, ContractUpdate
from src.exceptions import NotFoundException


def _next_id(db: Session) -> str:
    count = db.query(Contract).count() + 1
    return f"CTR-2024-{count:03d}"


def get_contracts(
    db: Session,
    search: Optional[str] = None,
    type_filter: Optional[str] = None,
    status_filter: Optional[str] = None,
):
    query = db.query(Contract)

    if search:
        like = f"%{search}%"
        query = query.filter(
            or_(Contract.name.ilike(like), Contract.party.ilike(like), Contract.id.ilike(like))
        )
    if type_filter and type_filter != "All":
        query = query.filter(Contract.type == type_filter)
    if status_filter and status_filter != "All":
        query = query.filter(Contract.status == status_filter)

    return query.order_by(Contract.id).all()


def get_contract(db: Session, contract_id: str) -> Contract:
    contract = db.query(Contract).filter(Contract.id == contract_id).first()
    if not contract:
        raise NotFoundException(f"Contract '{contract_id}' not found")
    return contract


def get_summary(db: Session, filtered_count: int):
    total = db.query(Contract).count()
    active = db.query(Contract).filter(Contract.status == "Active").count()
    expiring_soon = db.query(Contract).filter(Contract.status == "Expiring Soon").count()
    return {
        "total": total,
        "active": active,
        "expiring_soon": expiring_soon,
        "showing": filtered_count,
    }


def create_contract(db: Session, payload: ContractCreate) -> Contract:
    contract_id = payload.id or _next_id(db)
    contract = Contract(id=contract_id, **payload.model_dump(exclude={"id"}))
    db.add(contract)
    db.commit()
    db.refresh(contract)
    return contract


def update_contract(db: Session, contract_id: str, payload: ContractUpdate) -> Contract:
    contract = get_contract(db, contract_id)
    for field, value in payload.model_dump(exclude_unset=True).items():
        setattr(contract, field, value)
    db.commit()
    db.refresh(contract)
    return contract


def delete_contract(db: Session, contract_id: str) -> None:
    contract = get_contract(db, contract_id)
    db.delete(contract)
    db.commit()
