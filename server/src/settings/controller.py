from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from src.database.core import get_db

from .schema import (
    SettingCreate,
    SettingUpdate,
    SettingResponse,
)
from .service import SettingService

router = APIRouter(
    prefix="/settings",
    tags=["Settings"],
)


# Get All Settings
@router.get(
    "",
    response_model=List[SettingResponse],
)
def get_all_settings(
    db: Session = Depends(get_db),
):
    return SettingService.get_all_settings(db)


# Get Setting By ID
@router.get(
    "/{setting_id}",
    response_model=SettingResponse,
)
def get_setting_by_id(
    setting_id: str,
    db: Session = Depends(get_db),
):
    setting = SettingService.get_setting_by_id(
        db,
        setting_id,
    )

    if not setting:
        raise HTTPException(
            status_code=404,
            detail="Setting not found",
        )

    return setting


# Create Setting
@router.post(
    "",
    response_model=SettingResponse,
)
def create_setting(
    setting: SettingCreate,
    db: Session = Depends(get_db),
):
    return SettingService.create_setting(
        db,
        setting,
    )


# Update Setting
@router.put(
    "/{setting_id}",
    response_model=SettingResponse,
)
def update_setting(
    setting_id: str,
    setting: SettingUpdate,
    db: Session = Depends(get_db),
):
    updated_setting = SettingService.update_setting(
        db,
        setting_id,
        setting,
    )

    if not updated_setting:
        raise HTTPException(
            status_code=404,
            detail="Setting not found",
        )

    return updated_setting


# Delete Setting
@router.delete(
    "/{setting_id}",
)
def delete_setting(
    setting_id: str,
    db: Session = Depends(get_db),
):
    deleted_setting = SettingService.delete_setting(
        db,
        setting_id,
    )

    if not deleted_setting:
        raise HTTPException(
            status_code=404,
            detail="Setting not found",
        )

    return deleted_setting