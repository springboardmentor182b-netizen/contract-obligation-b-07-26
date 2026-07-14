from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.database.core import get_db
from src.notifications.service import NotificationService
from src.notifications.models import NotificationCreate, NotificationUpdate, NotificationResponse

router = APIRouter(prefix="/notifications", tags=["notifications"])


def get_notification_service(db: Session = Depends(get_db)):
    return NotificationService(db)


@router.get("/", response_model=list[NotificationResponse])
def get_all_notifications(
    user_id: int,
    is_read: bool = None,
    service: NotificationService = Depends(get_notification_service)
):
    return service.get_all_notifications(user_id, is_read)


@router.get("/{notification_id}", response_model=NotificationResponse)
def get_notification(notification_id: int, service: NotificationService = Depends(get_notification_service)):
    notification = service.get_notification_by_id(notification_id)
    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found")
    return notification


@router.post("/", response_model=NotificationResponse)
def create_notification(notification_data: NotificationCreate, service: NotificationService = Depends(get_notification_service)):
    return service.create_notification(notification_data)


@router.put("/{notification_id}/read", response_model=NotificationResponse)
def mark_as_read(notification_id: int, service: NotificationService = Depends(get_notification_service)):
    notification = service.mark_as_read(notification_id)
    if not notification:
        raise HTTPException(status_code=404, detail="Notification not found")
    return notification


@router.put("/read-all")
def mark_all_as_read(user_id: int, service: NotificationService = Depends(get_notification_service)):
    return service.mark_all_as_read(user_id)
