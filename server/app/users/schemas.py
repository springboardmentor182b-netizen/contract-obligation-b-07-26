from pydantic import BaseModel
from typing import Optional, List


class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    role: str
    department: str
    status: str
    last_login: str
    avatar: Optional[str] = None


class UserListResponse(BaseModel):
    users: List[UserResponse]
    total: int
    page: int
    per_page: int
    total_pages: int


class UserStats(BaseModel):
    total_users: int
    active_users: int
    new_registrations: int
    blocked_users: int
    active_percentage: float
    blocked_percentage: float
    new_vs_last_month: int


class RoleDistributionItem(BaseModel):
    name: str
    value: int
    color: str


class RegistrationTrendItem(BaseModel):
    month: str
    users: int
