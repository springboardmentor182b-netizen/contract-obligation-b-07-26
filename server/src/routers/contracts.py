from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from src.database.session import get_db
from src.schemas.contract import ContractCreate, ContractResponse, ContractUpdate
from src.services import contract_service
from src.auth.dependencies import get_current_active_user
from src.models.user import User

router = APIRouter()

@router.get("/", response_model=List[ContractResponse])
def read_contracts(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    contracts = contract_service.get_contracts(db, skip=skip, limit=limit)
    return contracts

@router.post("/", response_model=ContractResponse)
def create_contract(
    contract: ContractCreate, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    return contract_service.create_contract(db=db, contract=contract)

@router.get("/{contract_id}", response_model=ContractResponse)
def read_contract(contract_id: int, db: Session = Depends(get_db)):
    db_contract = contract_service.get_contract(db, contract_id=contract_id)
    if db_contract is None:
        raise HTTPException(status_code=404, detail="Contract not found")
    return db_contract

@router.put("/{contract_id}", response_model=ContractResponse)
def update_contract(
    contract_id: int, 
    contract: ContractUpdate, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    db_contract = contract_service.update_contract(db, contract_id, contract)
    if db_contract is None:
        raise HTTPException(status_code=404, detail="Contract not found")
    return db_contract

@router.delete("/{contract_id}")
def delete_contract(
    contract_id: int, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    db_contract = contract_service.delete_contract(db, contract_id)
    if db_contract is None:
        raise HTTPException(status_code=404, detail="Contract not found")
    return {"message": "Contract deleted successfully"}
