from sqlalchemy import Column, Integer, String, Date
from app.config.database import Base


class History(Base):

    __tablename__ = "history"

    id = Column(Integer, primary_key=True, index=True)

    activity = Column(String(300))

    department = Column(String(100))

    status = Column(String(50))

    activity_date = Column(Date)
