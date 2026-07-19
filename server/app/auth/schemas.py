"""
Authentication Schemas
"""
from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime


class UserRegister(BaseModel):
    """User registration schema"""
    email: EmailStr
    username: str = Field(..., min_length=3, max_length=100)
    password: str = Field(..., min_length=8)
    first_name: str = Field(..., min_length=1, max_length=100)
    last_name: str = Field(..., min_length=1, max_length=100)
    phone: Optional[str] = None
    role: str = Field(default="viewer")


class UserLogin(BaseModel):
    """User login schema"""
    username: str
    password: str


class Token(BaseModel):
    """Token response schema"""
    access_token: str
    refresh_token: str
    token_type: str = "bearer"


class TokenRefresh(BaseModel):
    """Token refresh schema"""
    refresh_token: str


class PasswordResetRequest(BaseModel):
    """Password reset request schema"""
    email: EmailStr


class PasswordReset(BaseModel):
    """Password reset schema"""
    token: str
    new_password: str = Field(..., min_length=8)


class UserResponse(BaseModel):
    """User response schema"""
    user_id: int
    email: str
    username: str
    first_name: str
    last_name: str
    role: str
    phone: Optional[str] = None
    is_active: bool
    is_verified: bool
    last_login: Optional[datetime] = None
    created_at: datetime
    
    class Config:
        from_attributes = True
