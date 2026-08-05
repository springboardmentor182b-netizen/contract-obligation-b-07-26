from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.auth import controller as auth_controller
from src.users import controller as users_controller
from src.database.core import engine, Base
from src.config import settings
from src.logging_config import logger

# Import models so they are registered with Base
from src.entities.user import User
from src.entities.password_reset import PasswordReset

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="ContractIQ API",
    description="Contract Obligation Tracking Assistant",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers with base URL paths
app.include_router(auth_controller.router, tags=["authentication"])
app.include_router(users_controller.router, prefix="/users", tags=["users"])

@app.get("/")
def read_root():
    logger.info("Root endpoint accessed")
    return {
        "message": "ContractIQ API",
        "version": "1.0.0",
        "status": "running"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.on_event("startup")
async def startup_event():
    logger.info(f"Starting {settings.APP_NAME}...")
    logger.info(f"Database: {settings.DATABASE_URL}")

@app.on_event("shutdown")
async def shutdown_event():
    logger.info(f"Shutting down {settings.APP_NAME}...")
