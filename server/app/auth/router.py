from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.security import get_current_user
from app.users import services as user_services
from app.users.schemas import UserResponse
from app.auth import schemas, services

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/login", response_model=schemas.TokenResponse)
def login(payload: schemas.LoginRequest, db: Session = Depends(get_db)):
    try:
        user = services.authenticate_user(db, payload.email, payload.password)
    except services.InvalidCredentialsError:
        raise HTTPException(status_code=401, detail="Incorrect email or password")
    except services.InactiveAccountError:
        raise HTTPException(status_code=403, detail="This account has been deactivated")

    tokens = services.issue_tokens(user)
    return {**tokens, "user": user}


@router.post("/register", response_model=schemas.TokenResponse, status_code=201)
def register(payload: schemas.RegisterRequest, db: Session = Depends(get_db)):
    try:
        user = services.register_user(db, payload)
    except user_services.DuplicateEmailError as e:
        raise HTTPException(status_code=409, detail=str(e))

    tokens = services.issue_tokens(user)
    return {**tokens, "user": user}


@router.post("/refresh", response_model=schemas.AccessTokenResponse)
def refresh(payload: schemas.RefreshRequest, db: Session = Depends(get_db)):
    try:
        access_token = services.refresh_access_token(db, payload.refreshToken)
    except services.InvalidCredentialsError as e:
        raise HTTPException(status_code=401, detail=str(e))
    return {"accessToken": access_token}


@router.get("/me", response_model=UserResponse)
def read_me(current_user=Depends(get_current_user)):
    return current_user


@router.post("/logout", status_code=204)
def logout(payload: schemas.LogoutRequest):
    return None
