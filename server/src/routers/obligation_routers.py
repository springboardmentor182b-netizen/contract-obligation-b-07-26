from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from src.database.session import get_db

from src.schemas.obligation import *

from src.services.obligation_service import *

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
