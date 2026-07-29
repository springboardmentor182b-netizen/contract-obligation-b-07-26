from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.contracts import schemas, services

# Initialize router for this module
router = APIRouter(tags=["Contracts"])

@router.get("/contracts/", response_model=List[schemas.ContractResponse])
def read_contracts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return services.get_all_contracts(db=db, skip=skip, limit=limit)

@router.get("/dashboard/stats/")
def get_dashboard_stats(db: Session = Depends(get_db)):
    return services.get_dashboard_stats(db=db)

@router.post("/contracts/", response_model=schemas.ContractResponse)
def create_contract(contract: schemas.ContractCreate, db: Session = Depends(get_db)):
    return services.create_contract(db=db, contract=contract)

@router.put("/contracts/{contract_id}")
def update_contract(contract_id: int, contract_update: dict, db: Session = Depends(get_db)):
    return services.update_contract(db=db, contract_id=contract_id, contract_update=contract_update)

@router.delete("/contracts/{contract_id}")
def delete_contract(contract_id: int, db: Session = Depends(get_db)):
    return services.delete_contract(db=db, contract_id=contract_id)