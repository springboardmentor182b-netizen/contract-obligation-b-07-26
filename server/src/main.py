from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database.database import Base
from app.database.database import engine

from app.routers import auth
from app.routers import users


# Import models so SQLAlchemy creates the tables
from app.models.role import Role
from app.models.user import User
from app.routers import roles

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="User Management API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(roles.router)


@app.get("/")
def root():
    return {
        "message": "User Management API Running Successfully"
    }
