from pydantic import BaseModel, EmailStr
from typing import Optional, Any
from datetime import date, datetime
from enum import Enum

# Re-export from other schema files
from .auth import Token, TokenData
from .role import RoleBase, RoleCreate, RoleUpdate, RoleResponse
from .settings import (
    SettingsProfileBase, SettingsProfileCreate, SettingsProfileUpdate, SettingsProfileResponse,
    SettingsSecurityBase, SettingsSecurityUpdate, SettingsSecurityResponse,
    SettingsNotificationsBase, SettingsNotificationsUpdate, SettingsNotificationsResponse,
    SettingsAppearanceBase, SettingsAppearanceUpdate, SettingsAppearanceResponse,
    SettingsOrganizationBase, SettingsOrganizationUpdate, SettingsOrganizationResponse
)
from .user import UserBase, UserUpdate, UserResponse
from .contract import ContractBase, ContractCreate, ContractUpdate, ContractResponse

# Additional schemas needed by main.py
class Role(str, Enum):
    administrator = "administrator"
    legal_manager = "legal_manager"
    contract_manager = "contract_manager"
    compliance_officer = "compliance_officer"
    user = "user"

class UserCreate(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: Role = Role.user
    department: Optional[str] = None

class ContractStatus(str, Enum):
    active = "active"
    pending = "pending"
    expired = "expired"
    archived = "archived"

class ObligationStatus(str, Enum):
    pending = "pending"
    in_progress = "in_progress"
    completed = "completed"
    overdue = "overdue"
    waived = "waived"

class RenewalStatus(str, Enum):
    upcoming = "upcoming"
    due_soon = "due_soon"
    overdue = "overdue"
    completed = "completed"
    cancelled = "cancelled"

class ComplianceLevel(str, Enum):
    high = "high"
    medium = "medium"
    low = "low"



class APIRecord(BaseModel):
    id: str
    title: str
    counterparty: str
    status: str
    category: str
    value: float
    start_date: date
    end_date: date
    owner_id: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class ContractVersionCreate(BaseModel):
    contract_id: str
    version_number: int
    changes: str
    created_by: str

class ObligationCreate(BaseModel):
    contract_id: str
    title: str
    description: str
    due_date: date
    status: ObligationStatus = ObligationStatus.pending
    priority: str = "medium"

class ObligationUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    due_date: Optional[date] = None
    status: Optional[ObligationStatus] = None
    priority: Optional[str] = None

class RenewalCreate(BaseModel):
    contract_id: str
    renewal_date: date
    notice_period_days: int = 30
    status: RenewalStatus = RenewalStatus.upcoming
    auto_renew: bool = False

class RenewalUpdate(BaseModel):
    renewal_date: Optional[date] = None
    notice_period_days: Optional[int] = None
    status: Optional[RenewalStatus] = None
    auto_renew: Optional[bool] = None

class ReportCreate(BaseModel):
    title: str
    report_type: str
    filters: dict[str, Any] = {}
    created_by: str

class NotificationCreate(BaseModel):
    user_id: str
    title: str
    message: str
    type: str = "info"
    read: bool = False

class UserCreateWithRole(BaseModel):
    name: str
    email: EmailStr
    password: str
    role: Role
    department: Optional[str] = None

class UserLogin(BaseModel):
    email: EmailStr
    password: str
    role: Role

class UserPublic(BaseModel):
    id: str
    name: str
    email: str
    role: str
    department: Optional[str] = None
    is_active: bool = True
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True

class PasswordReset(BaseModel):
    email: EmailStr
    new_password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

class UserUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[EmailStr] = None
    role: Optional[str] = None
    department: Optional[str] = None
    password: Optional[str] = None
    is_active: Optional[bool] = None

__all__ = [
    "UserBase", "UserCreate", "UserUpdate", "UserResponse",
    "ContractBase", "ContractCreate", "ContractUpdate", "ContractResponse",
    "Token", "TokenData",
    "LoginRequest", "ForgotPasswordRequest", "ResetPasswordRequest",
    "RoleBase", "RoleCreate", "RoleUpdate", "RoleResponse",
    "SettingsProfileBase", "SettingsProfileCreate", "SettingsProfileUpdate", "SettingsProfileResponse",
    "SettingsSecurityBase", "SettingsSecurityUpdate", "SettingsSecurityResponse",
    "SettingsNotificationsBase", "SettingsNotificationsUpdate", "SettingsNotificationsResponse",
    "SettingsAppearanceBase", "SettingsAppearanceUpdate", "SettingsAppearanceResponse",
    "SettingsOrganizationBase", "SettingsOrganizationUpdate", "SettingsOrganizationResponse",
    "Role", "ContractStatus", "ObligationStatus", "RenewalStatus", "ComplianceLevel",
    "APIRecord", "ContractVersionCreate", "ObligationCreate", "ObligationUpdate",
    "RenewalCreate", "RenewalUpdate", "ReportCreate", "NotificationCreate",
    "UserCreateWithRole", "UserLogin", "UserPublic", "PasswordReset", "TokenResponse", "UserUpdate",
]