"""
Router for the Settings module.

Profile read/update deliberately delegates to app.users.services (the
canonical User CRUD logic) rather than duplicating it — this router just
narrows "update any user" down to "update yourself".

ASSUMPTIONS: same as reports/users routers — app/database.get_db and
app/security.get_current_user exist. The admin-only organization endpoints
reuse the `require_admin` dependency already defined in users/router.py
rather than redefining it here.
"""
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.security import get_current_user
from app.users import services as user_services
from app.users.schemas import UserUpdate
from app.users.router import require_admin
from app.settings import schemas, services

router = APIRouter(prefix="/settings", tags=["settings"])


# ---- Profile ----

@router.get("/profile", response_model=schemas.ProfileResponse)
def read_profile(current_user=Depends(get_current_user)):
    return current_user


@router.patch("/profile", response_model=schemas.ProfileResponse)
def update_profile(
    payload: schemas.ProfileUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    try:
        updated = user_services.update_user(
            db,
            current_user.id,
            UserUpdate(name=payload.name, email=payload.email, department=payload.department),
        )
        return updated
    except user_services.DuplicateEmailError as e:
        raise HTTPException(status_code=409, detail=str(e))


# ---- Password ----

@router.post("/password", status_code=204)
def change_password(
    payload: schemas.PasswordChangeRequest,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    try:
        services.change_password(db, current_user, payload.currentPassword, payload.newPassword)
    except services.IncorrectPasswordError:
        raise HTTPException(status_code=400, detail="Current password is incorrect")


# ---- Notification preferences ----

@router.get("/notifications", response_model=schemas.NotificationPreferencesResponse)
def read_notifications(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return services.get_or_create_preferences(db, current_user.id)


@router.patch("/notifications", response_model=schemas.NotificationPreferencesResponse)
def update_notifications(
    payload: schemas.NotificationPreferencesUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return services.update_preferences(db, current_user.id, payload)


# ---- Organization settings (Administrators only) ----

@router.get("/organization", response_model=schemas.OrganizationSettingsResponse)
def read_organization(db: Session = Depends(get_db), _admin=Depends(require_admin)):
    return services.get_or_create_org_settings(db)


@router.patch("/organization", response_model=schemas.OrganizationSettingsResponse)
def update_organization(
    payload: schemas.OrganizationSettingsUpdate,
    db: Session = Depends(get_db),
    admin=Depends(require_admin),
):
    return services.update_org_settings(db, admin.id, payload)
