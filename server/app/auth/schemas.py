from pydantic import BaseModel, EmailStr, Field

from app.users.schemas import UserResponse


class LoginRequest(BaseModel):
    email: EmailStr
    password: str


class RegisterRequest(BaseModel):
    name: str
    email: EmailStr
    password: str = Field(min_length=8)
    role: str
    department: str | None = None


class RefreshRequest(BaseModel):
    refreshToken: str


class LogoutRequest(BaseModel):
    refreshToken: str


class TokenResponse(BaseModel):
    accessToken: str
    refreshToken: str
    user: UserResponse


class AccessTokenResponse(BaseModel):
    accessToken: str
