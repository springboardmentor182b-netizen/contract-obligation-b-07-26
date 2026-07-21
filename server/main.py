from pydantic import BaseModel, Field, field_validator
from src.database.core import get_connection
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

    obligation: str = Field(..., min_length=3)
    contract: str = Field(..., min_length=3)
    owner: str = Field(..., min_length=2)

    priority: str
    status: str

    dueDate: str

    description: str = ""

    @field_validator("priority")
    @classmethod
    def validate_priority(cls, value):
        allowed = ["High", "Medium", "Low"]
        if value not in allowed:
            raise ValueError("Priority must be High, Medium or Low")
        return value

    @field_validator("status")
    @classmethod
    def validate_status(cls, value):
        allowed = ["Pending", "In Progress", "Completed"]
        if value not in allowed:
            raise ValueError("Status must be Pending, In Progress or Completed")
        return value


# obligations: List[Obligation] = [
#     Obligation(
#         id="OBL-001",
#         obligation="Review Vendor Contract",
#         contract="Vendor Agreement",
#         owner="John Smith",
#         priority="High",
#         status="Pending",
#         dueDate="2026-07-20",
#         description="Review legal clauses",
#     )
# ]


@app.get("/")
def home():
    return {"message": "ContractIQ API Running"}


@app.get("/obligations")
def get_obligations():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT id, obligation, contract, owner,
               priority, status, due_date, description
        FROM obligations
    """)

    rows = cursor.fetchall()

    cursor.close()
    conn.close()

    return [
        {
            "id": row[0],
            "obligation": row[1],
            "contract": row[2],
            "owner": row[3],
            "priority": row[4],
            "status": row[5],
            "dueDate": str(row[6]),
            "description": row[7],
        }
        for row in rows
    ]

@app.get("/obligations/stats")
def get_obligation_stats():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        SELECT
            COUNT(*) AS total,
            COUNT(*) FILTER (WHERE status = 'Pending') AS pending,
            COUNT(*) FILTER (WHERE status = 'In Progress') AS progress,
            COUNT(*) FILTER (WHERE status = 'Completed') AS completed,
            COUNT(*) FILTER (WHERE due_date < CURRENT_DATE AND status != 'Completed') AS overdue,
            COUNT(*) FILTER (WHERE priority = 'High') AS risk,
            COUNT(*) FILTER (WHERE due_date = CURRENT_DATE) AS due
        FROM obligations;
    """)

    row = cursor.fetchone()

    total = row[0] or 0
    completed = row[3] or 0

    compliance = (
        round((completed / total) * 100)
        if total > 0 else 0
    )

    cursor.close()
    conn.close()

    return {
        "total": total,
        "pending": row[1] or 0,
        "progress": row[2] or 0,
        "completed": completed,
        "overdue": row[4] or 0,
        "risk": row[5] or 0,
        "due": row[6] or 0,
        "compliance": compliance
    }


@app.post("/obligations")
def add_obligation(obligation: Obligation):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        INSERT INTO obligations
        (id, obligation, contract, owner, priority, status, due_date, description)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """,
        (
            obligation.id,
            obligation.obligation,
            obligation.contract,
            obligation.owner,
            obligation.priority,
            obligation.status,
            obligation.dueDate,
            obligation.description,
        ),
    )

    conn.commit()
    cursor.close()
    conn.close()

    return {
        "message": "Obligation added successfully",
        "data": obligation,
    }


@app.put("/obligations/{obligation_id}")
def update_obligation(obligation_id: str, updated: Obligation):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        """
        UPDATE obligations
        SET obligation=%s,
            contract=%s,
            owner=%s,
            priority=%s,
            status=%s,
            due_date=%s,
            description=%s
        WHERE id=%s
        """,
        (
            updated.obligation,
            updated.contract,
            updated.owner,
            updated.priority,
            updated.status,
            updated.dueDate,
            updated.description,
            obligation_id,
        ),
    )

    conn.commit()

    if cursor.rowcount == 0:
        cursor.close()
        conn.close()
        raise HTTPException(status_code=404, detail="Obligation not found")

    cursor.close()
    conn.close()

    return {
        "message": "Obligation updated successfully",
        "data": updated,
    }


@app.delete("/obligations/{obligation_id}")
def delete_obligation(obligation_id: str):
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute(
        "DELETE FROM obligations WHERE id = %s",
        (obligation_id,)
    )

    conn.commit()

    if cursor.rowcount == 0:
        cursor.close()
        conn.close()
        raise HTTPException(status_code=404, detail="Obligation not found")

    cursor.close()
    conn.close()

    return {
        "message": "Obligation deleted successfully"
    }