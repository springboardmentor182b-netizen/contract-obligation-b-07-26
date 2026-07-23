from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UserUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[EmailStr] = None
    role: Optional[str] = None

class UserResponse(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: EmailStr
    role: str
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True
