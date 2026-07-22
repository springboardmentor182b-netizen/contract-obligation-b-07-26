from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.obligations import router as obligations_router

app = FastAPI(
    title="ContractIQ Obligation Tracker API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    "http://localhost:3000",
    "http://localhost:3001",
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    obligations_router,
    prefix="/api/obligations",
    tags=["Obligations"],
)


@app.get("/health")
def health_check():
    return {"status": "ok"}
