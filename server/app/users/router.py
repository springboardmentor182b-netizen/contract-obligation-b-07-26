"""
Router for the Users module.

Every endpoint here is restricted to Administrators — user management is
sensitive, so it's gated beyond the normal get_current_user auth check.

ASSUMPTIONS (same as reports/router.py):
  - app/database.py exposes `get_db`
  - app/security.py exposes `get_current_user`
"""
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.security import get_current_user
from app.users import schemas, services
from app.users.models import UserRole

router = APIRouter(prefix="/users", tags=["users"])


def require_admin(current_user=Depends(get_current_user)):
    if current_user.role != UserRole.administrator:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Administrator access required")
    return current_user


@router.get("", response_model=schemas.UserListResponse)
def read_users(
    page: int = Query(default=1, ge=1),
    pageSize: int = Query(default=10, ge=1, le=100),
    search: str = Query(default=""),
    role: str = Query(default=""),
    status: str = Query(default=""),
    db: Session = Depends(get_db),
    _admin=Depends(require_admin),
):
    return services.list_users(
        db, page=page, page_size=pageSize, search=search or None, role=role or None, status=status or None
    )


@router.get("/{user_id}", response_model=schemas.UserResponse)
def read_user(user_id: UUID, db: Session = Depends(get_db), _admin=Depends(require_admin)):
    try:
        return services.get_user(db, user_id)
    except services.UserNotFoundError:
        raise HTTPException(status_code=404, detail="User not found")


@router.post("", response_model=schemas.UserResponse, status_code=201)
def create_user(payload: schemas.UserCreate, db: Session = Depends(get_db), _admin=Depends(require_admin)):
    try:
        return services.create_user(db, payload)
    except services.DuplicateEmailError as e:
        raise HTTPException(status_code=409, detail=str(e))


@router.patch("/{user_id}", response_model=schemas.UserResponse)
def update_user(
    user_id: UUID, payload: schemas.UserUpdate, db: Session = Depends(get_db), _admin=Depends(require_admin)
):
    try:
        return services.update_user(db, user_id, payload)
    except services.UserNotFoundError:
        raise HTTPException(status_code=404, detail="User not found")
    except services.DuplicateEmailError as e:
        raise HTTPException(status_code=409, detail=str(e))


@router.patch("/{user_id}/role", response_model=schemas.UserResponse)
def update_role(
    user_id: UUID, payload: schemas.RoleUpdateRequest, db: Session = Depends(get_db), _admin=Depends(require_admin)
):
    try:
        return services.update_role(db, user_id, payload.role)
    except services.UserNotFoundError:
        raise HTTPException(status_code=404, detail="User not found")


@router.patch("/{user_id}/status", response_model=schemas.UserResponse)
def update_status(
    user_id: UUID, payload: schemas.StatusUpdateRequest, db: Session = Depends(get_db), _admin=Depends(require_admin)
):
    try:
        return services.update_status(db, user_id, payload.status)
    except services.UserNotFoundError:
        raise HTTPException(status_code=404, detail="User not found")


@router.delete("/{user_id}", status_code=204)
def delete_user(user_id: UUID, db: Session = Depends(get_db), _admin=Depends(require_admin)):
    try:
        services.delete_user(db, user_id)
    except services.UserNotFoundError:
        raise HTTPException(status_code=404, detail="User not found")
