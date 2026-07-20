from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.config.database import get_db
from app.modules.auth.schemas import UserCreate, UserLogin, TokenResponse, UserResponse
from app.modules.auth.service import AuthService

router = APIRouter()

@router.post("/signup", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
def signup(user_data: UserCreate, db: Session = Depends(get_db)):
    """Register a new user"""
    user = AuthService.signup(db, user_data)
    return user

@router.post("/login", response_model=TokenResponse)
def login(user_data: UserLogin, db: Session = Depends(get_db)):
    """Login user and return access token"""
    result = AuthService.login(db, user_data)
    return {
        "access_token": result["token"],
        "token_type": "bearer",
        "user": result["user"]
    }
