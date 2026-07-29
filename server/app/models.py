from sqlalchemy import Column, Integer, String, Text
from .database import Base

class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255))
    message = Column(Text)
    type = Column(String(50))