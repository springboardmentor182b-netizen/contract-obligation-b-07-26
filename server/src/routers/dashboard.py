from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.database.core import get_db
from src.entities.dashboard import (
    DashboardMetric,
    Department,
    RiskTrend,
    Audit,
    Risk,
)

router = APIRouter()


@router.get("/dashboard/metrics")
def get_metrics(db: Session = Depends(get_db)):

    metric = db.query(DashboardMetric).order_by(DashboardMetric.id.desc()).first()

    if metric is None:
        return {"message": "No data found"}

    return {
        "overallCompliance": metric.overall_compliance,
        "missedDeadlines": metric.missed_deadlines,
        "riskFlags": metric.risk_flags,
        "auditsCompleted": metric.audits_completed
    }



@router.get("/dashboard/departments")
def get_departments(db: Session = Depends(get_db)):
    return [
        {
            "department": d.department,
            "score": d.score,
        }
        for d in db.query(Department).all()
    ]


@router.get("/dashboard/risk-trend")
def get_risk_trend(db: Session = Depends(get_db)):

    return [
        {
            "month": r.month,
            "low": r.low,
            "medium": r.medium,
            "high": r.high,
        }
        for r in db.query(RiskTrend).all()
    ]
@router.get("/dashboard/audits")
def get_audits(db: Session = Depends(get_db)):
    return [
        {
            "audit": a.audit,
            "department": a.department,
            "auditor": a.auditor,
            "status": a.status,
            "score": a.score,
        }
        for a in db.query(Audit).all()
    ]


@router.get("/dashboard/risks")
def get_risks(db: Session = Depends(get_db)):
    return [
        {
            "title": r.title,
            "level": r.level,
            "count": r.count,
        }
        for r in db.query(Risk).all()
    ]