from fastapi import FastAPI

from src.database.core import Base, engine

from src.renewals.models import Renewal
from src.renewals.controller import router as renewal_router


app = FastAPI(title="ContractIQ Backend")


Base.metadata.create_all(bind=engine)


app.include_router(renewal_router)


@app.get("/")
def home():
    return {
        "message": "ContractIQ Backend Running Successfully"
    }