from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.config.database import get_db

from app.schemas.history import (
    HistoryCreate,
    HistoryResponse
)

from app.services import history_service

router = APIRouter(
    prefix="/history",
    tags=["History"]
)


# GET ALL HISTORY

@router.get(
    "/",
    response_model=List[HistoryResponse]
)
def get_all_history(
    db: Session = Depends(get_db)
):

    return history_service.get_all_history(db)


# GET HISTORY BY ID

@router.get(
    "/{history_id}",
    response_model=HistoryResponse
)
def get_history(
    history_id: int,
    db: Session = Depends(get_db)
):

    history = history_service.get_history_by_id(
        db,
        history_id
    )

    if history is None:

        raise HTTPException(
            status_code=404,
            detail="History record not found"
        )

    return history


# CREATE HISTORY

@router.post(
    "/",
    response_model=HistoryResponse,
    status_code=201
)
def create_history(
    history: HistoryCreate,
    db: Session = Depends(get_db)
):

    return history_service.create_history(
        db,
        history
    )


# UPDATE HISTORY

@router.put(
    "/{history_id}",
    response_model=HistoryResponse
)
def update_history(
    history_id: int,
    history: HistoryCreate,
    db: Session = Depends(get_db)
):

    updated = history_service.update_history(
        db,
        history_id,
        history
    )

    if updated is None:

        raise HTTPException(
            status_code=404,
            detail="History record not found"
        )

    return updated


# DELETE HISTORY

@router.delete("/{history_id}")
def delete_history(
    history_id: int,
    db: Session = Depends(get_db)
):

    deleted = history_service.delete_history(
        db,
        history_id
    )

    if deleted is None:

        raise HTTPException(
            status_code=404,
            detail="History record not found"
        )

    return deleted
