from sqlalchemy.orm import Session
from typing import List, Optional
from src.todos.models import Todo
from src.todos.schemas import TodoCreate, TodoUpdate
from fastapi import HTTPException, status

def get_todo(db: Session, todo_id: int, user_id: int):
    todo = db.query(Todo).filter(Todo.id == todo_id, Todo.user_id == user_id).first()
    if not todo:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Todo not found"
        )
    return todo

def get_todos(db: Session, user_id: int, skip: int = 0, limit: int = 100):
    return db.query(Todo).filter(Todo.user_id == user_id).offset(skip).limit(limit).all()

def create_todo(db: Session, todo: TodoCreate, user_id: int):
    new_todo = Todo(
        title=todo.title,
        description=todo.description,
        completed=todo.completed,
        user_id=user_id
    )
    db.add(new_todo)
    db.commit()
    db.refresh(new_todo)
    return new_todo

def update_todo(db: Session, todo_id: int, todo_update: TodoUpdate, user_id: int):
    todo = get_todo(db, todo_id, user_id)
    
    update_data = todo_update.model_dump(exclude_unset=True)
    
    for field, value in update_data.items():
        setattr(todo, field, value)
    
    db.commit()
    db.refresh(todo)
    return todo

def delete_todo(db: Session, todo_id: int, user_id: int):
    todo = get_todo(db, todo_id, user_id)
    db.delete(todo)
    db.commit()
    return {"message": "Todo deleted successfully"}
