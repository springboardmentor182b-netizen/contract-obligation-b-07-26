from fastapi import APIRouter, HTTPException, Response, status

from app.schemas.obligation import (
    ObligationCreate,
    ObligationResponse,
    ObligationUpdate,
)
from app.services.obligation_service import obligation_service

router = APIRouter()


@router.get("", response_model=list[ObligationResponse])
def list_obligations():
    return obligation_service.list_all()


@router.get("/{obligation_id}", response_model=ObligationResponse)
def get_obligation(obligation_id: str):
    obligation = obligation_service.get_by_id(obligation_id)

    if obligation is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Obligation not found",
        )

    return obligation


@router.post(
    "",
    response_model=ObligationResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_obligation(payload: ObligationCreate):
    return obligation_service.create(payload)


@router.put("/{obligation_id}", response_model=ObligationResponse)
def update_obligation(
    obligation_id: str,
    payload: ObligationUpdate,
):
    obligation = obligation_service.update(obligation_id, payload)

    if obligation is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Obligation not found",
        )

    return obligation


@router.delete("/{obligation_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_obligation(obligation_id: str):
    deleted = obligation_service.delete(obligation_id)

    if not deleted:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Obligation not found",
        )

    return Response(status_code=status.HTTP_204_NO_CONTENT)
