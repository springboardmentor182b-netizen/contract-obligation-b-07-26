"""
Business logic for login/register/refresh. Registration deliberately calls
app.users.services.create_user() rather than duplicating user-creation
logic — same DRY pattern used by the Settings module's profile endpoint.
"""
from sqlalchemy.orm import Session
from datetime import datetime

from app.security import verify_password, create_access_token, create_refresh_token, decode_token
from app.users.models import User, UserStatus
from app.users.schemas import UserCreate
from app.users import services as user_services
from app.auth import schemas


class InvalidCredentialsError(Exception):
    pass


class InactiveAccountError(Exception):
    pass


def authenticate_user(db: Session, email: str, password: str) -> User:
    user = db.query(User).filter(User.email == email).first()
    if not user or not verify_password(password, user.hashed_password):
        raise InvalidCredentialsError("Incorrect email or password")

    if user.status != UserStatus.active:
        raise InactiveAccountError("This account has been deactivated")

    user.last_login_at = datetime.utcnow()
    db.commit()
    db.refresh(user)
    return user


def register_user(db: Session, payload: schemas.RegisterRequest) -> User:
    # Delegates to the canonical user-creation logic (handles duplicate
    # email checks + password hashing) instead of reimplementing it here.
    return user_services.create_user(
        db,
        UserCreate(name=payload.name, email=payload.email, password=payload.password, role=payload.role, department=payload.department),
    )


def issue_tokens(user: User) -> dict:
    return {
        "accessToken": create_access_token(user.id),
        "refreshToken": create_refresh_token(user.id),
    }


def refresh_access_token(db: Session, refresh_token: str) -> str:
    payload = decode_token(refresh_token)
    if payload.get("type") != "refresh":
        raise InvalidCredentialsError("Not a valid refresh token")

    user = db.query(User).filter(User.id == payload.get("sub")).first()
    if not user or user.status != UserStatus.active:
        raise InvalidCredentialsError("User not found or inactive")

    return create_access_token(user.id)
