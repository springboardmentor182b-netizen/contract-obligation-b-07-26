"""
SQLAlchemy models for the Renewals module.

ASSUMPTION: app/database.py exposes `Base` (confirmed working — same as
reports/users/settings modules).
"""
import enum
import uuid
from datetime import datetime

from sqlalchemy import Column, String, DateTime, Integer, Numeric, Enum, JSON
from sqlalchemy.dialects.postgresql import UUID

from app.database import Base


class RenewalStatus(str, enum.Enum):
    upcoming = "upcoming"
    renewed = "renewed"
    expired = "expired"
    cancelled = "cancelled"


class Renewal(Base):
    __tablename__ = "renewals"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    # Human-friendly sequential id like "RNW-001", generated from this counter.
    display_seq = Column(Integer, autoincrement=True, unique=True, nullable=False)

    contract_name = Column(String, nullable=False)
    counterparty = Column(String, nullable=False)
    expiry_date = Column(DateTime, nullable=False)
    value = Column(Numeric(12, 2), nullable=False, default=0)
    notice_period_days = Column(Integer, nullable=False, default=30)
    status = Column(Enum(RenewalStatus), nullable=False, default=RenewalStatus.upcoming)

    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)

    @property
    def display_id(self) -> str:
        return f"RNW-{self.display_seq:03d}"


class RenewalReminderSettings(Base):
    """Singleton table — org-wide reminder day thresholds, e.g. [14, 60, 90]."""

    __tablename__ = "renewal_reminder_settings"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    thresholds = Column(JSON, nullable=False, default=lambda: [14, 60, 90])
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)
