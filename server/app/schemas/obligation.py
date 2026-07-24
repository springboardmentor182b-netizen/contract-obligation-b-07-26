from datetime import date
from typing import Literal

from pydantic import BaseModel, Field

Priority = Literal["High", "Medium", "Low"]
ObligationStatus = Literal["Pending", "Overdue", "Completed"]


class ObligationBase(BaseModel):
    obligation: str = Field(min_length=2, max_length=150)
    contract: str = Field(min_length=2, max_length=120)
    priority: Priority
    status: ObligationStatus
    due_date: date
    owner: str = Field(min_length=2, max_length=100)
    progress: int = Field(ge=0, le=100)


class ObligationCreate(ObligationBase):
    pass


class ObligationUpdate(ObligationBase):
    pass


class ObligationResponse(ObligationBase):
    id: str
