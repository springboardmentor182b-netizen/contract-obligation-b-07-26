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
def read_contracts(
    skip: int = 0,
    limit: int = 100,
    status: str = None,
    category: str = None,
    search: str = None,
    db: Session = Depends(get_db),
):
    return contract_service.get_contracts(db, skip=skip, limit=limit, status=status, category=category, search=search)


@router.post("/", response_model=ContractResponse)
def create_contract(
    contract: ContractCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    return contract_service.create_contract(db=db, contract=contract)


@router.get("/{id}", response_model=ContractResponse)
def read_contract(id: int, db: Session = Depends(get_db)):
    db_contract = contract_service.get_contract(db, id)

    if db_contract is None:
        raise HTTPException(status_code=404, detail="Contract not found")

    return db_contract


@router.put("/{id}", response_model=ContractResponse)
def update_contract(
    id: int,
    contract: ContractUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    db_contract = contract_service.update_contract(db, id, contract)

    if db_contract is None:
        raise HTTPException(status_code=404, detail="Contract not found")

    return db_contract


@router.delete("/{id}")
def delete_contract(
    id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    db_contract = contract_service.delete_contract(db, id)

    if db_contract is None:
        raise HTTPException(status_code=404, detail="Contract not found")

    return {"message": "Contract deleted successfully"}


@router.get("/stats/summary")
def get_contract_stats(db: Session = Depends(get_db)):
    return contract_service.get_contract_stats(db)



