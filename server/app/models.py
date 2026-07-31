from sqlalchemy import Column, Integer, String, Text, Boolean
from .database import Base


class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255))
    message = Column(Text)
    type = Column(String(50))


class NotificationStats(Base):
    __tablename__ = "notification_stats"

    id = Column(Integer, primary_key=True, index=True)
    total_notifications = Column(Integer)
    unread = Column(Integer)
    email_alerts = Column(Integer)
    sms_alerts = Column(Integer)

class NotificationActivity(Base):
    __tablename__ = "notification_activity"

    id = Column(Integer, primary_key=True, index=True)
    day = Column(String(10))
    alerts_sent = Column(Integer)


class NotificationPreference(Base):
    __tablename__ = "notification_preferences"

    id = Column(Integer, primary_key=True, index=True)
    channel = Column(String(50))
    sent_count = Column(String(30))
    enabled = Column(Boolean)