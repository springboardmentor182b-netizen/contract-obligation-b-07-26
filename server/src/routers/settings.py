from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from src.database.session import get_db
from src.auth.security import get_current_user

from src.schemas.settings import (
    SettingsProfileResponse,
    SettingsProfileUpdate,
    SettingsSecurityResponse,
    SettingsSecurityUpdate,
    SettingsNotificationsResponse,
    SettingsNotificationsUpdate,
    SettingsAppearanceResponse,
    SettingsAppearanceUpdate,
    SettingsOrganizationResponse,
    SettingsOrganizationUpdate,
)

from src.services import settings_service


router = APIRouter()


# ============================================================
# PROFILE
# ============================================================

@router.get("/profile", response_model=SettingsProfileResponse)
def get_user_profile(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    user_id = current_user["id"]

    profile = settings_service.get_profile(
        db,
        profile_id=user_id,
        current_user=current_user,
    )

    if not profile:
        raise HTTPException(
            status_code=404,
            detail="Profile not found",
        )

    return profile


@router.put("/profile", response_model=SettingsProfileResponse)
def update_user_profile(
    profile_data: SettingsProfileUpdate,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    user_id = current_user["id"]

    updated_profile = settings_service.update_profile(
        db,
        profile_data,
        profile_id=user_id,
        current_user=current_user,
    )

    return updated_profile


# ============================================================
# SECURITY
# ============================================================

@router.get("/security", response_model=SettingsSecurityResponse)
def get_security_settings(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    user_id = current_user["id"]

    security = settings_service.get_security(
        db,
        user_id=user_id,
    )

    if not security:
        raise HTTPException(
            status_code=404,
            detail="Security settings not found",
        )

    return security


@router.put("/security", response_model=SettingsSecurityResponse)
def update_security_settings(
    security_data: SettingsSecurityUpdate,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    user_id = current_user["id"]

    updated_security = settings_service.update_security(
        db,
        security_data,
        user_id=user_id,
    )

    return updated_security


# ============================================================
# NOTIFICATIONS
# ============================================================

@router.get("/notifications", response_model=SettingsNotificationsResponse)
def get_notification_settings(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    user_id = current_user["id"]

    notifications = settings_service.get_notifications(
        db,
        user_id=user_id,
    )

    if not notifications:
        raise HTTPException(
            status_code=404,
            detail="Notification settings not found",
        )

    return notifications


@router.put("/notifications", response_model=SettingsNotificationsResponse)
def update_notification_settings(
    notifications_data: SettingsNotificationsUpdate,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    user_id = current_user["id"]

    updated_notifications = settings_service.update_notifications(
        db,
        notifications_data,
        user_id=user_id,
    )

    return updated_notifications


# ============================================================
# APPEARANCE
# ============================================================

@router.get("/appearance", response_model=SettingsAppearanceResponse)
def get_appearance_settings(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    user_id = current_user["id"]

    appearance = settings_service.get_appearance(
        db,
        user_id=user_id,
    )

    if not appearance:
        raise HTTPException(
            status_code=404,
            detail="Appearance settings not found",
        )

    return appearance


@router.put("/appearance", response_model=SettingsAppearanceResponse)
def update_appearance_settings(
    appearance_data: SettingsAppearanceUpdate,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    user_id = current_user["id"]

    updated_appearance = settings_service.update_appearance(
        db,
        appearance_data,
        user_id=user_id,
    )

    return updated_appearance


# ============================================================
# ORGANIZATION
# ============================================================

@router.get("/organization", response_model=SettingsOrganizationResponse)
def get_organization_settings(
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    user_id = current_user["id"]

    organization = settings_service.get_organization(
        db,
        user_id=user_id,
    )

    if not organization:
        raise HTTPException(
            status_code=404,
            detail="Organization settings not found",
        )

    return organization


@router.put("/organization", response_model=SettingsOrganizationResponse)
def update_organization_settings(
    organization_data: SettingsOrganizationUpdate,
    current_user: dict = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    user_id = current_user["id"]

    updated_organization = settings_service.update_organization(
        db,
        organization_data,
        user_id=user_id,
    )

    return updated_organization