from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ContractBase(BaseModel):
    contract_id: str
    category: str
    name: str
    party: str
    department: str
    status: str
    value: Optional[float] = None
    expiry: Optional[datetime] = None
    version: Optional[str] = "v1.0"


class ContractCreate(ContractBase):
    pass


class ContractUpdate(BaseModel):
    category: Optional[str] = None
    name: Optional[str] = None
    party: Optional[str] = None
    department: Optional[str] = None
    status: Optional[str] = None
    value: Optional[float] = None
    expiry: Optional[datetime] = None
    version: Optional[str] = None


class ContractResponse(ContractBase):
    id: int
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True