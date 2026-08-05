from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from src.database.core import SessionLocal
from src.users.schemas import UserCreate, UserUpdate, UserResponse
from src.users.service import get_user, get_users, create_user, update_user, delete_user
from src.auth.jwt import get_current_user

router = APIRouter(prefix="/users", tags=["Users"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=List[UserResponse])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return get_users(db, skip=skip, limit=limit)

@router.get("/{user_id}", response_model=UserResponse)
def read_user(user_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return get_user(db, user_id)

@router.post("/", response_model=UserResponse)
def create_new_user(user: UserCreate, db: Session = Depends(get_db)):
    return create_user(db, user)

@router.put("/{user_id}", response_model=UserResponse)
def update_existing_user(user_id: int, user_update: UserUpdate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return update_user(db, user_id, user_update)

@router.delete("/{user_id}")
def delete_existing_user(user_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return delete_user(db, user_id)
