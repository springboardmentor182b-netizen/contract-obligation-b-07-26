from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.routers.dashboard import router as dashboard_router


app = FastAPI()


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


@app.get("/")
def hello_world():

    return {
        "Hello": "World"
    }