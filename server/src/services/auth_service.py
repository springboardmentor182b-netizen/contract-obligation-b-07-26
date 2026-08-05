from datetime import datetime

from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user import UserCreate
from app.schemas.auth import LoginRequest
from app.utils.security import (
    hash_password,
    verify_password,
    create_access_token
)


# ----------------------------
# Register User
# ----------------------------

def register_user(
    db: Session,
    user: UserCreate
):

    existing_user = db.query(User).filter(

        User.email == user.email

    ).first()

    if existing_user:

        return None

    new_user = User(

        first_name=user.first_name,

        last_name=user.last_name,

        email=user.email,

        phone=user.phone,

        department=user.department,

        designation=user.designation,

        role_id=user.role_id,

        password=hash_password(user.password)

    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    return new_user


# ----------------------------
# Login
# ----------------------------

def login_user(
    db: Session,
    login_data: LoginRequest
):

    user = db.query(User).filter(

        User.email == login_data.email

    ).first()

    if not user:

        return None

    if not verify_password(

        login_data.password,

        user.password

    ):

        return None

    user.last_login = datetime.utcnow()

    db.commit()

    token = create_access_token(

        {

            "sub": user.email,

            "user_id": user.id,

            "role_id": user.role_id

        }

    )

    return {

        "access_token": token,

        "token_type": "bearer",

        "user": {

            "id": user.id,

            "name": f"{user.first_name} {user.last_name}",

            "email": user.email,

            "role_id": user.role_id,

            "department": user.department

        }

    }


# ----------------------------
# Forgot Password
# ----------------------------

def forgot_password(

    db: Session,

    email: str

):

    user = db.query(User).filter(

        User.email == email

    ).first()

    return user


# ----------------------------
# Reset Password
# ----------------------------

def reset_password(

    db: Session,

    email: str,

    password: str

):

    user = db.query(User).filter(

        User.email == email

    ).first()

    if not user:

        return False

    user.password = hash_password(password)

    db.commit()

    return True
