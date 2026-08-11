from pydantic import BaseModel
from typing import Optional
from datetime import date


class ContractBase(BaseModel):
    title: str
    contract_number: Optional[str] = None
    category: str
    counterparty: Optional[str] = None
    department: Optional[str] = None
    status: str
    value: Optional[float] = None
    effective_date: Optional[date] = None
    expiry_date: Optional[date] = None
    version: Optional[str] = "v1.0"


class ContractCreate(ContractBase):
    pass


class ContractUpdate(BaseModel):
    title: Optional[str] = None
    contract_number: Optional[str] = None
    category: Optional[str] = None
    counterparty: Optional[str] = None
    department: Optional[str] = None
    status: Optional[str] = None
    value: Optional[float] = None
    effective_date: Optional[date] = None
    expiry_date: Optional[date] = None
    version: Optional[str] = None


class ContractResponse(ContractBase):
    id: str
    created_at: Optional[date] = None

    class Config:
        from_attributes = True
