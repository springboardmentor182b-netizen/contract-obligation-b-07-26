import uuid
from datetime import datetime, timezone
from sqlalchemy import (
    Boolean, Column, DateTime, Enum, String, Text
)
from app.db.database import Base
import enum


class UserRole(str, enum.Enum):
    """Six roles defined in ContractIQ requirements."""
    ADMINISTRATOR = "administrator"
    LEGAL_MANAGER = "legal_manager"
    COMPLIANCE_OFFICER = "compliance_officer"
    CONTRACT_MANAGER = "contract_manager"
    DEPARTMENT_HEAD = "department_head"
    EMPLOYEE = "employee"


class User(Base):
    __tablename__ = "users"

    # Primary key — stored as String UUID (works with SQLite + PostgreSQL)
    id = Column(
        String(36),
        primary_key=True,
        default=lambda: str(uuid.uuid4()),
        index=True,
    )

    # Identity
    email = Column(String(255), unique=True, nullable=False, index=True)
    full_name = Column(String(200), nullable=False)
    department = Column(String(200), nullable=True)

    # Auth
    hashed_password = Column(String(255), nullable=False)
    role = Column(
        Enum(UserRole, name="userrole", native_enum=False),
        nullable=False,
        default=UserRole.EMPLOYEE,
    )

    # Status flags
    is_active = Column(Boolean, default=True, nullable=False)
    is_verified = Column(Boolean, default=False, nullable=False)

    # Password reset
    reset_token = Column(String(255), nullable=True)
    reset_token_expires = Column(DateTime(timezone=True), nullable=True)

    # Refresh token (stored hashed for security)
    refresh_token_hash = Column(Text, nullable=True)

    # Audit timestamps
    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )
    updated_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
        nullable=False,
    )
    last_login = Column(DateTime(timezone=True), nullable=True)

    def __repr__(self) -> str:
        return f"<User id={self.id} email={self.email} role={self.role}>"
