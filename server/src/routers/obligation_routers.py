from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from ..database.session import get_db

from ..obligation_schemas import ObligationCreate

from ..services.obligation_service import (
    create_obligation,
    get_all_obligations,
    get_obligation,
    update_obligation,
)
from ..models.obligation import Obligation

router = APIRouter(
    prefix="/obligations",
    tags=["Obligations"]
)


@router.post("/")
def create(
        obligation: ObligationCreate,
        db: Session = Depends(get_db)
):
    return create_obligation(db, obligation)


@router.get("/")
def read_all(
        db: Session = Depends(get_db)
):
    return get_all_obligations(db)


@router.get("/{id}")
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

def delete_obligation(

    obligation_id: int,

    db: Session = Depends(get_db)

):

    obligation = db.query(Obligation).filter(

        Obligation.id == obligation_id

    ).first()

    if not obligation:

        return {

            "message":"Not Found"

        }

    db.delete(obligation)

    db.commit()

    return {

        "message":"Deleted Successfully"

    }

@router.put("/{obligation_id}")
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
