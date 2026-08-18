from sqlalchemy.orm import Session
from sqlalchemy import text
from src.models.settings import (
    SettingsProfile,
    SettingsSecurity,
    SettingsNotifications,
    SettingsAppearance,
    SettingsOrganization,
)
from src.database import find_user_by_id
from src.schemas.settings import (
    SettingsProfileUpdate,
    SettingsSecurityUpdate,
    SettingsNotificationsUpdate,
    SettingsAppearanceUpdate,
    SettingsOrganizationUpdate,
)
import hashlib


# ============================================================
# PROFILE
# ============================================================

def get_profile(
    db: Session,
    profile_id: str,
    current_user: dict | None = None,
):
    """
    Get the settings profile for the authenticated user.

    The profile_id is the UUID from the users table.
    If the settings profile doesn't exist, create it from the
    actual User record from the PostgreSQL users table.
    """

    # First check by user_id (new schema)
    profile = (
        db.query(SettingsProfile)
        .filter(SettingsProfile.user_id == profile_id)
        .first()
    )

    if profile:
        return profile

    # Also check by id (old schema - for backward compatibility)
    profile = (
        db.query(SettingsProfile)
        .filter(SettingsProfile.id == profile_id)
        .first()
    )

    if profile:
        return profile

    # Get the actual user from the PostgreSQL users table
    user = find_user_by_id(profile_id)

    if not user:
        return None

    # Split full_name into first_name and last_name
    full_name = user.get("name", "")
    name_parts = full_name.strip().split(" ", 1)
    first_name = name_parts[0] if name_parts else ""
    last_name = name_parts[1] if len(name_parts) > 1 else ""

    # Create settings profile using actual user information
    # Use user_id as the id since deployed schema uses VARCHAR for both
    profile = SettingsProfile(
        id=profile_id,  # Use the UUID as the id
        user_id=profile_id,  # Also store in user_id for clarity
        first_name=first_name,
        last_name=last_name,
        email=user.get("email", ""),
        phone=user.get("phone", ""),
        job_title="",
        department=user.get("department", ""),
        timezone="UTC",
        profile_image="",
    )

    db.add(profile)
    db.commit()
    db.refresh(profile)

    return profile


def update_profile(
    db: Session,
    profile_data: SettingsProfileUpdate,
    profile_id: str,
    current_user: dict | None = None,
):
    """
    Update the authenticated user's settings profile.
    """

    profile = get_profile(
        db,
        profile_id=profile_id,
        current_user=current_user,
    )

    if not profile:
        return None

    update_data = profile_data.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(profile, key, value)

    db.commit()
    db.refresh(profile)

    return profile


# ============================================================
# SECURITY
# ============================================================

def get_security(db: Session, user_id: int):
    security = (
        db.query(SettingsSecurity)
        .filter(SettingsSecurity.user_id == user_id)
        .first()
    )

    if not security:
        security = SettingsSecurity(
            user_id=user_id,
            two_fa_enabled=False,
        )

        db.add(security)
        db.commit()
        db.refresh(security)

    return security


def update_security(
    db: Session,
    security_data: SettingsSecurityUpdate,
    user_id: int,
):
    security = get_security(db, user_id)

    update_data = security_data.model_dump(exclude_unset=True)

    # Handle password change
    if "new_password" in update_data and update_data["new_password"]:

        security.password_hash = hashlib.sha256(
            update_data["new_password"].encode()
        ).hexdigest()

        update_data.pop("new_password", None)
        update_data.pop("current_password", None)

    for key, value in update_data.items():
        setattr(security, key, value)

    db.commit()
    db.refresh(security)

    return security


# ============================================================
# NOTIFICATIONS
# ============================================================

def get_notifications(db: Session, user_id: int):
    notifications = (
        db.query(SettingsNotifications)
        .filter(SettingsNotifications.user_id == user_id)
        .first()
    )

    if not notifications:
        notifications = SettingsNotifications(
            user_id=user_id,
            email_notifications=True,
            sms_notifications=False,
            inapp_notifications=True,
            renewals=True,
            obligations=True,
            compliance=True,
            approvals=True,
            digest=False,
        )

        db.add(notifications)
        db.commit()
        db.refresh(notifications)

    return notifications


def update_notifications(
    db: Session,
    notifications_data: SettingsNotificationsUpdate,
    user_id: int,
):
    notifications = get_notifications(db, user_id)

    update_data = notifications_data.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(notifications, key, value)

    db.commit()
    db.refresh(notifications)

    return notifications


# ============================================================
# APPEARANCE
# ============================================================

def get_appearance(db: Session, user_id: int):
    appearance = (
        db.query(SettingsAppearance)
        .filter(SettingsAppearance.user_id == user_id)
        .first()
    )

    if not appearance:
        appearance = SettingsAppearance(
            user_id=user_id,
            theme="light",
            accent_color="#3b82f6",
            compact_mode=False,
            language="en",
            date_format="MMM D, YYYY",
        )

        db.add(appearance)
        db.commit()
        db.refresh(appearance)

    return appearance


def update_appearance(
    db: Session,
    appearance_data: SettingsAppearanceUpdate,
    user_id: int,
):
    appearance = get_appearance(db, user_id)

    update_data = appearance_data.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(appearance, key, value)

    db.commit()
    db.refresh(appearance)

    return appearance


# ============================================================
# ORGANIZATION
# ============================================================

def get_organization(db: Session, user_id: int):
    organization = (
        db.query(SettingsOrganization)
        .filter(SettingsOrganization.user_id == user_id)
        .first()
    )

    if not organization:
        organization = SettingsOrganization(
            user_id=user_id,
            company_name="ContractIQ Inc.",
            domain="contractiq.com",
            billing_plan="Enterprise — 25 seats",
            data_region="US East (N. Virginia)",
            organization_timezone="America/New_York (UTC-5)",
            support_contact="support@contractiq.com",
        )

        db.add(organization)
        db.commit()
        db.refresh(organization)

    return organization


def update_organization(
    db: Session,
    organization_data: SettingsOrganizationUpdate,
    user_id: int,
):
    organization = get_organization(db, user_id)

    update_data = organization_data.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(organization, key, value)

    db.commit()
    db.refresh(organization)

    return organization
