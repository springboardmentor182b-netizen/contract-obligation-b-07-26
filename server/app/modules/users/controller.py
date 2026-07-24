from fastapi import APIRouter, Depends, status
from sqlalchemy.orm import Session
from typing import List
from app.config.database import get_db
from app.modules.users.schemas import UserResponse, UserUpdate
from app.modules.users.service import UserService
from app.middleware.auth_middleware import get_current_user, require_role
from app.modules.auth.models import User

router = APIRouter()

@router.get("/", response_model=List[UserResponse])
def get_all_users(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all users (Admin only)"""
    require_role(current_user, ["Administrator", "Legal Manager"])
    users = UserService.get_all_users(db, skip, limit)
    return users

@router.get("/{user_id}", response_model=UserResponse)
def get_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get user by ID"""
    user = UserService.get_user_by_id(db, user_id)
    return user

@router.put("/{user_id}", response_model=UserResponse)
def update_user(
    user_id: int,
    user_data: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update user information"""
    # Users can update their own info, admins can update anyone
    if current_user.id != user_id:
        require_role(current_user, ["Administrator"])
    
    user = UserService.update_user(db, user_id, user_data)
    return user

@router.delete("/{user_id}", status_code=status.HTTP_200_OK)
def delete_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete user (Admin only)"""
    require_role(current_user, ["Administrator"])
    return UserService.delete_user(db, user_id)
