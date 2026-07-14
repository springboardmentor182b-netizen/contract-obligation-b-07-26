from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.database.core import engine, Base
from src.entities import *
from src.auth.controller import router as auth_router
from src.todos.controller import router as todos_router
from src.users.controller import router as users_router
from src.contracts.controller import router as contracts_router
from src.obligations.controller import router as obligations_router
from src.renewals.controller import router as renewals_router
from src.compliance.controller import router as compliance_router
from src.notifications.controller import router as notifications_router

app = FastAPI(
    title="Contract Management API",
    description="Full-stack contract management platform API",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:4200",
        "http://127.0.0.1:4200",
        "http://localhost:4201",
        "http://127.0.0.1:4201",
        "http://localhost:4202",
        "http://127.0.0.1:4202",
        "http://localhost",
        "http://127.0.0.1"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create tables
Base.metadata.create_all(bind=engine)

# Include routers
app.include_router(auth_router)
app.include_router(todos_router)
app.include_router(users_router)
app.include_router(contracts_router)
app.include_router(obligations_router)
app.include_router(renewals_router)
app.include_router(compliance_router)
app.include_router(notifications_router)


@app.get("/")
def root():
    return {
        "message": "Contract Management API",
        "version": "1.0.0",
        "docs": "/docs"
    }


@app.get("/health")
def health_check():
    return {"status": "healthy"}