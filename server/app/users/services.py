"""
Business logic for the Users module.

ASSUMPTION: app/security.py exposes `hash_password(plain: str) -> str`
(e.g. via passlib's bcrypt) — same file assumed to hold `get_current_user`
in the reports module's router.py. Adjust the import below if it lives
elsewhere.
"""
import uuid
from typing import Optional
from uuid import UUID

from sqlalchemy.orm import Session

from app.security import hash_password
from app.users.models import User, UserRole, UserStatus
from app.users import schemas


class DuplicateEmailError(Exception):
    pass


class UserNotFoundError(Exception):
    pass


def list_users(
    db: Session,
    page: int,
    page_size: int,
    search: Optional[str],
    role: Optional[str],
    status: Optional[str],
) -> schemas.UserListResponse:
    query = db.query(User)

    if search:
        like = f"%{search}%"
        query = query.filter((User.name.ilike(like)) | (User.email.ilike(like)))
    if role:
        query = query.filter(User.role == role)
    if status:
        query = query.filter(User.status == status)

    total = query.count()
    users = (
        query.order_by(User.created_at.desc())
        .offset((page - 1) * page_size)
        .limit(page_size)
        .all()
    )

    return schemas.UserListResponse(
        items=[schemas.UserResponse.model_validate(u) for u in users],
        total=total,
    )


def get_user(db: Session, user_id: UUID) -> User:
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise UserNotFoundError(f"User {user_id} not found")
    return user


def create_user(db: Session, payload: schemas.UserCreate) -> User:
    existing = db.query(User).filter(User.email == payload.email).first()
    if existing:
        raise DuplicateEmailError(f"A user with email {payload.email} already exists")

    user = User(
        id=uuid.uuid4(),
        name=payload.name,
        email=payload.email,
        hashed_password=hash_password(payload.password),
        role=UserRole(payload.role),
        department=payload.department,
        status=UserStatus.active,
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    return user


def update_user(db: Session, user_id: UUID, payload: schemas.UserUpdate) -> User:
    user = get_user(db, user_id)

    if payload.email and payload.email != user.email:
        existing = db.query(User).filter(User.email == payload.email).first()
        if existing:
            raise DuplicateEmailError(f"A user with email {payload.email} already exists")
        user.email = payload.email

    if payload.name is not None:
        user.name = payload.name
    if payload.department is not None:
        user.department = payload.department
    if payload.role is not None:
        user.role = UserRole(payload.role)

    db.commit()
    db.refresh(user)
    return user


def update_role(db: Session, user_id: UUID, role: str) -> User:
    user = get_user(db, user_id)
    user.role = UserRole(role)
    db.commit()
    db.refresh(user)
    return user


def update_status(db: Session, user_id: UUID, status: str) -> User:
    user = get_user(db, user_id)
    user.status = UserStatus(status)
    db.commit()
    db.refresh(user)
    return user


def delete_user(db: Session, user_id: UUID) -> None:
    user = get_user(db, user_id)
    db.delete(user)
    db.commit()
