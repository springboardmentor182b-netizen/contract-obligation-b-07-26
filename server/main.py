from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "FastAPI is working!"}

@app.get("/dashboard")
def dashboard():
    return {
        "compliance_score": 95,
        "high_risk": 20,
        "pending_reviews": 34,
        "compliant": 198
    }