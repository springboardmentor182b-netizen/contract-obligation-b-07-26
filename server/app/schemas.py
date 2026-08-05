from pydantic import BaseModel


class Notification(BaseModel):
    id: int
    title: str
    message: str
    type: str

    class Config:
        from_attributes = True


class NotificationStats(BaseModel):
    total_notifications: int
    unread: int
    email_alerts: int
    sms_alerts: int

    class Config:
        from_attributes = True

class NotificationActivity(BaseModel):
    day: str
    alerts_sent: int

    class Config:
        from_attributes = True


class NotificationPreference(BaseModel):
    channel: str
    sent_count: str
    enabled: bool

    class Config:
        from_attributes = True