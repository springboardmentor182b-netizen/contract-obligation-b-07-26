from pydantic import BaseModel
from datetime import date
from typing import Optional
class MissedObligationBase(BaseModel):

    obligation_name: str
    contract: Optional[str] = None
    department: str
    owner: str
    due_date: date
    missed_days: int
    priority: str
    status: str


class MissedObligationCreate(MissedObligationBase):
    pass


class MissedObligationResponse(MissedObligationBase):

    id: int

    class Config:
        from_attributes = True
