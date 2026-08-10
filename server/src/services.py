from __future__ import annotations

from typing import Any, Dict, List, Optional

from src.exceptions import NotFoundError, ValidationError


from database.core import MemoryStore, create_store


class AuthService:
    def __init__(self, store: MemoryStore) -> None:
        self.store = store

    def register(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        username = payload.get('username')
        password = payload.get('password')
        if not username or not password:
            raise ValidationError('username and password are required')
        if self.store.get_user_by_username(username):
            raise ValidationError('username already exists')

        user = {
            'id': self.store.next_user_id(),
            'username': username,
            'password': password,
            'display_name': payload.get('display_name') or username,
        }

        self.store.create_user(user)
        return {'user': self._public_user(user), 'token': f'token-{user['id']}'}

    def login(self, payload: Dict[str, Any]) -> Dict[str, Any]:
        username = payload.get('username')
        password = payload.get('password')
        if not username or not password:
            raise ValidationError('username and password are required')

        user = self.store.get_user_by_username(username)
        if not user or user['password'] != password:
            raise ValidationError('invalid credentials')

        return {'user': self._public_user(user), 'token': f'token-{user['id']}'}

    def _public_user(self, user: Dict[str, Any]) -> Dict[str, Any]:
        return {
            'id': user['id'],
            'username': user['username'],
            'display_name': user.get('display_name') or user['username'],
        }


class UserService:
    def __init__(self, store: MemoryStore) -> None:
        self.store = store

    def list_users(self) -> List[Dict[str, Any]]:
        return [self._public_user(user) for user in self.store.list_users()]

    def get_user(self, user_id: int) -> Dict[str, Any]:
        user = self.store.get_user_by_id(user_id)
        if not user:
            raise NotFoundError('user not found')
        return self._public_user(user)

    def _public_user(self, user: Dict[str, Any]) -> Dict[str, Any]:
        return {
            'id': user['id'],
            'username': user['username'],
            'display_name': user.get('display_name') or user['username'],
        }


class TodoService:
    def __init__(self, store: MemoryStore) -> None:
        self.store = store

    def create_todo(self, user_id: int, title: str, description: str = '') -> Dict[str, Any]:
        if not title:
            raise ValidationError('title is required')

        if not self.store.get_user_by_id(user_id):
            raise NotFoundError('user not found')

        todo = {
            'id': self.store.next_todo_id(),
            'user_id': user_id,
            'title': title,
            'description': description,
            'completed': False,
        }
        return self.store.create_todo(todo)

    def list_todos(self, user_id: int) -> List[Dict[str, Any]]:
        if not self.store.get_user_by_id(user_id):
            raise NotFoundError('user not found')
        return self.store.list_todos_for_user(user_id)

    def update_todo(
        self,
        user_id: int,
        todo_id: int,
        completed: bool | None = None,
        title: str | None = None,
        description: str | None = None,
    ) -> Dict[str, Any]:
        todo = self.store.get_todo_for_user(user_id, todo_id)
        if not todo:
            raise NotFoundError('todo not found')
        if completed is not None:
            todo['completed'] = completed
        if title is not None:
            todo['title'] = title
        if description is not None:
            todo['description'] = description
        return self.store.update_todo(todo)
