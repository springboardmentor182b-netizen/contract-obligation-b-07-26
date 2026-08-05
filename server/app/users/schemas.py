"""
Pydantic schemas for the Users module — kept in sync with
client/src/services/usersApi.js.
"""
from datetime import datetime
from typing import List, Optional
from uuid import UUID

from pydantic import BaseModel, EmailStr, ConfigDict, Field


class UserResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    name: str
    email: EmailStr
    department: Optional[str] = None
    role: str
    status: str
    createdAt: datetime = Field(validation_alias="created_at")
    lastLoginAt: Optional[datetime] = Field(default=None, validation_alias="last_login_at")


class UserListResponse(BaseModel):
    items: List[UserResponse]
    total: int


class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str = Field(min_length=8)
    role: str
    department: Optional[str] = None


class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    department: Optional[str] = None
    role: Optional[str] = None


class RoleUpdateRequest(BaseModel):
    role: str


class StatusUpdateRequest(BaseModel):
    status: str  # 'active' | 'inactive'
