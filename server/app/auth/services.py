"""
Authentication Services
"""
from datetime import datetime, timedelta
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from fastapi import HTTPException, status

from app.auth.models import User, UserSession
from app.auth.schemas import UserRegister, UserLogin
from app.security import get_password_hash, verify_password, create_access_token, create_refresh_token
from app.config import settings


async def create_user(db: AsyncSession, user_data: UserRegister) -> User:
    """Create a new user"""
    
    # Check if email exists
    result = await db.execute(select(User).where(User.email == user_data.email))
    if result.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered"
        )
    
    # Check if username exists
    result = await db.execute(select(User).where(User.username == user_data.username))
    if result.scalar_one_or_none():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already taken"
        )
    
    # Create user
    user = User(
        email=user_data.email,
        username=user_data.username,
        password_hash=get_password_hash(user_data.password),
        first_name=user_data.first_name,
        last_name=user_data.last_name,
        phone=user_data.phone,
        role=user_data.role
    )
    
    db.add(user)
    await db.commit()
    await db.refresh(user)
    
    return user


async def authenticate_user(db: AsyncSession, login_data: UserLogin) -> User:
    """Authenticate user"""
    
    # Find user
    result = await db.execute(select(User).where(User.username == login_data.username))
    user = result.scalar_one_or_none()
    
    if not user or not verify_password(login_data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password"
        )
    
    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User account is inactive"
        )
    
    # Update last login
    user.last_login = datetime.utcnow()
    await db.commit()
    
    return user


async def create_user_session(db: AsyncSession, user_id: int, refresh_token: str, ip_address: str = None, user_agent: str = None) -> UserSession:
    """Create user session"""
    
    expires_at = datetime.utcnow() + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
    
    session = UserSession(
        user_id=user_id,
        refresh_token=refresh_token,
        ip_address=ip_address,
        user_agent=user_agent,
        expires_at=expires_at
    )
    
    db.add(session)
    await db.commit()
    
    return session
