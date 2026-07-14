from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.database.core import SessionLocal
from src.auth.schemas import UserCreate, UserLogin, UserResponse, Token
from src.auth.service import create_user, login
from src.auth.jwt import get_current_user
router = APIRouter(prefix="/auth", tags=["Authentication"])
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
@router.post("/signup", response_model=UserResponse)
def signup(user: UserCreate, db: Session = Depends(get_db)):
    return create_user(db, user)
@router.post("/login", response_model=Token)
def login_endpoint(user: UserLogin, db: Session = Depends(get_db)):
    return login(db, user)
@router.get("/me", response_model=UserResponse)
def read_users_me(current_user = Depends(get_current_user)):
    return current_user