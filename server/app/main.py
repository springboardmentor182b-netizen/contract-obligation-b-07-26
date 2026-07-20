from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from database import engine

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
    "http://localhost:3000",
    "http://localhost:3001",
],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "FastAPI is working!"}


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
                "compliant": 0
            }

        return {
            "compliance_score": row[0],
            "high_risk": row[1],
            "pending_reviews": row[2],
            "compliant": row[3]
        }