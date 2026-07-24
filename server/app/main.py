from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
<<<<<<< HEAD
from pydantic import BaseModel
from sqlalchemy import text

from app.database import Base, engine
from app.models.user import User
from app.dashboard.router import router as dashboard_router
from app.users.router import router as users_router

# Create all database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="ContractIQ API",
    version="1.0.0",
    description="Backend API for the ContractIQ Contract Obligation Tracking Assistant",
)

origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
    "http://localhost:3000",
    "http://localhost:3001",
]
=======

from app.database import engine
from app.contracts import models
from app.contracts.router import router as contracts_router

# Create database tables automatically
models.Base.metadata.create_all(bind=engine)
>>>>>>> origin/main-group-B

app = FastAPI(title="ContractIQ API")

# Allow React to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
<<<<<<< HEAD
    allow_origins=origins,
=======
    allow_origins=["*"],
>>>>>>> origin/main-group-B
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

<<<<<<< HEAD
# Register routers
app.include_router(dashboard_router)
app.include_router(users_router)


class ContractCreate(BaseModel):
    title: str
    contract_type: str
    department: str
    status: str
    start_date: str
    end_date: str


@app.get("/")
def home():
    return {
        "message": "ContractIQ Backend Running"
    }


@app.get("/dashboard")
def dashboard():
    with engine.connect() as conn:

        total_contracts = conn.execute(
            text("SELECT COUNT(*) FROM contracts")
        ).scalar()

        active_contracts = conn.execute(
            text("SELECT COUNT(*) FROM contracts WHERE status = 'Active'")
        ).scalar()

        pending_obligations = conn.execute(
            text("SELECT COUNT(*) FROM obligations WHERE status = 'Pending'")
        ).scalar()

        upcoming_renewals = conn.execute(
            text("SELECT COUNT(*) FROM renewals WHERE status = 'Upcoming'")
        ).scalar()

        unread_notifications = conn.execute(
            text("SELECT COUNT(*) FROM notifications WHERE status = 'Unread'")
        ).scalar()

        return {
            "total_contracts": total_contracts,
            "active_contracts": active_contracts,
            "pending_obligations": pending_obligations,
            "upcoming_renewals": upcoming_renewals,
            "unread_notifications": unread_notifications
        }


@app.get("/contracts")
def get_contracts():
    with engine.connect() as conn:
        result = conn.execute(
            text("""
                SELECT *
                FROM contracts
                ORDER BY id
            """)
        )

        contracts = []

        for row in result:
            contracts.append(dict(row._mapping))

        return contracts


@app.post("/contracts")
def create_contract(contract: ContractCreate):
    with engine.begin() as conn:
        conn.execute(
            text("""
                INSERT INTO contracts
                (
                    title,
                    contract_type,
                    department,
                    status,
                    start_date,
                    end_date
                )
                VALUES
                (
                    :title,
                    :contract_type,
                    :department,
                    :status,
                    :start_date,
                    :end_date
                )
            """),
            {
                "title": contract.title,
                "contract_type": contract.contract_type,
                "department": contract.department,
                "status": contract.status,
                "start_date": contract.start_date,
                "end_date": contract.end_date,
            }
        )

    return {
        "message": "Contract created successfully"
    }
=======
# Include the modular routes
app.include_router(contracts_router)
>>>>>>> origin/main-group-B
