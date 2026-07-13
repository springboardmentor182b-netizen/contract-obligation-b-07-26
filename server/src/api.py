from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

from services import AuthService, TodoService, UserService, create_store
from exceptions import NotFoundError, ValidationError, RateLimitExceeded
from logging import logger
from rate_limiter import RateLimiter

store = create_store()
auth_service = AuthService(store)
user_service = UserService(store)
todo_service = TodoService(store)
rate_limiter = RateLimiter(limit=20, window_seconds=60)
app = FastAPI(title='Contract Obligation Server')


@app.middleware('http')
async def rate_limit(request: Request, call_next):
    client = request.client.host if request.client else 'unknown'
    allowed, remaining = rate_limiter.allow(client)
    if not allowed:
        raise RateLimitExceeded('Too many requests')
    response = await call_next(request)
    response.headers['X-RateLimit-Remaining'] = str(remaining)
    return response


@app.exception_handler(NotFoundError)
async def not_found_handler(request: Request, exc: NotFoundError):
    return JSONResponse({'error': str(exc)}, status_code=404)


@app.exception_handler(ValidationError)
async def validation_handler(request: Request, exc: ValidationError):
    return JSONResponse({'error': str(exc)}, status_code=400)


@app.exception_handler(RateLimitExceeded)
async def rate_limit_handler(request: Request, exc: RateLimitExceeded):
    return JSONResponse({'error': str(exc)}, status_code=429)


@app.get('/')
def health_check() -> dict:
    return {'status': 'ok'}


@app.post('/auth/register')
def auth_register(payload: dict) -> dict:
    return auth_service.register(payload)


@app.post('/auth/login')
def auth_login(payload: dict) -> dict:
    return auth_service.login(payload)


@app.get('/users')
def list_users() -> list[dict]:
    return user_service.list_users()


@app.get('/users/{user_id}')
def user_detail(user_id: int) -> dict:
    return user_service.get_user(user_id)


@app.get('/users/{user_id}/todos')
def user_todos(user_id: int) -> list[dict]:
    return todo_service.list_todos(user_id)


@app.post('/users/{user_id}/todos')
def create_user_todo(user_id: int, payload: dict) -> dict:
    return todo_service.create_todo(user_id, payload.get('title', ''), payload.get('description', ''))


@app.patch('/users/{user_id}/todos/{todo_id}')
def update_user_todo(user_id: int, todo_id: int, payload: dict) -> dict:
    return todo_service.update_todo(
        user_id,
        todo_id,
        completed=payload.get('completed'),
        title=payload.get('title'),
        description=payload.get('description'),
    )
