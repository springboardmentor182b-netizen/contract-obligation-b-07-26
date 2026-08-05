from sqlalchemy import Column, Integer, String, Boolean, Text, JSON
from src.database.session import Base

class SettingsProfile(Base):
    __tablename__ = "settings_profiles"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, nullable=True)
    last_name = Column(String, nullable=True)
    email = Column(String, unique=True, index=True, nullable=False)
    phone = Column(String, nullable=True)
    job_title = Column(String, nullable=True)
    department = Column(String, nullable=True)
    timezone = Column(String, nullable=True)
    profile_image = Column(Text, nullable=True)

class SettingsSecurity(Base):
    __tablename__ = "settings_security"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=True)
    two_fa_enabled = Column(Boolean, default=False, nullable=False)
    two_fa_secret = Column(String, nullable=True)

class SettingsNotifications(Base):
    __tablename__ = "settings_notifications"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, unique=True, index=True, nullable=False)
    email_notifications = Column(Boolean, default=True, nullable=False)
    sms_notifications = Column(Boolean, default=False, nullable=False)
    inapp_notifications = Column(Boolean, default=True, nullable=False)
    renewals = Column(Boolean, default=True, nullable=False)
    obligations = Column(Boolean, default=True, nullable=False)
    compliance = Column(Boolean, default=True, nullable=False)
    approvals = Column(Boolean, default=True, nullable=False)
    digest = Column(Boolean, default=False, nullable=False)

class SettingsAppearance(Base):
    __tablename__ = "settings_appearance"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, unique=True, index=True, nullable=False)
    theme = Column(String, default="light", nullable=False)
    accent_color = Column(String, default="#3b82f6", nullable=False)
    compact_mode = Column(Boolean, default=False, nullable=False)
    language = Column(String, default="en", nullable=False)
    date_format = Column(String, default="MMM D, YYYY", nullable=False)

class SettingsOrganization(Base):
    __tablename__ = "settings_organization"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, unique=True, index=True, nullable=False)
    company_name = Column(String, nullable=True)
    domain = Column(String, nullable=True)
    billing_plan = Column(String, nullable=True)
    data_region = Column(String, nullable=True)
    organization_timezone = Column(String, nullable=True)
    support_contact = Column(String, nullable=True)
