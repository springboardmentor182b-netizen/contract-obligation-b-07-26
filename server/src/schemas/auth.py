from pydantic import BaseModel
from pydantic import EmailStr


# -----------------------------
# Login Request
# -----------------------------

class LoginRequest(BaseModel):

    email: EmailStr

    password: str


# -----------------------------
# JWT Token
# -----------------------------

class Token(BaseModel):

    access_token: str

    token_type: str


# -----------------------------
# Token Data
# -----------------------------

class TokenData(BaseModel):

    email: str | None = None


# -----------------------------
# Forgot Password
# -----------------------------

class ForgotPasswordRequest(BaseModel):

    email: EmailStr


# -----------------------------
# Reset Password
# -----------------------------

class ResetPasswordRequest(BaseModel):

    email: EmailStr

    new_password: str
