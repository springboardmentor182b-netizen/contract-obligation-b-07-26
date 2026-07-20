from fastapi import APIRouter, Query
from typing import Optional
from app.users.services import (
    get_users,
    get_user_stats,
    get_role_distribution,
    get_registration_trend,
)

router = APIRouter(
    prefix="/api/users",
    tags=["Users"],
)


@router.get("/")
def list_users(
    search: Optional[str] = Query(None, description="Search by name or email"),
    role: Optional[str] = Query(None, description="Filter by role"),
    status: Optional[str] = Query(None, description="Filter by status"),
    department: Optional[str] = Query(None, description="Filter by department"),
    sort_by: str = Query("name", description="Sort field"),
    sort_order: str = Query("asc", description="asc or desc"),
    page: int = Query(1, ge=1, description="Page number"),
    per_page: int = Query(10, ge=1, le=100, description="Items per page"),
):
    return get_users(
        search=search,
        role=role,
        status=status,
        department=department,
        sort_by=sort_by,
        sort_order=sort_order,
        page=page,
        per_page=per_page,
    )


@router.get("/stats")
def user_stats():
    return get_user_stats()


@router.get("/role-distribution")
def role_distribution():
    return get_role_distribution()


@router.get("/registration-trend")
def registration_trend():
    return get_registration_trend()
