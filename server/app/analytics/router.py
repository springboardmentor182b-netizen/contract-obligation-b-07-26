from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.security import get_current_user
from app.analytics import schemas, services

router = APIRouter(prefix="/analytics", tags=["analytics"])


@router.get("/overview", response_model=schemas.OverviewResponse)
def read_overview(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return services.get_overview(db)


@router.get("/growth-trend", response_model=schemas.GrowthTrendResponse)
def read_growth_trend(
    range: str = Query(default="3M"), db: Session = Depends(get_db), current_user=Depends(get_current_user)
):
    return services.get_growth_trend(db, range)


@router.get("/performance-metrics", response_model=schemas.PerformanceMetricsResponse)
def read_performance_metrics(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return services.get_performance_metrics(db)


@router.get("/department-performance", response_model=schemas.DepartmentPerformanceResponse)
def read_department_performance(db: Session = Depends(get_db), current_user=Depends(get_current_user)):
    return services.get_department_performance(db)


@router.get("/recent-activities", response_model=schemas.RecentActivitiesResponse)
def read_recent_activities(
    limit: int = Query(default=5, ge=1, le=50), db: Session = Depends(get_db), current_user=Depends(get_current_user)
):
    return services.get_recent_activities(db, limit)
