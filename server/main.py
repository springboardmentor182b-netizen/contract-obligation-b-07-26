from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.database.core import Base, engine
from src.auth.controller import router as auth_router
from src.auth.oauth_controller import router as oauth_router
from src.users.controller import router as users_router
from src.todos.controller import router as todos_router
from src.auth.models import User
from src.todos.models import Todo

app = FastAPI(title="Contract Obligation API", version="1.0.0")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router)
app.include_router(oauth_router)
app.include_router(users_router)
app.include_router(todos_router)

@app.on_event("startup")
def startup_event():
    Base.metadata.create_all(bind=engine)

@app.get("/")
def hello_world():
    return {"message": "Contract Obligation API is running", "status": "active"}
