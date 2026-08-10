from sqlalchemy.orm import Session
from passlib.context import CryptContext
from fastapi import HTTPException, status

from src.auth.models import User
from src.auth.schemas import UserCreate, UserLogin
from src.auth.jwt import create_access_token

pwd_context = CryptContext(
    schemes=["sha256_crypt"],
    deprecated="auto"
)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)


def hash_password(password: str) -> str:
    return pwd_context.hash(password)


def create_user(db: Session, user: UserCreate):
    existing_user = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )

    new_user = User(
        username=user.username,
        email=user.email,
        password=hash_password(user.password),
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


def authenticate_user(db: Session, user_login: UserLogin):
    user = (
        db.query(User)
        .filter(User.email == user_login.email)
        .first()
    )

    if not user:
        return None

    if not verify_password(user_login.password, user.password):
        return None

    return user


def login(db: Session, user_login: UserLogin):
    user = authenticate_user(db, user_login)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    token = create_access_token(
        data={"sub": user.email}
    )

    return {
        "access_token": token,
        "token_type": "bearer",
    }


def forgot_password(db: Session, email: str):
    user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    return {
        "message": "Password reset request received"
    }


# ----------------------------
# TEMPORARY DEVELOPMENT HELPER
# ----------------------------
def reset_password(
    db: Session,
    email: str,
    new_password: str,
):
    user = (
        db.query(User)
        .filter(User.email == email)
        .first()
    )

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found",
        )

    user.password = hash_password(new_password)

    db.commit()

    return {
        "message": "Password updated successfully"
    }