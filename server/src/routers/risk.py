from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.config.database import get_db

from app.schemas.risk import (
    RiskCreate,
    RiskResponse
)

from app.services import risk_service

router = APIRouter(
    prefix="/risk",
    tags=["Risk"]
)


# GET ALL RISKS

@router.get(
    "/",
    response_model=List[RiskResponse]
)
def get_all_risks(
    db: Session = Depends(get_db)
):

    return risk_service.get_all_risks(db)


# GET RISK BY ID

@router.get(
    "/{risk_id}",
    response_model=RiskResponse
)
def get_risk(
    risk_id: int,
    db: Session = Depends(get_db)
):

    risk = risk_service.get_risk_by_id(
        db,
        risk_id
    )

    if risk is None:

        raise HTTPException(
            status_code=404,
            detail="Risk record not found"
        )

    return risk


# CREATE RISK

@router.post(
    "/",
    response_model=RiskResponse,
    status_code=201
)
def create_risk(
    risk: RiskCreate,
    db: Session = Depends(get_db)
):

    return risk_service.create_risk(
        db,
        risk
    )


# UPDATE RISK

@router.put(
    "/{risk_id}",
    response_model=RiskResponse
)
def update_risk(
    risk_id: int,
    risk: RiskCreate,
    db: Session = Depends(get_db)
):

    updated = risk_service.update_risk(
        db,
        risk_id,
        risk
    )

    if updated is None:

        raise HTTPException(
            status_code=404,
            detail="Risk record not found"
        )

    return updated


# DELETE RISK

@router.delete("/{risk_id}")
def delete_risk(
    risk_id: int,
    db: Session = Depends(get_db)
):

    deleted = risk_service.delete_risk(
        db,
        risk_id
    )

    if deleted is None:

        raise HTTPException(
            status_code=404,
            detail="Risk record not found"
        )

    return deleted
