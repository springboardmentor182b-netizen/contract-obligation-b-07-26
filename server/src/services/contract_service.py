from sqlalchemy.orm import Session
from src.models.contract import Contract
from src.schemas.contract import ContractCreate, ContractUpdate

def get_contracts(db: Session, skip: int = 0, limit: int = 100, status: str = None, category: str = None, search: str = None):
    query = db.query(Contract)
    
    if status:
        query = query.filter(Contract.status == status)
    
    if category:
        query = query.filter(Contract.category == category)
    
    if search:
        search_pattern = f"%{search}%"
        query = query.filter(
            (Contract.name.ilike(search_pattern)) |
            (Contract.party.ilike(search_pattern)) |
            (Contract.contract_id.ilike(search_pattern))
        )
    
    return query.offset(skip).limit(limit).all()

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

def get_contract_stats(db: Session):
    from sqlalchemy import func
    
    stats = {}
    
    # Get total count
    stats['total'] = db.query(Contract).count()
    
    # Get counts by status
    status_counts = db.query(
        Contract.status,
        func.count(Contract.id)
    ).group_by(Contract.status).all()
    
    for status, count in status_counts:
        stats[status.lower().replace(' ', '_')] = count
    
    # Ensure all statuses have a value
    all_statuses = ['draft', 'under_review', 'approved', 'active', 'expired', 'terminated']
    for status in all_statuses:
        if status not in stats:
            stats[status] = 0
    
    return stats
