from sqlalchemy import Column, Date, Integer, String

from app.database import Base


class Obligation(Base):
    __tablename__ = "obligations"

    id = Column(Integer, primary_key=True, index=True)
    obligation = Column(String(150), nullable=False)
    contract = Column(String(120), nullable=False)
    priority = Column(String(20), nullable=False)
    status = Column(String(20), nullable=False)
    due_date = Column(Date, nullable=False)
    owner = Column(String(100), nullable=False)
    progress = Column(Integer, nullable=False, default=0)