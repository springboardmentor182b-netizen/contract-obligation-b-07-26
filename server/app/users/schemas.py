"""
User Schemas
"""
from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


class UserUpdate(BaseModel):
    """User update schema"""
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[EmailStr] = None


class UserList(BaseModel):
    """User list response"""
    user_id: int
    email: str
    username: str
    first_name: str
    last_name: str
    role: str
    is_active: bool
    
    class Config:
        from_attributes = True
