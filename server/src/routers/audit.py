from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.config.database import get_db

from app.schemas.audit import (
    AuditCreate,
    AuditResponse
)

from app.services import audit_service

router = APIRouter(
    prefix="/audit",
    tags=["Audit"]
)


# GET ALL AUDITS

@router.get(
    "/",
    response_model=List[AuditResponse]
)
def get_all_audits(
    db: Session = Depends(get_db)
):

    return audit_service.get_all_audits(db)


# GET AUDIT BY ID

@router.get(
    "/{audit_id}",
    response_model=AuditResponse
)
def get_audit(
    audit_id: int,
    db: Session = Depends(get_db)
):

    audit = audit_service.get_audit_by_id(
        db,
        audit_id
    )

    if audit is None:

        raise HTTPException(
            status_code=404,
            detail="Audit not found"
        )

    return audit


# CREATE AUDIT

@router.post(
    "/",
    response_model=AuditResponse,
    status_code=201
)
def create_audit(
    audit: AuditCreate,
    db: Session = Depends(get_db)
):

    return audit_service.create_audit(
        db,
        audit
    )


# UPDATE AUDIT

@router.put(
    "/{audit_id}",
    response_model=AuditResponse
)
def update_audit(
    audit_id: int,
    audit: AuditCreate,
    db: Session = Depends(get_db)
):

    updated = audit_service.update_audit(
        db,
        audit_id,
        audit
    )

    if updated is None:

        raise HTTPException(
            status_code=404,
            detail="Audit not found"
        )

    return updated


# DELETE AUDIT

@router.delete("/{audit_id}")
def delete_audit(
    audit_id: int,
    db: Session = Depends(get_db)
):

    deleted = audit_service.delete_audit(
        db,
        audit_id
    )

    if deleted is None:

        raise HTTPException(
            status_code=404,
            detail="Audit not found"
        )

    return deleted
