from fastapi import APIRouter, HTTPException
from typing import Optional
from app.models.obligation import Obligation, ObligationCreate, ObligationUpdate, Status, Priority
from app.services import obligation_service as svc

router = APIRouter(prefix="/obligations", tags=["Obligations"])


@router.get("/", response_model=list[Obligation])
def list_obligations(status: Optional[Status] = None, priority: Optional[Priority] = None):
    return svc.get_obligations(status=status, priority=priority)


@router.get("/{obligation_id}", response_model=Obligation)
def get_obligation(obligation_id: int):
    obligation = svc.get_obligation(obligation_id)
    if not obligation:
        raise HTTPException(status_code=404, detail="Obligation not found")
    return obligation


@router.post("/", response_model=Obligation, status_code=201)
def create_obligation(payload: ObligationCreate):
    return svc.create_obligation(payload)


@router.put("/{obligation_id}", response_model=Obligation)
def update_obligation(obligation_id: int, payload: ObligationUpdate):
    updated = svc.update_obligation(obligation_id, payload)
    if not updated:
        raise HTTPException(status_code=404, detail="Obligation not found")
    return updated


@router.patch("/{obligation_id}/status", response_model=Obligation)
def update_status(obligation_id: int, status: Status):
    updated = svc.update_status(obligation_id, status)
    if not updated:
        raise HTTPException(status_code=404, detail="Obligation not found")
    return updated


@router.delete("/{obligation_id}", status_code=204)
def delete_obligation(obligation_id: int):
    if not svc.delete_obligation(obligation_id):
        raise HTTPException(status_code=404, detail="Obligation not found")
