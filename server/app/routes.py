from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from .database import get_db
from . import crud, schemas

router = APIRouter()


@router.get("/notifications", response_model=list[schemas.Notification])
def get_notifications(db: Session = Depends(get_db)):
    return crud.get_notifications(db)


@router.get("/notification-stats", response_model=schemas.NotificationStats)
def get_notification_stats(db: Session = Depends(get_db)):
    return crud.get_notification_stats(db)


@router.get("/notification-activity", response_model=list[schemas.NotificationActivity])
def get_notification_activity(db: Session = Depends(get_db)):
    return crud.get_notification_activity(db)


@router.get("/notification-preferences", response_model=list[schemas.NotificationPreference])
def get_notification_preferences(db: Session = Depends(get_db)):
    return crud.get_notification_preferences(db)