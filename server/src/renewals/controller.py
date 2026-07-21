from datetime import date

from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from src.database.core import get_db
from src.renewals.models import Renewal
from src.renewals.service import (
    get_all_renewals,
    get_renewal_by_id,
    create_renewal,
    update_renewal,
    delete_renewal,
)

router = APIRouter(
    prefix="/renewals",
    tags=["Renewals"]
)


class RenewalCreate(BaseModel):
    contract_id: int
    renewal_date: date
    reminder_date: date
    renewal_status: str
    approved_by: int | None = None
    notes: str | None = None


@router.get("/")
def fetch_renewals(db: Session = Depends(get_db)):
    return get_all_renewals(db)


@router.get("/{renewal_id}")
def fetch_renewal(
    renewal_id: int,
    db: Session = Depends(get_db)
):
    renewal = get_renewal_by_id(db, renewal_id)

    if not renewal:
        raise HTTPException(
            status_code=404,
            detail="Renewal not found"
        )

    return renewal


@router.post("/")
def add_renewal(
    data: RenewalCreate,
    db: Session = Depends(get_db)
):
    renewal = Renewal(**data.model_dump())
    return create_renewal(db, renewal)


@router.put("/{renewal_id}")
def edit_renewal(
    renewal_id: int,
    data: RenewalCreate,
    db: Session = Depends(get_db)
):
    renewal = update_renewal(
        db,
        renewal_id,
        data.model_dump()
    )

    if not renewal:
        raise HTTPException(
            status_code=404,
            detail="Renewal not found"
        )

    return renewal


@router.delete("/{renewal_id}")
def remove_renewal(
    renewal_id: int,
    db: Session = Depends(get_db)
):
    renewal = delete_renewal(db, renewal_id)

    if not renewal:
        raise HTTPException(
            status_code=404,
            detail="Renewal not found"
        )

    return {
        "message": "Renewal deleted successfully"
    }