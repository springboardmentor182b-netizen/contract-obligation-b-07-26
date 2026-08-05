from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.database.database import get_db

from app.schemas.user import UserCreate
from app.schemas.auth import (
    LoginRequest,
    ForgotPasswordRequest,
    ResetPasswordRequest
)

from app.services.auth_service import (
    register_user,
    login_user,
    forgot_password,
    reset_password
)

router = APIRouter()


# --------------------------------
# Register
# --------------------------------

@router.post("/register")

def register(

    user: UserCreate,

    db: Session = Depends(get_db)

):

    new_user = register_user(

        db,

        user

    )

    if not new_user:

        raise HTTPException(

            status_code=400,

            detail="Email already exists."

        )

    return {

        "message": "User registered successfully.",

        "user": new_user

    }


# --------------------------------
# Login
# --------------------------------

@router.post("/login")

def login(

    login: LoginRequest,

    db: Session = Depends(get_db)

):

    result = login_user(

        db,

        login

    )

    if not result:

        raise HTTPException(

            status_code=401,

            detail="Invalid email or password."

        )

    return result


# --------------------------------
# Forgot Password
# --------------------------------

@router.post("/forgot-password")

def forgot(

    request: ForgotPasswordRequest,

    db: Session = Depends(get_db)

):

    user = forgot_password(

        db,

        request.email

    )

    if not user:

        raise HTTPException(

            status_code=404,

            detail="User not found."

        )

    return {

        "message": "User verified."

    }


# --------------------------------
# Reset Password
# --------------------------------

@router.post("/reset-password")

def reset(

    request: ResetPasswordRequest,

    db: Session = Depends(get_db)

):

    success = reset_password(

        db,

        request.email,

        request.new_password

    )

    if not success:

        raise HTTPException(

            status_code=404,

            detail="User not found."

        )

    return {

        "message": "Password reset successful."

    }
