from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from src.database.session import engine, Base
from src.routers import settings

app = FastAPI(title="Settings Module API")

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create database tables
Base.metadata.create_all(bind=engine)

# Register routers
app.include_router(settings.router, prefix="/settings", tags=["settings"])

@app.get("/")
def root():
    return {"message": "Settings Module API Running"}

@app.get("/health")
def health():
    return {"status": "ok"}
