from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.modules.auth.models import User, UserRole
from app.modules.users.schemas import UserUpdate

class UserService:
    @staticmethod
    def get_all_users(db: Session):
        """Get all users"""
        users = db.query(User).all()
        return [user.to_dict() for user in users]

    @staticmethod
    def get_user_by_id(db: Session, user_id: int):
        """Get user by ID"""
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        return user.to_dict()

    @staticmethod
    def update_user(db: Session, user_id: int, user_data: UserUpdate):
        """Update user information"""
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        
        # Update fields
        if user_data.first_name:
            user.first_name = user_data.first_name
        if user_data.last_name:
            user.last_name = user_data.last_name
        if user_data.email:
            user.email = user_data.email
        if user_data.role:
            try:
                user.role = UserRole(user_data.role)
            except ValueError:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Invalid role: {user_data.role}"
                )
        
        db.commit()
        db.refresh(user)
        return user.to_dict()

    @staticmethod
    def delete_user(db: Session, user_id: int):
        """Delete user"""
        user = db.query(User).filter(User.id == user_id).first()
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="User not found"
            )
        
        db.delete(user)
        db.commit()
        return {"message": "User deleted successfully"}
