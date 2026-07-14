from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from src.entities.compliance import ComplianceStatus


class ComplianceBase(BaseModel):
    requirement: str
    status: ComplianceStatus = ComplianceStatus.PENDING_REVIEW
    due_date: Optional[datetime] = None
    notes: Optional[str] = None
    evidence_file: Optional[str] = None


class ComplianceCreate(ComplianceBase):
    contract_id: int
    reviewed_by: Optional[int] = None


class ComplianceUpdate(BaseModel):
    status: Optional[ComplianceStatus] = None
    due_date: Optional[datetime] = None
    completed_date: Optional[datetime] = None
    reviewed_by: Optional[int] = None
    notes: Optional[str] = None
    evidence_file: Optional[str] = None


class ComplianceResponse(ComplianceBase):
    id: int
    contract_id: int
    reviewed_by: Optional[int]
    completed_date: Optional[datetime]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
