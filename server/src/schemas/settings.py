from pydantic import BaseModel, EmailStr
from typing import Optional

# Profile Settings
class SettingsProfileBase(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: EmailStr
    phone: Optional[str] = None
    job_title: Optional[str] = None
    department: Optional[str] = None
    timezone: Optional[str] = None
    profile_image: Optional[str] = None
    role: Optional[str] = None

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
    role: Optional[str] = None

class SettingsProfileResponse(SettingsProfileBase):
    id: str

    class Config:
        from_attributes = True

# Security Settings
class SettingsSecurityBase(BaseModel):
    two_fa_enabled: Optional[bool] = False

class SettingsSecurityUpdate(BaseModel):
    current_password: Optional[str] = None
    new_password: Optional[str] = None
    two_fa_enabled: Optional[bool] = None

class SettingsSecurityResponse(BaseModel):
    id: int
    user_id: int
    two_fa_enabled: bool

    class Config:
        from_attributes = True

# Notification Settings
class SettingsNotificationsBase(BaseModel):
    email_notifications: Optional[bool] = True
    sms_notifications: Optional[bool] = False
    inapp_notifications: Optional[bool] = True
    renewals: Optional[bool] = True
    obligations: Optional[bool] = True
    compliance: Optional[bool] = True
    approvals: Optional[bool] = True
    digest: Optional[bool] = False

class SettingsNotificationsUpdate(BaseModel):
    email_notifications: Optional[bool] = None
    sms_notifications: Optional[bool] = None
    inapp_notifications: Optional[bool] = None
    renewals: Optional[bool] = None
    obligations: Optional[bool] = None
    compliance: Optional[bool] = None
    approvals: Optional[bool] = None
    digest: Optional[bool] = None

class SettingsNotificationsResponse(SettingsNotificationsBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True

# Appearance Settings
class SettingsAppearanceBase(BaseModel):
    theme: Optional[str] = "light"
    accent_color: Optional[str] = "#3b82f6"
    compact_mode: Optional[bool] = False
    language: Optional[str] = "en"
    date_format: Optional[str] = "MMM D, YYYY"

class SettingsAppearanceUpdate(BaseModel):
    theme: Optional[str] = None
    accent_color: Optional[str] = None
    compact_mode: Optional[bool] = None
    language: Optional[str] = None
    date_format: Optional[str] = None

class SettingsAppearanceResponse(SettingsAppearanceBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True

# Organization Settings
class SettingsOrganizationBase(BaseModel):
    company_name: Optional[str] = None
    domain: Optional[str] = None
    billing_plan: Optional[str] = None
    data_region: Optional[str] = None
    organization_timezone: Optional[str] = None
    support_contact: Optional[str] = None

class SettingsOrganizationUpdate(BaseModel):
    company_name: Optional[str] = None
    domain: Optional[str] = None
    billing_plan: Optional[str] = None
    data_region: Optional[str] = None
    organization_timezone: Optional[str] = None
    support_contact: Optional[str] = None

class SettingsOrganizationResponse(SettingsOrganizationBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True
