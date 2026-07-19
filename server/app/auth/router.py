"""
Authentication Router
"""
from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.auth.schemas import UserRegister, UserLogin, Token, UserResponse
from app.auth.services import create_user, authenticate_user, create_user_session
from app.security import create_access_token, create_refresh_token

router = APIRouter()


@router.post("/register", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def register(
    user_data: UserRegister,
    db: AsyncSession = Depends(get_db)
):
    """Register a new user"""
    user = await create_user(db, user_data)
    return user


@router.post("/login", response_model=Token)
async def login(
    login_data: UserLogin,
    request: Request,
    db: AsyncSession = Depends(get_db)
):
    """Login user"""
    user = await authenticate_user(db, login_data)
    
    # Create tokens
    access_token = create_access_token(data={"sub": str(user.user_id), "username": user.username})
    refresh_token = create_refresh_token(data={"sub": str(user.user_id)})
    
    # Create session
    ip_address = request.client.host if request.client else None
    user_agent = request.headers.get("user-agent")
    
    await create_user_session(db, user.user_id, refresh_token, ip_address, user_agent)
    
    return Token(
        access_token=access_token,
        refresh_token=refresh_token
    )


@router.post("/logout")
async def logout(
    db: AsyncSession = Depends(get_db)
):
    """Logout user"""
    # TODO: Invalidate session
    return {"message": "Logged out successfully"}


@router.get("/me", response_model=UserResponse)
async def get_current_user(
    db: AsyncSession = Depends(get_db)
):
    """Get current user"""
    # TODO: Implement auth dependency
    return {"message": "Current user endpoint"}
