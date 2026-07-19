"""
FastAPI Main Application
Contract Management System
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import json

from app.config import settings
from app.database import engine, init_db
from app.auth.router import router as auth_router
from app.users.router import router as users_router
from app.reports.router import router as reports_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan events"""
    print(f"🚀 Starting {settings.APP_NAME} v{settings.VERSION}")
    print(f"Environment: {settings.ENVIRONMENT}")
    print(f"Debug mode: {settings.DEBUG}")
    
    # Initialize database
    await init_db()
    print("✓ Database initialized")
    
    yield
    
    # Cleanup
    await engine.dispose()
    print("✓ Database connections closed")


# Create FastAPI application
app = FastAPI(
    title=settings.APP_NAME,
    version=settings.VERSION,
    description="Enterprise Contract Management System API",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
    openapi_url="/api/openapi.json",
    lifespan=lifespan
)

# Parse CORS origins
try:
    cors_origins = json.loads(settings.CORS_ORIGINS)
except:
    cors_origins = ["http://localhost:4200", "http://localhost:3000"]

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth_router, prefix="/api/auth", tags=["Authentication"])
app.include_router(users_router, prefix="/api/users", tags=["Users"])
app.include_router(reports_router, prefix="/api/reports", tags=["Reports"])


@app.get("/")
async def root():
    """Root endpoint"""
    return {
        "message": f"Welcome to {settings.APP_NAME}",
        "version": settings.VERSION,
        "docs": "/api/docs"
    }


@app.get("/api/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "app": settings.APP_NAME,
        "version": settings.VERSION,
        "environment": settings.ENVIRONMENT
    }
