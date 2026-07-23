from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.database.session import engine, Base
from src.routers import auth, contracts, users, obligation_routers, dashboard_routers


# Create database tables
Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="ContractIQ: Contract Obligation Tracking API",
    version="1.0.0",
    description="Backend API for contracts, obligations, renewals, compliance, notifications, reports, and audit logs.",
)


# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Register routers
app.include_router(
    auth.router,
    prefix="/api/auth",
    tags=["auth"]
)

app.include_router(
    users.router,
    prefix="/api/users",
    tags=["users"]
)

app.include_router(
    contracts.router,
    prefix="/api/contracts",
    tags=["contracts"]
)

app.include_router(
    obligation_routers.router,
    prefix="/api/obligations",
    tags=["obligations"]
)

app.include_router(
    dashboard_routers.router,
    prefix="/api/dashboard",
    tags=["dashboard"]
)


@app.get("/")
def read_root():
    return {
        "message": "Welcome to the Contract Management API"
    }


@app.get("/health")
def health():
    return {
        "status": "ok",
        "service": "contractiq-api"
    }