from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.database import engine
from app.contracts import models
from app.contracts.router import router as contracts_router
from app.analytics.router import router as analytics_router
from app.renewals.router import router as renewals_router
from app.settings.router import router as settings_router
from app.users.router import router as users_router
from app.auth.router import router as auth_router

app = FastAPI(title="ContractIQ API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create database tables automatically
models.Base.metadata.create_all(bind=engine)

# Include the modular routes
app.include_router(contracts_router)
app.include_router(analytics_router)
app.include_router(renewals_router)
app.include_router(settings_router)
app.include_router(users_router)
app.include_router(auth_router)
