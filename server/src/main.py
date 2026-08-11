from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.database.core import Base, engine
from src.settings import controller as settings_controller

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Settings API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(settings_controller.router)


@app.get("/")
def root():
    return {"message": "Settings API Running"}