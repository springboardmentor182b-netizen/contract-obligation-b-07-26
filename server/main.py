from fastapi import FastAPI

from src.dashboard.controller import router as dashboard_router

app = FastAPI(
    title="Contract Management API",
    version="1.0.0"
)

app.include_router(dashboard_router)


@app.get("/")
def hello_world():
    return {"message": "Contract Management API is running"}