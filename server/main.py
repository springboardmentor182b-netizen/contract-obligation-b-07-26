from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

app = FastAPI(title="ContractIQ API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Obligation(BaseModel):
    id: str
    obligation: str
    contract: str
    owner: str
    priority: str
    status: str
    dueDate: str
    description: str = ""


obligations: List[Obligation] = [
    Obligation(
        id="OBL-001",
        obligation="Review Vendor Contract",
        contract="Vendor Agreement",
        owner="John Smith",
        priority="High",
        status="Pending",
        dueDate="2026-07-20",
        description="Review legal clauses",
    )
]


@app.get("/")
def home():
    return {"message": "ContractIQ API Running"}


@app.get("/obligations")
def get_obligations():
    return obligations


@app.post("/obligations")
def add_obligation(obligation: Obligation):
    obligations.append(obligation)
    return {
        "message": "Obligation added successfully",
        "data": obligation,
    }
@app.put("/obligations/{obligation_id}")
def update_obligation(obligation_id: str, updated: Obligation):
    for index, item in enumerate(obligations):
        if item.id == obligation_id:
            obligations[index] = updated
            return {
                "message": "Obligation updated successfully",
                "data": updated,
            }

    raise HTTPException(status_code=404, detail="Obligation not found")


@app.delete("/obligations/{obligation_id}")
def delete_obligation(obligation_id: str):
    for index, item in enumerate(obligations):
        if item.id == obligation_id:
            deleted = obligations.pop(index)
            return {
                "message": "Obligation deleted successfully",
                "data": deleted,
            }

    raise HTTPException(status_code=404, detail="Obligation not found")