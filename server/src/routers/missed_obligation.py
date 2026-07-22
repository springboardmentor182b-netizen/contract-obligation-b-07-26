from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.config.database import get_db

from app.schemas.missed_obligation import (
    MissedObligationCreate,
    MissedObligationResponse
)

from app.services import missed_obligation_service

router = APIRouter(
    prefix="/missed-obligations",
    tags=["Missed Obligations"]
)


# GET ALL MISSED OBLIGATIONS

@router.get(
    "/",
    response_model=List[MissedObligationResponse]
)
def get_all_missed_obligations(
    db: Session = Depends(get_db)
):

    return missed_obligation_service.get_all_missed_obligations(db)


# GET MISSED OBLIGATION BY ID

@router.get(
    "/{obligation_id}",
    response_model=MissedObligationResponse
)
def get_missed_obligation(
    obligation_id: int,
    db: Session = Depends(get_db)
):

    obligation = missed_obligation_service.get_missed_obligation_by_id(
        db,
        obligation_id
    )

    if obligation is None:

        raise HTTPException(
            status_code=404,
            detail="Missed Obligation not found"
        )

    return obligation


# CREATE MISSED OBLIGATION

@router.post(
    "/",
    response_model=MissedObligationResponse,
    status_code=201
)
def create_missed_obligation(
    obligation: MissedObligationCreate,
    db: Session = Depends(get_db)
):

    return missed_obligation_service.create_missed_obligation(
        db,
        obligation
    )


# UPDATE MISSED OBLIGATION

@router.put(
    "/{obligation_id}",
    response_model=MissedObligationResponse
)
def update_missed_obligation(
    obligation_id: int,
    obligation: MissedObligationCreate,
    db: Session = Depends(get_db)
):

    updated = missed_obligation_service.update_missed_obligation(
        db,
        obligation_id,
        obligation
    )

    if updated is None:

        raise HTTPException(
            status_code=404,
            detail="Missed Obligation not found"
        )

    return updated


# DELETE MISSED OBLIGATION

@router.delete("/{obligation_id}")
def delete_missed_obligation(
    obligation_id: int,
    db: Session = Depends(get_db)
):

    deleted = missed_obligation_service.delete_missed_obligation(
        db,
        obligation_id
    )

    if deleted is None:

        raise HTTPException(
            status_code=404,
            detail="Missed Obligation not found"
        )

    return deleted
