from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from src.database.core import SessionLocal
from src.todos.schemas import TodoCreate, TodoUpdate, TodoResponse
from src.todos.service import get_todo, get_todos, create_todo, update_todo, delete_todo
from src.auth.jwt import get_current_user

router = APIRouter(prefix="/todos", tags=["Todos"])

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=List[TodoResponse])
def read_todos(skip: int = 0, limit: int = 100, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return get_todos(db, user_id=current_user.id, skip=skip, limit=limit)

@router.get("/{todo_id}", response_model=TodoResponse)
def read_todo(todo_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return get_todo(db, todo_id, user_id=current_user.id)

@router.post("/", response_model=TodoResponse)
def create_new_todo(todo: TodoCreate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return create_todo(db, todo, user_id=current_user.id)

@router.put("/{todo_id}", response_model=TodoResponse)
def update_existing_todo(todo_id: int, todo_update: TodoUpdate, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return update_todo(db, todo_id, todo_update, user_id=current_user.id)

@router.delete("/{todo_id}")
def delete_existing_todo(todo_id: int, db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return delete_todo(db, todo_id, user_id=current_user.id)
