from fastapi import APIRouter, Depends

from sqlalchemy.orm import Session

from src.sql_database import get_db

from src.services.kpi_service import get_dashboard_kpis


router = APIRouter(

    prefix="/dashboard",

    tags=["Dashboard"]

)


@router.get("/kpis")

def dashboard_kpis(

    db: Session = Depends(get_db)

):

    return get_dashboard_kpis(db)
