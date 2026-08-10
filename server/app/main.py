from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine
from app.contracts import models
from app.contracts.router import router as contracts_router

# Create database tables automatically
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="ContractIQ API")

# Allow React to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include the modular routes
app.include_router(contracts_router)
