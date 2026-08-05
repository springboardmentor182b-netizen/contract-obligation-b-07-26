from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from src.entities.user import User
from src.auth.models import UserUpdate, UserRoleUpdate

class UserService:
    def __init__(self, db: Session):
        self.db = db
    
    def get_all_users(self):
        """Get all users"""
        return self.db.query(User).all()
    
    def update_user_profile(self, current_user: User, user_update: UserUpdate):
        """Update user profile"""
        if user_update.first_name:
            current_user.first_name = user_update.first_name
        if user_update.last_name:
            current_user.last_name = user_update.last_name
        if user_update.email:
            # Check if email is already taken
            existing_user = self.db.query(User).filter(
                User.email == user_update.email,
                User.id != current_user.id
            ).first()
            if existing_user:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Email already in use"
                )
            current_user.email = user_update.email
        
        self.db.commit()
        self.db.refresh(current_user)
        return current_user
    
    def update_user_role(self, user_id: int, role_update: UserRoleUpdate):
        """Update user role (Admin only)"""
        user = self.db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        
        user.role = role_update.role
        self.db.commit()
        self.db.refresh(user)
        return user
    
    def delete_user(self, user_id: int, current_user_id: int):
        """Delete user (Admin only)"""
        user = self.db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        
        if user.id == current_user_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Cannot delete your own account"
            )
        
        self.db.delete(user)
        self.db.commit()
        return {"message": "User deleted successfully"}
