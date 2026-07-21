from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from app.dashboard.router import router as dashboard_router
from app.users.router import router as users_router
from app.database import engine

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
    "http://localhost:3000",
    "http://localhost:3001",
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


@app.get("/dashboard")
def dashboard():
    with engine.connect() as connection:
        result = connection.execute(text("""
            SELECT
                compliance_score,
                high_risk,
                pending_review,
                compliant
            FROM dashboard
            LIMIT 1
        """))

        row = result.fetchone()

        if row is None:
            return {
                "compliance_score": 0,
                "high_risk": 0,
                "pending_reviews": 0,
                "compliant": 0,
            }

        return {
            "compliance_score": row[0],
            "high_risk": row[1],
            "pending_reviews": row[2],
            "compliant": row[3],
        }