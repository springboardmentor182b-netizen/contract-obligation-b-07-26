from sqlalchemy.orm import Session
from src.models.settings import (
    SettingsProfile, SettingsSecurity, SettingsNotifications,
    SettingsAppearance, SettingsOrganization
)
from src.schemas.settings import (
    SettingsProfileUpdate, SettingsSecurityUpdate,
    SettingsNotificationsUpdate, SettingsAppearanceUpdate,
    SettingsOrganizationUpdate
)
import hashlib

# Profile CRUD Operations
def get_profile(db: Session, profile_id: int = 1):
    profile = db.query(SettingsProfile).filter(SettingsProfile.id == profile_id).first()
    if not profile:
        # Create a default profile if it doesn't exist
        profile = SettingsProfile(
            id=profile_id,
            first_name="",
            last_name="",
            email="default@example.com",
            phone="",
            job_title="",
            department="",
            timezone="UTC",
            profile_image=""
        )
        db.add(profile)
        db.commit()
        db.refresh(profile)
    return profile

def update_profile(db: Session, profile_data: SettingsProfileUpdate, profile_id: int = 1):
    profile = get_profile(db, profile_id)
    
    update_data = profile_data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(profile, key, value)
    
    db.commit()
    db.refresh(profile)
    return profile

# Security CRUD Operations
def get_security(db: Session, user_id: int = 1):
    security = db.query(SettingsSecurity).filter(SettingsSecurity.user_id == user_id).first()
    if not security:
        # Create default security settings
        security = SettingsSecurity(
            user_id=user_id,
            two_fa_enabled=False
        )
        db.add(security)
        db.commit()
        db.refresh(security)
    return security

def update_security(db: Session, security_data: SettingsSecurityUpdate, user_id: int = 1):
    security = get_security(db, user_id)
    
    update_data = security_data.model_dump(exclude_unset=True)
    
    # Handle password change
    if "new_password" in update_data and update_data["new_password"]:
        # In production, use proper password hashing (bcrypt, argon2, etc.)
        security.password_hash = hashlib.sha256(update_data["new_password"].encode()).hexdigest()
        del update_data["new_password"]
        del update_data["current_password"]
    
    for key, value in update_data.items():
        setattr(security, key, value)
    
    db.commit()
    db.refresh(security)
    return security

# Notifications CRUD Operations
def get_notifications(db: Session, user_id: int = 1):
    notifications = db.query(SettingsNotifications).filter(SettingsNotifications.user_id == user_id).first()
    if not notifications:
        # Create default notification settings
        notifications = SettingsNotifications(
            user_id=user_id,
            email_notifications=True,
            sms_notifications=False,
            inapp_notifications=True,
            renewals=True,
            obligations=True,
            compliance=True,
            approvals=True,
            digest=False
        )
        db.add(notifications)
        db.commit()
        db.refresh(notifications)
    return notifications

def update_notifications(db: Session, notifications_data: SettingsNotificationsUpdate, user_id: int = 1):
    notifications = get_notifications(db, user_id)
    
    update_data = notifications_data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(notifications, key, value)
    
    db.commit()
    db.refresh(notifications)
    return notifications

# Appearance CRUD Operations
def get_appearance(db: Session, user_id: int = 1):
    appearance = db.query(SettingsAppearance).filter(SettingsAppearance.user_id == user_id).first()
    if not appearance:
        # Create default appearance settings
        appearance = SettingsAppearance(
            user_id=user_id,
            theme="light",
            accent_color="#3b82f6",
            compact_mode=False,
            language="en",
            date_format="MMM D, YYYY"
        )
        db.add(appearance)
        db.commit()
        db.refresh(appearance)
    return appearance

def update_appearance(db: Session, appearance_data: SettingsAppearanceUpdate, user_id: int = 1):
    appearance = get_appearance(db, user_id)
    
    update_data = appearance_data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(appearance, key, value)
    
    db.commit()
    db.refresh(appearance)
    return appearance

# Organization CRUD Operations
def get_organization(db: Session, user_id: int = 1):
    organization = db.query(SettingsOrganization).filter(SettingsOrganization.user_id == user_id).first()
    if not organization:
        # Create default organization settings
        organization = SettingsOrganization(
            user_id=user_id,
            company_name="ContractIQ Inc.",
            domain="contractiq.com",
            billing_plan="Enterprise — 25 seats",
            data_region="US East (N. Virginia)",
            organization_timezone="America/New_York (UTC-5)",
            support_contact="support@contractiq.com"
        )
        db.add(organization)
        db.commit()
        db.refresh(organization)
    return organization

def update_organization(db: Session, organization_data: SettingsOrganizationUpdate, user_id: int = 1):
    organization = get_organization(db, user_id)
    
    update_data = organization_data.model_dump(exclude_unset=True)
    for key, value in update_data.items():
        setattr(organization, key, value)
    
    db.commit()
    db.refresh(organization)
    return organization
