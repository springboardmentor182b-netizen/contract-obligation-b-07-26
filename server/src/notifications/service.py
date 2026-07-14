from sqlalchemy.orm import Session
from src.entities import Notification
from src.notifications.models import NotificationCreate, NotificationUpdate


class NotificationService:
    def __init__(self, db: Session):
        self.db = db

    def get_all_notifications(self, user_id: int, is_read: bool = None):
        query = self.db.query(Notification).filter(Notification.user_id == user_id)
        
        if is_read is not None:
            query = query.filter(Notification.is_read == is_read)
        
        notifications = query.order_by(Notification.created_at.desc()).all()
        return notifications

    def get_notification_by_id(self, notification_id: int):
        notification = self.db.query(Notification).filter(Notification.id == notification_id).first()
        return notification

    def create_notification(self, notification_data: NotificationCreate):
        notification = Notification(**notification_data.model_dump())
        self.db.add(notification)
        self.db.commit()
        self.db.refresh(notification)
        return notification

    def mark_as_read(self, notification_id: int):
        notification = self.db.query(Notification).filter(Notification.id == notification_id).first()
        if not notification:
            return None
        
        notification.is_read = True
        self.db.commit()
        self.db.refresh(notification)
        return notification

    def mark_all_as_read(self, user_id: int):
        self.db.query(Notification).filter(
            Notification.user_id == user_id,
            Notification.is_read == False
        ).update({"is_read": True})
        self.db.commit()
        return {"message": "All notifications marked as read"}
