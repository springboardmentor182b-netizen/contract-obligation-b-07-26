import secrets
from datetime import datetime, timedelta, timezone
from typing import Optional

from sqlalchemy.orm import Session
from fastapi import HTTPException, status

from app.core.config import settings
from app.core.security import (
    hash_password,
    verify_password,
    create_access_token,
    create_refresh_token,
    decode_token,
)
from app.models.user import User, UserRole
from app.schemas.auth import (
    UserRegisterRequest,
    LoginRequest,
    TokenResponse,
    UserProfileResponse,
    PasswordResetRequest,
    PasswordResetConfirm,
)


class AuthService:
    """Business logic layer for authentication operations."""

    # ── Registration ─────────────────────────────────────────────────────────

    def register(self, db: Session, data: UserRegisterRequest) -> User:
        """
        Create a new user account.
        - Validates email uniqueness.
        - Only an Administrator may register non-Employee roles directly.
          (In practice, call this from an admin-protected endpoint for elevated roles.)
        """
        existing = db.query(User).filter(User.email == data.email).first()
        if existing:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="An account with this email already exists",
            )

        user = User(
            email=data.email,
            full_name=data.full_name,
            department=data.department,
            hashed_password=hash_password(data.password),
            role=data.role,
            is_active=True,
            is_verified=False,  # email verification pending
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        return user

    # ── Login ─────────────────────────────────────────────────────────────────

    def login(self, db: Session, data: LoginRequest) -> TokenResponse:
        """
        Authenticate a user and return access + refresh tokens.
        Uses a generic error message to prevent user enumeration.
        """
        user = db.query(User).filter(User.email == data.email).first()

        # Constant-time check — avoids timing attacks even on missing user
        dummy_hash = "$2b$12$notavalidhashjustfortimingggggggggggggggggggg"
        stored_hash = user.hashed_password if user else dummy_hash
        password_ok = verify_password(data.password, stored_hash)

        if not user or not password_ok:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid email or password",
            )
        if not user.is_active:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Account is deactivated. Contact your administrator.",
            )

        # Build tokens
        access_token = create_access_token(
            subject=str(user.id),
            extra_claims={"role": user.role.value, "name": user.full_name},
        )
        refresh_token = create_refresh_token(subject=str(user.id))

        # Persist hashed refresh token for rotation / revocation
        user.refresh_token_hash = hash_password(refresh_token)
        user.last_login = datetime.now(timezone.utc)
        db.commit()
        db.refresh(user)

        return TokenResponse(
            access_token=access_token,
            refresh_token=refresh_token,
            expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            user=UserProfileResponse.model_validate(user),
        )

    # ── Token Refresh ─────────────────────────────────────────────────────────

    def refresh_access_token(self, db: Session, refresh_token: str) -> TokenResponse:
        """
        Exchange a valid refresh token for a new access + refresh token pair
        (token rotation — old refresh token is invalidated).
        """
        invalid_exc = HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired refresh token",
        )
        try:
            payload = decode_token(refresh_token)
            if payload.get("type") != "refresh":
                raise invalid_exc
            user_id = payload.get("sub")
        except Exception:
            raise invalid_exc

        user = db.query(User).filter(User.id == user_id).first()
        if not user or not user.refresh_token_hash:
            raise invalid_exc

        # Verify stored hash matches submitted token
        if not verify_password(refresh_token, user.refresh_token_hash):
            raise invalid_exc

        # Rotate tokens
        new_access = create_access_token(
            subject=str(user.id),
            extra_claims={"role": user.role.value, "name": user.full_name},
        )
        new_refresh = create_refresh_token(subject=str(user.id))
        user.refresh_token_hash = hash_password(new_refresh)
        db.commit()
        db.refresh(user)

        return TokenResponse(
            access_token=new_access,
            refresh_token=new_refresh,
            expires_in=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 60,
            user=UserProfileResponse.model_validate(user),
        )

    # ── Logout ────────────────────────────────────────────────────────────────

    def logout(self, db: Session, user: User) -> None:
        """Revoke stored refresh token, effectively logging out all devices."""
        user.refresh_token_hash = None
        db.commit()

    # ── Password Reset ────────────────────────────────────────────────────────

    def request_password_reset(
        self, db: Session, data: PasswordResetRequest
    ) -> str:
        """
        Generate a secure reset token.
        Returns the token (caller is responsible for emailing it).
        Always returns success to prevent user enumeration.
        """
        user = db.query(User).filter(User.email == data.email).first()
        if user and user.is_active:
            token = secrets.token_urlsafe(32)
            user.reset_token = token
            user.reset_token_expires = datetime.now(timezone.utc) + timedelta(hours=1)
            db.commit()
            return token  # in production: email this token to user.email
        return ""  # silently succeed even if email not found

    def confirm_password_reset(
        self, db: Session, data: PasswordResetConfirm
    ) -> None:
        """Apply the new password if the reset token is valid and unexpired."""
        user = (
            db.query(User)
            .filter(
                User.reset_token == data.token,
                User.reset_token_expires > datetime.now(timezone.utc),
            )
            .first()
        )
        if not user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid or expired reset token",
            )
        user.hashed_password = hash_password(data.new_password)
        user.reset_token = None
        user.reset_token_expires = None
        user.refresh_token_hash = None  # invalidate all sessions
        db.commit()


auth_service = AuthService()
