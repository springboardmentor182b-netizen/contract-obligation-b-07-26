from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.config.database import get_db

from app.schemas.compliance import (
    ComplianceCreate,
    ComplianceResponse,
)

from app.services import compliance_service

router = APIRouter(
    prefix="/compliance",
    tags=["Compliance"]
)


# GET ALL COMPLIANCE RECORDS

@router.get(
    "/",
    response_model=List[ComplianceResponse]
)
def get_all_compliance(
    db: Session = Depends(get_db)
):

    return compliance_service.get_all_compliance(db)


# GET COMPLIANCE BY ID

@router.get(
    "/{compliance_id}",
    response_model=ComplianceResponse
)
def get_compliance(
    compliance_id: int,
    db: Session = Depends(get_db)
):

    compliance = compliance_service.get_compliance_by_id(
        db,
        compliance_id
    )

    if compliance is None:

        raise HTTPException(
            status_code=404,
            detail="Compliance record not found"
        )

    return compliance


# CREATE COMPLIANCE

@router.post(
    "/",
    response_model=ComplianceResponse,
    status_code=201
)
def create_compliance(
    compliance: ComplianceCreate,
    db: Session = Depends(get_db)
):

    return compliance_service.create_compliance(
        db,
        compliance
    )


# UPDATE COMPLIANCE

@router.put(
    "/{compliance_id}",
    response_model=ComplianceResponse
)
def update_compliance(
    compliance_id: int,
    compliance: ComplianceCreate,
    db: Session = Depends(get_db)
):

    updated = compliance_service.update_compliance(
        db,
        compliance_id,
        compliance
    )

    if updated is None:

        raise HTTPException(
            status_code=404,
            detail="Compliance record not found"
        )

    return updated


# DELETE COMPLIANCE

@router.delete("/{compliance_id}")
def delete_compliance(
    compliance_id: int,
    db: Session = Depends(get_db)
):

    deleted = compliance_service.delete_compliance(
        db,
        compliance_id
    )

    if deleted is None:

        raise HTTPException(
            status_code=404,
            detail="Compliance record not found"
        )

    return deleted
