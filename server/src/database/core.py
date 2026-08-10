 GROUP-C-Feature/UserDashBoard-Harshitha
from __future__ import annotations
from typing import Any, Dict, List, Optional
from exceptions import NotFoundError, ValidationError

class MemoryStore:
    def __init__(self) -> None:
        self._users: List[Dict[str, Any]] = []
        self._todos: List[Dict[str, Any]] = []
        self._next_user_id = 1
        self._next_todo_id = 1

    def create_user(self, user: Dict[str, Any]) -> Dict[str, Any]:
        self._users.append(user)
        return user
"""Database engine/session setup (PostgreSQL)."""
import os

from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# Set DATABASE_URL in your environment, e.g.:
# postgresql://<user>:<password>@<host>:<port>/<database>
SQLALCHEMY_DATABASE_URL = os.environ.get(
    "DATABASE_URL",
    "postgresql://contractiq:contractiq@localhost:5432/contractiq",
)

engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    pool_pre_ping=True,  # recycles dead connections instead of erroring on stale ones
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
 main-group-C

    def get_user_by_username(self, username: str) -> Optional[Dict[str, Any]]:
        for user in self._users:
            if user['username'] == username:
                return user
        return None

    def get_user_by_id(self, user_id: int) -> Optional[Dict[str, Any]]:
        for user in self._users:
            if user['id'] == user_id:
                return user
        return None

    def list_users(self) -> List[Dict[str, Any]]:
        return [user.copy() for user in self._users]

    def create_todo(self, todo: Dict[str, Any]) -> Dict[str, Any]:
        self._todos.append(todo)
        return todo

    def list_todos_for_user(self, user_id: int) -> List[Dict[str, Any]]:
        return [todo for todo in self._todos if todo['user_id'] == user_id]

    def get_todo_for_user(self, user_id: int, todo_id: int) -> Optional[Dict[str, Any]]:
        for todo in self._todos:
            if todo['user_id'] == user_id and todo['id'] == todo_id:
                return todo
        return None

    def update_todo(self, todo: Dict[str, Any]) -> Dict[str, Any]:
        for index, existing in enumerate(self._todos):
            if existing['id'] == todo['id'] and existing['user_id'] == todo['user_id']:
                self._todos[index] = todo
                return todo
        raise NotFoundError('todo not found')

    def next_user_id(self) -> int:
        current = self._next_user_id
        self._next_user_id += 1
        return current

    def next_todo_id(self) -> int:
        current = self._next_todo_id
        self._next_todo_id += 1
        return current


def create_store() -> MemoryStore:
    return MemoryStore()
