"""
SQLAlchemy models for the Settings module.

Deliberately does NOT define its own User model or profile fields — profile
editing (name/email/department) reuses app.users.models.User and
app.users.services directly, since that's already the canonical source of
truth for user data. This module only owns things that don't belong
anywhere else: notification preferences and org-wide settings.

ASSUMPTION: app/database.py exposes `Base` (same as reports/users modules).
"""
import uuid
from datetime import datetime

from sqlalchemy import Column, String, DateTime, Boolean, ForeignKey
from sqlalchemy.dialects.postgresql import UUID

from app.database import Base


class NotificationPreference(Base):
    """One row per user. Created lazily on first read (see services.py)."""

    __tablename__ = "notification_preferences"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False, unique=True)

    email_enabled = Column(Boolean, nullable=False, default=True)
    sms_enabled = Column(Boolean, nullable=False, default=False)
    in_app_enabled = Column(Boolean, nullable=False, default=True)

    renewal_reminders = Column(Boolean, nullable=False, default=True)
    obligation_alerts = Column(Boolean, nullable=False, default=True)
    compliance_alerts = Column(Boolean, nullable=False, default=True)
    approval_alerts = Column(Boolean, nullable=False, default=True)

    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)


class OrganizationSettings(Base):
    """
    Singleton table — there should only ever be one row. get_or_create in
    services.py enforces this by always fetching/creating id=SINGLETON_ID.
    """

    __tablename__ = "organization_settings"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False, default="My Organization")
    timezone = Column(String, nullable=False, default="UTC")
    default_currency = Column(String, nullable=False, default="USD")

    updated_by = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)
