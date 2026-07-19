"""
Reports Router (placeholder - to be implemented)
"""
from fastapi import APIRouter

router = APIRouter()


@router.get("/")
async def list_reports():
    """Get list of reports"""
    return {"message": "Reports endpoint - to be implemented"}
