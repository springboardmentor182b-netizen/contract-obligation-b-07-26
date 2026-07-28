from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from sqlalchemy import or_
from typing import Optional
import models
import schemas
from database import engine, get_db

# Connect to database and build tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Add CORS middleware to allow React to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/contracts/", response_model=schemas.ContractResponse)
def create_contract(contract: schemas.ContractBase, db: Session = Depends(get_db)):
    db_contract = models.Contract(**contract.model_dump())
    db.add(db_contract)
    db.commit()
    db.refresh(db_contract)
    return db_contract

@app.get("/contracts/", response_model=list[schemas.ContractResponse])
def get_contracts(db: Session = Depends(get_db)):
    contracts = db.query(models.Contract).all()
    return contracts

@app.post("/audit-logs/", response_model=schemas.AuditLogResponse)
def create_audit_log(log: schemas.AuditLogBase, db: Session = Depends(get_db)):
    db_log = models.AuditLog(**log.model_dump())
    db.add(db_log)
    db.commit()
    db.refresh(db_log)
    return db_log

@app.get("/audit-logs/", response_model=list[schemas.AuditLogResponse])
def get_audit_logs(
    db: Session = Depends(get_db),
    search: Optional[str] = None,
    severity: Optional[str] = None
):
    query = db.query(models.AuditLog)

    if search:
        query = query.filter(
            or_(
                models.AuditLog.log_id.ilike(f"%{search}%"),
                models.AuditLog.user_name.ilike(f"%{search}%"),
                models.AuditLog.action.ilike(f"%{search}%")
            )
        )
    
    if severity:
        query = query.filter(models.AuditLog.severity == severity)

    return query.all()

@app.get("/audit-stats/")
def get_audit_stats(db: Session = Depends(get_db)):
    total_logs = db.query(models.AuditLog).count()
    critical_events = db.query(models.AuditLog).filter(models.AuditLog.severity == "Critical").count()
    failed_logins = db.query(models.AuditLog).filter(models.AuditLog.action.ilike("%failed login%")).count()
    
    return {
        "total_logs": total_logs,
        "security_events": critical_events,
        "failed_logins": failed_logins,
        "user_activities": 0
    }

@app.delete("/audit-logs/clear")
def clear_audit_logs(db: Session = Depends(get_db)):
    db.query(models.AuditLog).delete()
    db.commit()
    return {"message": "All database logs have been deleted!"}

@app.get("/system-metrics/")
def get_system_metrics(db: Session = Depends(get_db)):
    return {
        "chart_data": [
            {"day": "Mon", "events": 0, "failures": 0},
            {"day": "Tue", "events": 0, "failures": 0},
            {"day": "Wed", "events": 0, "failures": 0},
            {"day": "Thu", "events": 0, "failures": 0},
            {"day": "Fri", "events": 0, "failures": 0},
            {"day": "Sat", "events": 0, "failures": 0},
            {"day": "Sun", "events": 0, "failures": 0}
        ],
        "monitoring": [
            # Providing the system names so the UI doesn't break, 
            # but setting them to 0% and a neutral gray color (#9ca3af)
            {"name": "API Server", "status": "0%", "color": "#9ca3af"},
            {"name": "Database Cluster", "status": "0%", "color": "#9ca3af"},
            {"name": "Authentication Svc", "status": "0%", "color": "#9ca3af"},
            {"name": "Storage Service", "status": "0%", "color": "#9ca3af"},
            {"name": "Notification Engine", "status": "0%", "color": "#9ca3af"}
        ]
    }