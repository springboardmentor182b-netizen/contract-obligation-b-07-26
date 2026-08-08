from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.database.session import get_db
from src.schemas.settings import (
    SettingsProfileResponse, SettingsProfileUpdate,
    SettingsSecurityResponse, SettingsSecurityUpdate,
    SettingsNotificationsResponse, SettingsNotificationsUpdate,
    SettingsAppearanceResponse, SettingsAppearanceUpdate,
    SettingsOrganizationResponse, SettingsOrganizationUpdate
)
from src.services import settings_service

router = APIRouter()

# Profile Endpoints
@router.get("/profile", response_model=SettingsProfileResponse)
def get_user_profile(db: Session = Depends(get_db)):
    # Hardcoded profile_id=1 for demonstration purposes.
    # In a real app, you would extract the user ID from the authentication token.
    profile = settings_service.get_profile(db, profile_id=1)
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile

@router.put("/profile", response_model=SettingsProfileResponse)
def update_user_profile(profile_data: SettingsProfileUpdate, db: Session = Depends(get_db)):
    updated_profile = settings_service.update_profile(db, profile_data, profile_id=1)
    return updated_profile

# Security Endpoints
@router.get("/security", response_model=SettingsSecurityResponse)
def get_security_settings(db: Session = Depends(get_db)):
    security = settings_service.get_security(db, user_id=1)
    if not security:
        raise HTTPException(status_code=404, detail="Security settings not found")
    return security

@router.put("/security", response_model=SettingsSecurityResponse)
def update_security_settings(security_data: SettingsSecurityUpdate, db: Session = Depends(get_db)):
    updated_security = settings_service.update_security(db, security_data, user_id=1)
    return updated_security

# Notifications Endpoints
@router.get("/notifications", response_model=SettingsNotificationsResponse)
def get_notification_settings(db: Session = Depends(get_db)):
    notifications = settings_service.get_notifications(db, user_id=1)
    if not notifications:
        raise HTTPException(status_code=404, detail="Notification settings not found")
    return notifications

@router.put("/notifications", response_model=SettingsNotificationsResponse)
def update_notification_settings(notifications_data: SettingsNotificationsUpdate, db: Session = Depends(get_db)):
    updated_notifications = settings_service.update_notifications(db, notifications_data, user_id=1)
    return updated_notifications

# Appearance Endpoints
@router.get("/appearance", response_model=SettingsAppearanceResponse)
def get_appearance_settings(db: Session = Depends(get_db)):
    appearance = settings_service.get_appearance(db, user_id=1)
    if not appearance:
        raise HTTPException(status_code=404, detail="Appearance settings not found")
    return appearance

@router.put("/appearance", response_model=SettingsAppearanceResponse)
def update_appearance_settings(appearance_data: SettingsAppearanceUpdate, db: Session = Depends(get_db)):
    updated_appearance = settings_service.update_appearance(db, appearance_data, user_id=1)
    return updated_appearance

# Organization Endpoints
@router.get("/organization", response_model=SettingsOrganizationResponse)
def get_organization_settings(db: Session = Depends(get_db)):
    organization = settings_service.get_organization(db, user_id=1)
    if not organization:
        raise HTTPException(status_code=404, detail="Organization settings not found")
    return organization

@router.put("/organization", response_model=SettingsOrganizationResponse)
def update_organization_settings(organization_data: SettingsOrganizationUpdate, db: Session = Depends(get_db)):
    updated_organization = settings_service.update_organization(db, organization_data, user_id=1)
    return updated_organization
