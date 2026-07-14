from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.database.core import get_db
from src.obligations.service import ObligationService
from src.obligations.models import ObligationCreate, ObligationUpdate, ObligationResponse

router = APIRouter(prefix="/obligations", tags=["obligations"])


def get_obligation_service(db: Session = Depends(get_db)):
    return ObligationService(db)


@router.get("/", response_model=list[ObligationResponse])
def get_all_obligations(
    contract_id: int = None,
    status: str = None,
    service: ObligationService = Depends(get_obligation_service)
):
    return service.get_all_obligations(contract_id, status)


@router.get("/{obligation_id}", response_model=ObligationResponse)
def get_obligation(obligation_id: int, service: ObligationService = Depends(get_obligation_service)):
    obligation = service.get_obligation_by_id(obligation_id)
    if not obligation:
        raise HTTPException(status_code=404, detail="Obligation not found")
    return obligation


@router.post("/", response_model=ObligationResponse)
def create_obligation(obligation_data: ObligationCreate, service: ObligationService = Depends(get_obligation_service)):
    return service.create_obligation(obligation_data)


@router.put("/{obligation_id}", response_model=ObligationResponse)
def update_obligation(obligation_id: int, obligation_data: ObligationUpdate, service: ObligationService = Depends(get_obligation_service)):
    obligation = service.update_obligation(obligation_id, obligation_data)
    if not obligation:
        raise HTTPException(status_code=404, detail="Obligation not found")
    return obligation


@router.delete("/{obligation_id}")
def delete_obligation(obligation_id: int, service: ObligationService = Depends(get_obligation_service)):
    result = service.delete_obligation(obligation_id)
    if not result:
        raise HTTPException(status_code=404, detail="Obligation not found")
    return result
