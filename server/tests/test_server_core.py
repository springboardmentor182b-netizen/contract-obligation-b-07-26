import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent / 'src'))

from services import AuthService, TodoService, UserService, create_store


def test_auth_registration_and_login_flow():
    store = create_store()
    auth_service = AuthService(store)

    result = auth_service.register({'username': 'nova', 'password': 'secret123', 'display_name': 'Nova'})
    assert result['user']['username'] == 'nova'
    assert result['token']

    login_result = auth_service.login({'username': 'nova', 'password': 'secret123'})
    assert login_result['user']['username'] == 'nova'
    assert login_result['token']


def test_todo_crud_for_user_scope():
    store = create_store()
    auth_service = AuthService(store)
    todo_service = TodoService(store)

    user = auth_service.register({'username': 'maya', 'password': 'pass123'})['user']
    created = todo_service.create_todo(user['id'], 'Draft notes', 'First pass')
    assert created['title'] == 'Draft notes'
    assert created['completed'] is False

    todos = todo_service.list_todos(user['id'])
    assert len(todos) == 1

    updated = todo_service.update_todo(user['id'], created['id'], completed=True)
    assert updated['completed'] is True


def test_user_lookup_and_listing():
    store = create_store()
    auth_service = AuthService(store)
    user_service = UserService(store)

    auth_service.register({'username': 'riley', 'password': 'abc123', 'display_name': 'Riley'})
    users = user_service.list_users()
    assert len(users) == 1
    fetched = user_service.get_user(users[0]['id'])
    assert fetched['username'] == 'riley'
