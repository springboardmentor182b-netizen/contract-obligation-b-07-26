from pydantic import BaseModel, EmailStr, Field
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    first_name: str
    last_name: str
    role: str

class UserCreate(BaseModel):
    email: EmailStr
    first_name: str
    last_name: str
    password: str
    role: Optional[str] = Field(default="Employee", description="User role, defaults to Employee")

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(UserBase):
    id: int
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

class TokenData(BaseModel):
    email: Optional[str] = None
