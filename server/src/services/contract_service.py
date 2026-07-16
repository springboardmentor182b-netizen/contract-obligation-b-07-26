from sqlalchemy.orm import Session
from src.models.contract import Contract
from src.schemas.contract import ContractCreate, ContractUpdate

def get_contracts(db: Session, skip: int = 0, limit: int = 100):
    return db.query(Contract).offset(skip).limit(limit).all()

def get_contract(db: Session, contract_id: int):
    return db.query(Contract).filter(Contract.id == contract_id).first()

def create_contract(db: Session, contract: ContractCreate):
    db_contract = Contract(**contract.model_dump())
    db.add(db_contract)
    db.commit()
    db.refresh(db_contract)
    return db_contract

def update_contract(db: Session, contract_id: int, contract_update: ContractUpdate):
    db_contract = get_contract(db, contract_id)
    if not db_contract:
        return None
    
    update_data = contract_update.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_contract, key, value)
        
    db.commit()
    db.refresh(db_contract)
    return db_contract

def delete_contract(db: Session, contract_id: int):
    db_contract = get_contract(db, contract_id)
    if db_contract:
        db.delete(db_contract)
        db.commit()
    return db_contract
