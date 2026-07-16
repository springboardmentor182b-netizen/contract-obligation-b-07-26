from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.database.session import engine, Base
from src.routers import auth, contracts, users

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Contract Management API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # For development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(users.router, prefix="/api/users", tags=["users"])
app.include_router(contracts.router, prefix="/api/contracts", tags=["contracts"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the Contract Management API"}
