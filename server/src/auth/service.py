from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
import bcrypt
import secrets
from src.entities.user import User, UserRole
from src.entities.password_reset import PasswordReset
from src.auth.models import UserCreate, UserLogin, Token
from src.config import settings

class AuthService:
    def __init__(self, db: Session):
        self.db = db
    
    def verify_password(self, plain_password: str, hashed_password: str) -> bool:
        """Verify a password against a hash"""
        return bcrypt.checkpw(plain_password.encode('utf-8'), hashed_password.encode('utf-8'))
    
    def get_password_hash(self, password: str) -> str:
        """Hash a password"""
        salt = bcrypt.gensalt()
        hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
        return hashed.decode('utf-8')
    
    def create_access_token(self, data: dict, expires_delta: Optional[timedelta] = None):
        """Create JWT access token"""
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.utcnow() + expires_delta
        else:
            expire = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
        return encoded_jwt
    
    def register_user(self, user_data: UserCreate):
        """Register a new user"""
        # Check if user already exists
        existing_user = self.db.query(User).filter(User.email == user_data.email).first()
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )
        
        # Create new user with Employee role (default)
        hashed_password = self.get_password_hash(user_data.password)
        new_user = User(
            email=user_data.email,
            hashed_password=hashed_password,
            first_name=user_data.first_name,
            last_name=user_data.last_name,
            role=UserRole.EMPLOYEE
        )
        
        self.db.add(new_user)
        self.db.commit()
        self.db.refresh(new_user)
        
        return new_user
    
    def authenticate_user(self, user_credentials: UserLogin):
        """Authenticate user and return JWT token"""
        # Find user by email
        user = self.db.query(User).filter(User.email == user_credentials.email).first()
        
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials"
            )
        
        # Verify password
        if not self.verify_password(user_credentials.password, user.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid credentials"
            )
        
        # Check if user is active
        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="User account is inactive"
            )
        
        # Create access token
        access_token = self.create_access_token(data={"sub": user.email})
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": user
        }

    def request_password_reset(self, email: str):
        """Generate password reset code and send it to user's email"""
        # Check if user exists
        user = self.db.query(User).filter(User.email == email).first()
        if not user:
            # Don't reveal if email exists for security
            raise HTTPException(
                status_code=status.HTTP_200_OK,
                detail="If the email exists, a reset code has been sent"
            )
        
        # Generate unique 6-digit reset code
        reset_code = str(secrets.randbelow(900000) + 100000)
        
        # Expire previous reset codes for this email
        self.db.query(PasswordReset).filter(
            PasswordReset.email == email,
            PasswordReset.is_used == False
        ).update({"is_used": True})
        
        # Create new reset code (valid for 15 minutes)
        # Use naive datetime to match database
        expires_at = datetime.utcnow() + timedelta(minutes=15)
        
        password_reset = PasswordReset(
            email=email,
            reset_code=reset_code,
            expires_at=expires_at
        )
        
        self.db.add(password_reset)
        self.db.commit()
        
        print(f"Generated reset code for {email}: {reset_code}, expires at: {expires_at}")
        
        # Return reset code and user info for email sending
        return {
            "email": email,
            "reset_code": reset_code,
            "user_name": f"{user.first_name} {user.last_name}"
        }
    
    def reset_password(self, email: str, reset_code: str, new_password: str):
        """Reset user password using reset code"""
        try:
            # Find valid reset code
            password_reset = self.db.query(PasswordReset).filter(
                PasswordReset.email == email,
                PasswordReset.reset_code == reset_code,
                PasswordReset.is_used == False
            ).first()
            
            if not password_reset:
                print(f"No reset code found for email: {email}, code: {reset_code}")
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Invalid or expired reset code"
                )
            
            # Check if code is expired
            now = datetime.utcnow()
            print(f"Checking expiration: now={now}, expires_at={password_reset.expires_at}, is_expired={password_reset.is_expired()}")
            
            if password_reset.is_expired():
                print(f"Reset code has expired for {email}")
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail="Reset code has expired"
                )
            
            # Find user
            user = self.db.query(User).filter(User.email == email).first()
            if not user:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail="User not found"
                )
            
            # Update password
            user.hashed_password = self.get_password_hash(new_password)
            
            # Mark reset code as used
            password_reset.is_used = True
            
            self.db.commit()
            
            return {"message": "Password reset successfully"}
            
        except HTTPException:
            raise
        except Exception as e:
            print(f"Error in reset_password: {str(e)}")
            import traceback
            traceback.print_exc()
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to reset password: {str(e)}"
            )
