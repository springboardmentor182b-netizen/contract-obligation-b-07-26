"""
Users Router
"""
from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List

from app.database import get_db
from app.users.schemas import UserList
from app.users.services import get_users, get_user_by_id

router = APIRouter()


@router.get("/", response_model=List[UserList])
async def list_users(
    skip: int = 0,
    limit: int = 100,
    db: AsyncSession = Depends(get_db)
):
    """Get list of users"""
    users = await get_users(db, skip, limit)
    return users


@router.get("/{user_id}", response_model=UserList)
async def get_user(
    user_id: int,
    db: AsyncSession = Depends(get_db)
):
    """Get user by ID"""
    user = await get_user_by_id(db, user_id)
    return user
