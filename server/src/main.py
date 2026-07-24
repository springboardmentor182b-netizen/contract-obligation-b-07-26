from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.database.core import engine
from src.renewals import models, controller

# This line forces PostgreSQL to build your tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Renewal Dashboard API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(controller.router)