from sqlalchemy import Column, Integer, String, Date
from app.config.database import Base


class MissedObligation(Base):

    __tablename__ = "missed_obligation"

    id = Column(Integer, primary_key=True, index=True)

    obligation_name = Column(String(200))
    
    contract = Column(String(100))

    department = Column(String(100))

    owner = Column(String(100))

    due_date = Column(Date)

    missed_days = Column(Integer)

    priority = Column(String(30))

    status = Column(String(30))
