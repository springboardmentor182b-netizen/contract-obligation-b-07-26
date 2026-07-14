from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from src.entities.obligation import ObligationStatus, ObligationPriority


class ObligationBase(BaseModel):
    title: str
    description: Optional[str] = None
    status: ObligationStatus = ObligationStatus.PENDING
    priority: ObligationPriority = ObligationPriority.MEDIUM
    due_date: Optional[datetime] = None
    assigned_to: Optional[int] = None


class ObligationCreate(ObligationBase):
    contract_id: int


class ObligationUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[ObligationStatus] = None
    priority: Optional[ObligationPriority] = None
    due_date: Optional[datetime] = None
    assigned_to: Optional[int] = None


class ObligationResponse(ObligationBase):
    id: int
    contract_id: int
    completed_date: Optional[datetime]
    is_active: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
