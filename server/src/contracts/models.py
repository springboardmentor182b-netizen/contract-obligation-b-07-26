from typing import Optional
from pydantic import BaseModel, ConfigDict, Field

class ContractBase(BaseModel):
    name: str = Field(min_length=1)
    type: str = Field(min_length=1)
    party: str = Field(min_length=1)
    effective: str = Field(min_length=1)
    expiry: str = Field(min_length=1)
    status: str = Field(min_length=1)
    owner: str = Field(min_length=1)
    value: Optional[str] = None
    governing_law: Optional[str] = "State of Delaware, USA"
    jurisdiction: Optional[str] = "US Federal Court"
    auto_renewal: Optional[str] = "Yes — 60 days notice"

class ContractCreate(ContractBase):
    id: Optional[str] = None

class ContractUpdate(BaseModel):
    name: Optional[str] = None
    type: Optional[str] = None
    party: Optional[str] = None
    effective: Optional[str] = None
    expiry: Optional[str] = None
    status: Optional[str] = None
    owner: Optional[str] = None
    value: Optional[str] = None
    governing_law: Optional[str] = None
    jurisdiction: Optional[str] = None
    auto_renewal: Optional[str] = None

class ContractResponse(ContractBase):
    id: str
    model_config = ConfigDict(from_attributes=True)

class ContractSummary(BaseModel):
    total: int
    active: int
    expiring_soon: int
    showing: int
