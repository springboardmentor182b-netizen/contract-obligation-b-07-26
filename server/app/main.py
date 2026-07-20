from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.dashboard.router import router as dashboard_router
from app.users.router import router as users_router

app = FastAPI(
    title="ContractIQ API",
    version="1.0.0",
    description="Backend API for the ContractIQ Contract Obligation Tracking Assistant"
)

origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(dashboard_router)
app.include_router(users_router)

@app.get("/")
def home():
    return {"message": "ContractIQ Backend Running"}