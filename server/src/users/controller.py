from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from src.database.core import get_db
from src.entities.user import User, UserRole
from src.auth.models import UserResponse, UserUpdate, UserRoleUpdate
from src.users.service import UserService
from src.security import get_current_user, require_admin

router = APIRouter()

@router.get("/", response_model=List[UserResponse])
async def get_users(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all users (requires authentication)"""
    user_service = UserService(db)
    return user_service.get_all_users()

@router.get("/me", response_model=UserResponse)
async def get_current_user_profile(current_user: User = Depends(get_current_user)):
    """Get current user profile"""
    return current_user

@router.put("/me", response_model=UserResponse)
async def update_current_user(
    user_update: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update current user profile"""
    user_service = UserService(db)
    return user_service.update_user_profile(current_user, user_update)

@router.put("/{user_id}/role", response_model=UserResponse)
async def update_user_role(
    user_id: int,
    role_update: UserRoleUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    """Update user role (Admin only)"""
    user_service = UserService(db)
    return user_service.update_user_role(user_id, role_update)

@router.delete("/{user_id}")
async def delete_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_admin)
):
    """Delete user (Admin only)"""
    user_service = UserService(db)
    return user_service.delete_user(user_id, current_user.id)
