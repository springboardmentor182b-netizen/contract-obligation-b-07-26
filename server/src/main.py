from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.database.core import Base, engine, SessionLocal
from src.database.seed import seed_if_empty
from src.api import register_routes
from src.exceptions import register_exception_handlers
from src.logging import configure_logging

configure_logging()

app = FastAPI(title="ContractIQ API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

register_exception_handlers(app)
register_routes(app)


@app.on_event("startup")
def on_startup():
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        seed_if_empty(db)
    finally:
        db.close()


@app.get("/api/health")
def health_check():
    return {"status": "ok"}
