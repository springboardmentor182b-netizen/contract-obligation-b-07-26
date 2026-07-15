from sqlalchemy import Column, Integer, String, Date
from app.config.database import Base

class Obligation(Base):

    __tablename__ = "obligations"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(255), nullable=False)

    department = Column(String(100), nullable=False)

    owner = Column(String(100), nullable=False)

    due_date = Column(Date)

    priority = Column(String(30))

    status = Column(String(30))
