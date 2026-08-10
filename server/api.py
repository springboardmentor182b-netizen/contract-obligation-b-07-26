"""
Main API Application
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.auth import auth_router
from src.users import users_router
from src.database import init_db

# Initialize FastAPI app
app = FastAPI(
    title="ContractIQ API Gateway",
    description="Contract Obligation Tracking Assistant - API Gateway",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

# CORS configuration - Allow all origins for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001", "http://localhost:5173", "http://127.0.0.1:3001", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

# Initialize database
init_db()

# Include routers
app.include_router(auth_router)
app.include_router(users_router)


@app.get("/")
async def root():
    return {
        "service": "ContractIQ API Gateway",
        "version": "1.0.0",
        "status": "running",
        "description": "Contract Obligation Tracking Assistant"
    }


@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "database": "connected"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=3000, reload=True)
