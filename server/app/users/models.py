"""
SQLAlchemy models for the Users module.

IMPORTANT: this is the canonical `User` model — the auth module (login,
register, JWT) should import User from here (`from app.users.models import
User`) rather than defining its own. If auth/models.py was already given a
separate User table, that needs to be consolidated with this one before
both modules go live, or you'll end up with two different "users" tables.

ASSUMPTION: app/database.py exposes `Base` and `get_db` — same assumption
made in the reports module.
"""
import enum
import uuid
from datetime import datetime

from sqlalchemy import Column, String, DateTime, Enum, Boolean
from sqlalchemy.dialects.postgresql import UUID

from app.database import Base


class UserRole(str, enum.Enum):
    employee = "Employee"
    department_head = "Department Head"
    contract_manager = "Contract Manager"
    compliance_officer = "Compliance Officer"
    legal_manager = "Legal Manager"
    administrator = "Administrator"


class UserStatus(str, enum.Enum):
    active = "active"
    inactive = "inactive"


class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True, index=True)
    hashed_password = Column(String, nullable=False)
    department = Column(String, nullable=True)
    role = Column(Enum(UserRole), nullable=False, default=UserRole.employee)
    status = Column(Enum(UserStatus), nullable=False, default=UserStatus.active)

    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    last_login_at = Column(DateTime, nullable=True)
