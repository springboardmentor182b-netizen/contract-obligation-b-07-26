from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from src.database.session import get_db

from src.schemas.obligation import ObligationCreate, ObligationResponse
from src.services.obligation_service import (
    create_obligation,
    get_all_obligations,
    get_obligation,
    delete_obligation as delete_obligation_service,
    update_obligation
)

router = APIRouter(
    tags=["Obligations"]
)


@router.post("/", response_model=ObligationResponse)
def create(
        obligation: ObligationCreate,
        db: Session = Depends(get_db)
):
    return create_obligation(db, obligation)


from typing import List

@router.get("/", response_model=List[ObligationResponse])
def read_all(
        db: Session = Depends(get_db)
):
    return get_all_obligations(db)


@router.get("/{id}", response_model=ObligationResponse)
def read_one(
        id: int,
        db: Session = Depends(get_db)
):

    obligation = get_obligation(db, id)

    if not obligation:

        raise HTTPException(
            status_code=404,
            detail="Obligation not found"
        )

    return obligation




@router.delete("/{obligation_id}")
def delete(
    obligation_id: int,
    db: Session = Depends(get_db)
):
    result = delete_obligation_service(db, obligation_id)
    if not result:
        raise HTTPException(status_code=404, detail="Obligation not found")
    return {"message": "Deleted Successfully"}

@router.put("/{obligation_id}", response_model=ObligationResponse)
def update(
    obligation_id: int,
    obligation: ObligationCreate,
    db: Session = Depends(get_db)
):
    return update_obligation(
        db,
        obligation_id,
        obligation
    )
