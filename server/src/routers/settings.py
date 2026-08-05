from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.database.session import get_db
from src.schemas.settings import SettingsProfileResponse, SettingsProfileUpdate
from src.services import settings_service

router = APIRouter()

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
