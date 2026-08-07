"""
Authentication Pydantic Models
"""

from pydantic import BaseModel, EmailStr, validator
from typing import Optional


class UserRegister(BaseModel):
    firstName: str
    lastName: str
    email: EmailStr
    password: str  # No validation - accept any password!
    role: Optional[str] = "Employee"
    department: Optional[str] = None


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class ForgotPasswordRequest(BaseModel):
    email: EmailStr


class VerifyOTPRequest(BaseModel):
    email: EmailStr
    otp: str


class ResetPasswordRequest(BaseModel):
    email: EmailStr
    otp: str
    newPassword: str  # No validation - accept any password!
    confirmPassword: str


class Token(BaseModel):
    message: str
    token: str
    user: dict
