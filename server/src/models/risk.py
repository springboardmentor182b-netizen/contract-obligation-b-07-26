from sqlalchemy import Column, Integer, String
from app.config.database import Base


class Risk(Base):

    __tablename__ = "risk"

    id = Column(Integer, primary_key=True, index=True)

    risk_name = Column(String(200))

    department = Column(String(100))

    severity = Column(String(50))

    status = Column(String(50))

    owner = Column(String(100))
