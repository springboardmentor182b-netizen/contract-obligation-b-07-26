from sqlalchemy.orm import Session
from .models import (
    Notification,
    NotificationStats,
    NotificationActivity,
    NotificationPreference,
)


def get_notifications(db: Session):
    return db.query(Notification).all()


def get_notification_stats(db: Session):
    return db.query(NotificationStats).first()

def get_notification_activity(db: Session):
    return db.query(NotificationActivity).all()


def get_notification_preferences(db: Session):
    return db.query(NotificationPreference).all()