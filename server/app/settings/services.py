"""
Business logic for the Settings module.

ASSUMPTION: app/security.py exposes `hash_password(plain) -> str` and
`verify_password(plain, hashed) -> bool` — same file already assumed to
hold `get_current_user` (reports/router.py) and `hash_password`
(users/services.py).
"""
import uuid
from uuid import UUID

from sqlalchemy.orm import Session

from app.security import hash_password, verify_password
from app.users.models import User
from app.settings.models import NotificationPreference, OrganizationSettings
from app.settings import schemas

# Fixed id for the single organization-settings row.
ORG_SETTINGS_SINGLETON_ID = UUID("00000000-0000-0000-0000-000000000001")


class IncorrectPasswordError(Exception):
    pass


# ---- Password ----

def change_password(db: Session, user: User, current_password: str, new_password: str) -> None:
    if not verify_password(current_password, user.hashed_password):
        raise IncorrectPasswordError("Current password is incorrect")

    user.hashed_password = hash_password(new_password)
    db.commit()


# ---- Notification preferences ----

def get_or_create_preferences(db: Session, user_id: UUID) -> NotificationPreference:
    prefs = db.query(NotificationPreference).filter(NotificationPreference.user_id == user_id).first()
    if not prefs:
        prefs = NotificationPreference(id=uuid.uuid4(), user_id=user_id)
        db.add(prefs)
        db.commit()
        db.refresh(prefs)
    return prefs


_PREF_FIELD_MAP = {
    "emailEnabled": "email_enabled",
    "smsEnabled": "sms_enabled",
    "inAppEnabled": "in_app_enabled",
    "renewalReminders": "renewal_reminders",
    "obligationAlerts": "obligation_alerts",
    "complianceAlerts": "compliance_alerts",
    "approvalAlerts": "approval_alerts",
}


def update_preferences(db: Session, user_id: UUID, payload: schemas.NotificationPreferencesUpdate) -> NotificationPreference:
    prefs = get_or_create_preferences(db, user_id)

    for camel_field, snake_field in _PREF_FIELD_MAP.items():
        value = getattr(payload, camel_field)
        if value is not None:
            setattr(prefs, snake_field, value)

    db.commit()
    db.refresh(prefs)
    return prefs


# ---- Organization settings ----

def get_or_create_org_settings(db: Session) -> OrganizationSettings:
    org = db.query(OrganizationSettings).filter(OrganizationSettings.id == ORG_SETTINGS_SINGLETON_ID).first()
    if not org:
        org = OrganizationSettings(id=ORG_SETTINGS_SINGLETON_ID)
        db.add(org)
        db.commit()
        db.refresh(org)
    return org


def update_org_settings(db: Session, user_id: UUID, payload: schemas.OrganizationSettingsUpdate) -> OrganizationSettings:
    org = get_or_create_org_settings(db)

    if payload.name is not None:
        org.name = payload.name
    if payload.timezone is not None:
        org.timezone = payload.timezone
    if payload.defaultCurrency is not None:
        org.default_currency = payload.defaultCurrency

    org.updated_by = user_id
    db.commit()
    db.refresh(org)
    return org
