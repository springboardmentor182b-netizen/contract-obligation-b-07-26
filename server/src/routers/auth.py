from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

from src.auth.security import create_token, get_current_user, verify_password
from src.database.users import find_user_by_email


router = APIRouter()


@router.post("/login")
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    """Authenticate against the PostgreSQL users table."""
    user = find_user_by_email(form_data.username)
    if not user or not verify_password(form_data.password, user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    return {"access_token": create_token(user), "token_type": "bearer"}


@router.get("/me")
def get_current_logged_in_user(current_user: dict = Depends(get_current_user)):
    """Return the current PostgreSQL user without the password hash."""
    return {
        "id": current_user["id"],
        "name": current_user["name"],
        "full_name": current_user["name"],
        "email": current_user["email"],
        "role": current_user["role"],
        "department": current_user.get("department"),
        "is_active": current_user.get("is_active", True),
        "created_at": current_user["created_at"],
    }
