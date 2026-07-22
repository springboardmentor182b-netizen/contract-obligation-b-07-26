from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.contracts import models, schemas

def get_all_contracts(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Contract).offset(skip).limit(limit).all()

def get_dashboard_stats(db: Session):
    return {
        "draft_count": db.query(models.Contract).filter(models.Contract.status == "Draft").count(),
        "in_review_count": db.query(models.Contract).filter(models.Contract.status == "In Review").count(),
        "approved_count": db.query(models.Contract).filter(models.Contract.status == "Approved").count(),
        "active_count": db.query(models.Contract).filter(models.Contract.status == "Active").count()
    }

def create_contract(db: Session, contract: schemas.ContractCreate):
    try:
        db_contract = models.Contract(**contract.dict())
        db.add(db_contract)
        db.commit()
        db.refresh(db_contract)
        return db_contract
    except Exception as e:
        print("CRASH ERROR:", e)
        raise HTTPException(status_code=500, detail=str(e))

def update_contract(db: Session, contract_id: int, contract_update: dict):
    db_contract = db.query(models.Contract).filter(models.Contract.id == contract_id).first()
    
    if not db_contract:
        raise HTTPException(status_code=404, detail="Contract not found")
    
    for key, value in contract_update.items():
        if hasattr(db_contract, key):
            setattr(db_contract, key, value)
            
    db.commit()
    db.refresh(db_contract)
    return db_contract

def delete_contract(db: Session, contract_id: int):
    db_contract = db.query(models.Contract).filter(models.Contract.id == contract_id).first()
    
    if not db_contract:
        raise HTTPException(status_code=404, detail="Contract not found")
        
    db.delete(db_contract)
    db.commit()
    return {"message": "Contract deleted successfully"}