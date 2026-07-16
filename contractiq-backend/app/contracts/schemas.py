from pydantic import BaseModel
from typing import Optional
from datetime import date

# Base schema for reading and writing data
class ContractBase(BaseModel):
    contract_id: str
    contract_name: str
    counterparty: Optional[str] = None
    status: str
    owner: Optional[str] = None
    value: Optional[float] = None
    due_date: Optional[date] = None
    priority: Optional[str] = None
    category: Optional[str] = None
    version: Optional[str] = None
    file_size: Optional[str] = None
    uploaded_date: Optional[date] = None

# Schema used when creating a new contract
class ContractCreate(ContractBase):
    pass

# Schema used when sending data back to React
class ContractResponse(ContractBase):
    id: int

    class Config:
        from_attributes = True