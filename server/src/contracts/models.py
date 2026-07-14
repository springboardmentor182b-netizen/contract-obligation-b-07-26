from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from src.entities.contract import ContractStatus, ContractCategory


class ContractBase(BaseModel):
    title: str
    description: Optional[str] = None
    category: ContractCategory
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    value: Optional[str] = None
    owner_id: Optional[int] = None


class ContractCreate(ContractBase):
    contract_number: str
    creator_id: int


class ContractUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[ContractCategory] = None
    status: Optional[ContractStatus] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    value: Optional[str] = None
    owner_id: Optional[int] = None


class ContractResponse(ContractBase):
    id: int
    contract_number: str
    status: ContractStatus
    creator_id: int
    is_archived: bool
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class ContractVersionCreate(BaseModel):
    version_number: str
    file_path: str
    file_size: Optional[str] = None
    notes: Optional[str] = None


class ContractVersionResponse(BaseModel):
    id: int
    contract_id: int
    version_number: str
    file_path: str
    file_size: Optional[str]
    uploaded_by: Optional[int]
    upload_date: datetime
    is_current: bool
    notes: Optional[str]

    class Config:
        from_attributes = True
