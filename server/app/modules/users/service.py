from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from typing import List
from app.modules.auth.models import User, UserRole
from app.modules.users.schemas import UserUpdate

class UserService:
    @staticmethod
    def get_all_users(db: Session, skip: int = 0, limit: int = 100) -> List[User]:
        """Get all users with pagination"""
        return db.query(User).offset(skip).limit(limit).all()

    @staticmethod
    def get_user_by_id(db: Session, user_id: int) -> User:
        """Get user by ID"""
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        return user

    @staticmethod
    def update_user(db: Session, user_id: int, user_data: UserUpdate) -> User:
        """Update user information"""
        user = UserService.get_user_by_id(db, user_id)
        
        update_data = user_data.dict(exclude_unset=True)
        
        # Convert role string to enum if role is being updated
        if 'role' in update_data:
            try:
                update_data['role'] = UserRole(update_data['role'])
            except ValueError:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Invalid role: {update_data['role']}"
                )
        
        for field, value in update_data.items():
            setattr(user, field, value)
        
        db.commit()
        db.refresh(user)
        return user

    @staticmethod
    def delete_user(db: Session, user_id: int):
        """Delete user"""
        user = UserService.get_user_by_id(db, user_id)
        db.delete(user)
        db.commit()
        return {"message": "User deleted successfully"}
