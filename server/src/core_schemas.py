from datetime import date, datetime
from enum import Enum
from typing import Any

from pydantic import BaseModel, ConfigDict, Field


class Role(str, Enum):
    administrator = "Administrator"
    legal_manager = "Legal Manager"
    compliance_officer = "Compliance Officer"
    contract_manager = "Contract Manager"
    department_head = "Department Head"
    employee = "Employee"


class ContractStatus(str, Enum):
    draft = "Draft"
    under_review = "Under Review"
    approved = "Approved"
    active = "Active"
    expired = "Expired"
    terminated = "Terminated"
    archived = "Archived"


class RenewalStatus(str, Enum):
    upcoming = "Upcoming"
    in_progress = "In Progress"
    renewed = "Renewed"
    expired = "Expired"
    cancelled = "Cancelled"


class ComplianceLevel(str, Enum):
    compliant = "Compliant"
    pending = "Pending"
    delayed = "Delayed"
    non_compliant = "Non-Compliant"
    high_risk = "High Risk"


class ObligationStatus(str, Enum):
    pending = "Pending"
    in_progress = "In Progress"
    completed = "Completed"
    overdue = "Overdue"
    waived = "Waived"


class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"


class UserCreate(BaseModel):
    name: str = Field(min_length=2)
    email: str = Field(pattern=r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
    password: str = Field(min_length=8)
    role: Role = Role.employee
    department: str | None = None


class UserLogin(BaseModel):
    email: str = Field(pattern=r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
    password: str
    role: Role


class PasswordReset(BaseModel):
    email: str = Field(pattern=r"^[^@\s]+@[^@\s]+\.[^@\s]+$")
    new_password: str = Field(min_length=8)


class UserPublic(BaseModel):
    id: str
    name: str
    email: str
    role: Role
    department: str | None = None
    is_active: bool = True
    created_at: datetime


class ContractCreate(BaseModel):
    title: str = Field(min_length=2)
    category: str
    counterparty: str
    owner_id: str | None = None
    department: str | None = None
    status: ContractStatus = ContractStatus.draft
    effective_date: date | None = None
    expiry_date: date | None = None
    value: float | None = Field(default=None, ge=0)
    document_name: str | None = None
    tags: list[str] = Field(default_factory=list)


class ContractUpdate(BaseModel):
    title: str | None = None
    category: str | None = None
    counterparty: str | None = None
    owner_id: str | None = None
    department: str | None = None
    status: ContractStatus | None = None
    effective_date: date | None = None
    expiry_date: date | None = None
    value: float | None = Field(default=None, ge=0)
    document_name: str | None = None
    tags: list[str] | None = None


class ContractVersionCreate(BaseModel):
    contract_id: str
    version: str
    summary: str
    document_name: str | None = None


class ObligationCreate(BaseModel):
    contract_id: str
    title: str
    obligation_type: str
    responsible_user_id: str | None = None
    due_date: date
    status: ObligationStatus = ObligationStatus.pending
    compliance_level: ComplianceLevel = ComplianceLevel.pending
    progress: int = Field(default=0, ge=0, le=100)
    notes: str | None = None


class ObligationUpdate(BaseModel):
    title: str | None = None
    obligation_type: str | None = None
    responsible_user_id: str | None = None
    due_date: date | None = None
    status: ObligationStatus | None = None
    compliance_level: ComplianceLevel | None = None
    progress: int | None = Field(default=None, ge=0, le=100)
    notes: str | None = None


class RenewalCreate(BaseModel):
    contract_id: str
    renewal_date: date
    reminder_days: int = Field(default=30, ge=1)
    status: RenewalStatus = RenewalStatus.upcoming
    approval_owner_id: str | None = None
    notes: str | None = None


class RenewalUpdate(BaseModel):
    renewal_date: date | None = None
    reminder_days: int | None = Field(default=None, ge=1)
    status: RenewalStatus | None = None
    approval_owner_id: str | None = None
    notes: str | None = None


class NotificationCreate(BaseModel):
    recipient_user_id: str | None = None
    channel: str = "In-App"
    title: str
    message: str
    related_type: str | None = None
    related_id: str | None = None


class ReportCreate(BaseModel):
    name: str
    report_type: str
    filters: dict[str, Any] = Field(default_factory=dict)


class AuditLog(BaseModel):
    id: str
    actor_id: str | None = None
    action: str
    entity_type: str
    entity_id: str | None = None
    metadata: dict[str, Any] = Field(default_factory=dict)
    created_at: datetime


class APIRecord(BaseModel):
    model_config = ConfigDict(extra="allow")

    id: str
    created_at: datetime
    updated_at: datetime | None = None
