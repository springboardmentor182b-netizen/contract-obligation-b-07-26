from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from src.entities.renewal import RenewalStatus


class RenewalBase(BaseModel):
    renewal_date: datetime
    new_end_date: Optional[datetime] = None
    status: RenewalStatus = RenewalStatus.PENDING
    terms: Optional[str] = None
    value: Optional[str] = None
    notes: Optional[str] = None


class RenewalCreate(RenewalBase):
    contract_id: int
    requested_by: int


class RenewalUpdate(BaseModel):
    status: Optional[RenewalStatus] = None
    new_end_date: Optional[datetime] = None
    terms: Optional[str] = None
    value: Optional[str] = None
    approved_by: Optional[int] = None
    notes: Optional[str] = None


class RenewalResponse(RenewalBase):
    id: int
    contract_id: int
    requested_by: int
    approved_by: Optional[int]
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
