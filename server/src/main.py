from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.api import api_router

app = FastAPI(title="Renewal Dashboard API")

# CRITICAL: This allows your React frontend to fetch data without getting blocked
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allowing all origins for today to ensure it works instantly
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Connects your API routes to the main app
app.include_router(api_router, prefix="/api")

@app.get("/")
def root():
    return {"message": "Backend is up and running!"}