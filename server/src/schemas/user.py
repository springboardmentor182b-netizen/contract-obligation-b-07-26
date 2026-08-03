from pydantic import BaseModel
from typing import Optional
from datetime import datetime

from app.schemas.role import RoleResponse


class UserBase(BaseModel):

    first_name: str

    last_name: str

    email: str

    phone: str

    department: str

    designation: str

    role_id: int


class UserCreate(UserBase):

    password: str


class UserUpdate(BaseModel):

    first_name: Optional[str] = None

    last_name: Optional[str] = None

    email: Optional[str] = None

    phone: Optional[str] = None

    department: Optional[str] = None

    designation: Optional[str] = None

    role_id: Optional[int] = None

    is_active: Optional[bool] = None


class UserResponse(BaseModel):

    id: int

    first_name: str

    last_name: str

    email: str

    phone: str

    department: str

    designation: str

    is_active: bool

    last_login: Optional[datetime]

    created_at: datetime

    role: RoleResponse

    class Config:

        from_attributes = True
