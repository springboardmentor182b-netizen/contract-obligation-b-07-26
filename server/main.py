from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.config.database import engine, Base
from app.modules.auth.controller import router as auth_router
from app.modules.users.controller import router as users_router

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="ContractIQ API",
    description="Contract Obligation Tracking Assistant API",
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

# Include routers
app.include_router(auth_router, prefix="/api/auth", tags=["Authentication"])
app.include_router(users_router, prefix="/api/users", tags=["Users"])

@app.get("/")
def read_root():
    return {"message": "Welcome to ContractIQ API"}

@app.get("/api/health")
def health_check():
    return {"status": "healthy"}
