from typing import Annotated
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.dependencies.auth import (
    get_current_active_user,
    require_roles,
)
from app.models.user import User, UserRole
from app.schemas.auth import (
    LoginRequest,
    PasswordResetConfirm,
    PasswordResetRequest,
    PublicRegisterRequest,
    RefreshTokenRequest,
    TokenResponse,
    UserProfileResponse,
    UserRegisterRequest,
    UserRegisterResponse,
)
from app.services.auth_service import auth_service

router = APIRouter(prefix="/auth", tags=["Authentication"])


# ── Public endpoints ─────────────────────────────────────────────────────────

@router.post(
    "/register",
    response_model=UserRegisterResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Register a new user account",
    description=(
        "Creates a new user with role EMPLOYEE by default. "
        "Elevated roles (Legal Manager, Administrator, etc.) must be assigned "
        "by an Administrator via the admin endpoint."
    ),
)
def register(
    payload: PublicRegisterRequest,
    db: Session = Depends(get_db),
):
    # Convert to full request, locking role to EMPLOYEE
    full_payload = UserRegisterRequest(
        email=payload.email,
        full_name=payload.full_name,
        password=payload.password,
        department=payload.department,
        role=UserRole.EMPLOYEE,
    )
    user = auth_service.register(db, full_payload)
    return user


@router.post(
    "/login",
    response_model=TokenResponse,
    summary="Authenticate and receive JWT tokens",
)
def login(
    payload: LoginRequest,
    db: Session = Depends(get_db),
):
    return auth_service.login(db, payload)


@router.post(
    "/refresh",
    response_model=TokenResponse,
    summary="Refresh access token using a valid refresh token",
)
def refresh_token(
    payload: RefreshTokenRequest,
    db: Session = Depends(get_db),
):
    return auth_service.refresh_access_token(db, payload.refresh_token)


@router.post(
    "/password-reset/request",
    status_code=status.HTTP_202_ACCEPTED,
    summary="Request a password reset email",
)
def request_password_reset(
    payload: PasswordResetRequest,
    db: Session = Depends(get_db),
):
    # Token is returned here for development; in production it is emailed
    auth_service.request_password_reset(db, payload)
    return {"message": "If this email is registered, a reset link has been sent."}


@router.post(
    "/password-reset/confirm",
    status_code=status.HTTP_200_OK,
    summary="Confirm password reset with token",
)
def confirm_password_reset(
    payload: PasswordResetConfirm,
    db: Session = Depends(get_db),
):
    auth_service.confirm_password_reset(db, payload)
    return {"message": "Password has been reset successfully. Please log in again."}


# ── Protected endpoints ───────────────────────────────────────────────────────

@router.get(
    "/me",
    response_model=UserProfileResponse,
    summary="Get current authenticated user's profile",
)
def get_profile(
    current_user: Annotated[User, Depends(get_current_active_user)],
):
    return current_user


@router.post(
    "/logout",
    status_code=status.HTTP_200_OK,
    summary="Logout — revoke refresh token",
)
def logout(
    current_user: Annotated[User, Depends(get_current_active_user)],
    db: Session = Depends(get_db),
):
    auth_service.logout(db, current_user)
    return {"message": "Logged out successfully."}


# ── Admin-only: register elevated roles ──────────────────────────────────────

@router.post(
    "/admin/register",
    response_model=UserRegisterResponse,
    status_code=status.HTTP_201_CREATED,
    summary="[Admin only] Register a user with any role",
    dependencies=[Depends(require_roles(UserRole.ADMINISTRATOR))],
)
def admin_register(
    payload: UserRegisterRequest,
    db: Session = Depends(get_db),
):
    """
    Only Administrators can assign roles other than EMPLOYEE.
    Use this endpoint to onboard Legal Managers, Compliance Officers, etc.
    """
    user = auth_service.register(db, payload)
    return user
