from sqlalchemy.orm import Session

from src.settings.models import ProfileSettings


def get_all_profiles(db: Session):
    return db.query(ProfileSettings).all()


def get_profile_by_id(db: Session, profile_id: int):
    return (
        db.query(ProfileSettings)
        .filter(ProfileSettings.id == profile_id)
        .first()
    )


def create_profile(db: Session, profile: ProfileSettings):
    db.add(profile)
    db.commit()
    db.refresh(profile)
    return profile


def update_profile(db: Session, profile_id: int, data: dict):
    profile = (
        db.query(ProfileSettings)
        .filter(ProfileSettings.id == profile_id)
        .first()
    )

    if not profile:
        return None

    for key, value in data.items():
        setattr(profile, key, value)

    db.commit()
    db.refresh(profile)

    return profile


def delete_profile(db: Session, profile_id: int):
    profile = (
        db.query(ProfileSettings)
        .filter(ProfileSettings.id == profile_id)
        .first()
    )

    if not profile:
        return None

    db.delete(profile)
    db.commit()

    return profile