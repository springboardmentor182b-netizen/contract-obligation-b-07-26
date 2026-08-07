"""
Users Controller - API Routes
"""

from fastapi import APIRouter
from .service import get_demo_users

router = APIRouter(prefix="/api", tags=["Users"])


@router.get("/demo-users")
async def demo_users():
    """Get list of demo users for testing"""
    return await get_demo_users()
