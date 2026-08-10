"""
Authentication Controller - API Routes
"""

from fastapi import APIRouter, HTTPException
from .models import (
    UserRegister,
    UserLogin,
    ForgotPasswordRequest,
    VerifyOTPRequest,
    ResetPasswordRequest,
    Token
)
from . import service

router = APIRouter(prefix="/api/auth", tags=["Authentication"])


@router.post("/register", response_model=Token)
async def register(user: UserRegister):
    """Register a new user account"""
    return await service.register_user(user)


@router.post("/login", response_model=Token)
async def login(credentials: UserLogin):
    """Authenticate user and return JWT token"""
    return await service.login_user(credentials)


@router.post("/forgot-password")
async def forgot_password(request: ForgotPasswordRequest):
    """Send OTP to user's email for password reset"""
    return await service.request_password_reset(request.email)


@router.post("/verify-otp")
async def verify_otp(request: VerifyOTPRequest):
    """Verify OTP code"""
    return await service.verify_otp(request.email, request.otp)


@router.post("/reset-password")
async def reset_password(request: ResetPasswordRequest):
    """Reset password with OTP verification"""
    return await service.reset_password(request)
