from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.database.core import engine, Base
from src.entities import dashboard
from src.routers.dashboard import router as dashboard_router


app = FastAPI()
Base.metadata.create_all(bind=engine)

# Allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Dashboard APIs
app.include_router(
    dashboard_router,
    prefix="/api"
)

