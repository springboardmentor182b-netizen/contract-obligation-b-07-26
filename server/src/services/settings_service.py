from sqlalchemy.orm import Session
from src.models.settings import SettingsProfile
from src.schemas.settings import SettingsProfileUpdate

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
