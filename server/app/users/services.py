"""
User Services
"""
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from typing import List

from app.auth.models import User


async def get_users(db: AsyncSession, skip: int = 0, limit: int = 100) -> List[User]:
    """Get list of users"""
    result = await db.execute(select(User).offset(skip).limit(limit))
    return result.scalars().all()


async def get_user_by_id(db: AsyncSession, user_id: int) -> User:
    """Get user by ID"""
    result = await db.execute(select(User).where(User.user_id == user_id))
    return result.scalar_one_or_none()
