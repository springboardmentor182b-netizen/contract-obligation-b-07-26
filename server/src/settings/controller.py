from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from sqlalchemy.orm import Session

from src.database.core import get_db
from src.settings.models import ProfileSettings
from src.settings.service import (
    get_all_profiles,
    get_profile_by_id,
    create_profile,
    update_profile,
    delete_profile,
)

router = APIRouter(
    prefix="/settings/profile",
    tags=["Profile Settings"]
)


class ProfileCreate(BaseModel):
    first_name: str
    last_name: str
    email: str
    phone: str | None = None
    job_title: str | None = None
    department: str | None = None
    employee_id: str | None = None
    bio: str | None = None
    language: str | None = None
    timezone: str | None = None
    date_format: str | None = None
    currency: str | None = None


@router.get("/")
def fetch_profiles(db: Session = Depends(get_db)):
    return get_all_profiles(db)


@router.get("/{profile_id}")
def fetch_profile(
    profile_id: int,
    db: Session = Depends(get_db)
):
    profile = get_profile_by_id(db, profile_id)

    if not profile:
        raise HTTPException(
            status_code=404,
            detail="Profile not found"
        )

    return profile


@router.post("/")
def add_profile(
    data: ProfileCreate,
    db: Session = Depends(get_db)
):
    profile = ProfileSettings(**data.model_dump())
    return create_profile(db, profile)


@router.put("/{profile_id}")
def edit_profile(
    profile_id: int,
    data: ProfileCreate,
    db: Session = Depends(get_db)
):
    profile = update_profile(
        db,
        profile_id,
        data.model_dump()
    )

    if not profile:
        raise HTTPException(
            status_code=404,
            detail="Profile not found"
        )

    return profile


@router.delete("/{profile_id}")
def remove_profile(
    profile_id: int,
    db: Session = Depends(get_db)
):
    profile = delete_profile(db, profile_id)

    if not profile:
        raise HTTPException(
            status_code=404,
            detail="Profile not found"
        )

    return {
        "message": "Profile deleted successfully"
    }