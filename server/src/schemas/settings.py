from pydantic import BaseModel, EmailStr
from typing import Optional

class SettingsProfileBase(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: EmailStr
    phone: Optional[str] = None
    job_title: Optional[str] = None
    department: Optional[str] = None
    timezone: Optional[str] = None
    profile_image: Optional[str] = None

class SettingsProfileCreate(SettingsProfileBase):
    pass

class SettingsProfileUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    job_title: Optional[str] = None
    department: Optional[str] = None
    timezone: Optional[str] = None
    profile_image: Optional[str] = None

class SettingsProfileResponse(SettingsProfileBase):
    id: int

    class Config:
        from_attributes = True
