from typing import Optional
from pydantic import BaseModel, ConfigDict, Field

class ObligationBase(BaseModel):
    contract_id: str = Field(min_length=1)
    title: str = Field(min_length=1)
    assignee: str = Field(min_length=1)
    due: str = Field(min_length=1)
    priority: str = Field(min_length=1)
    status: str = Field(min_length=1)
    category: str = Field(min_length=1)

class ObligationCreate(ObligationBase):
    id: Optional[str] = None

class ObligationUpdate(BaseModel):
    title: Optional[str] = None
    assignee: Optional[str] = None
    due: Optional[str] = None
    priority: Optional[str] = None
    status: Optional[str] = None
    category: Optional[str] = None

class ObligationResponse(ObligationBase):
    id: str
    model_config = ConfigDict(from_attributes=True)
