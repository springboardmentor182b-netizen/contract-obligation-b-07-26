from sqlalchemy import Column, Integer, String, Float, DateTime
from datetime import datetime

from src.database.session import Base


class Contract(Base):
    __tablename__ = "contracts"

    id = Column(Integer, primary_key=True, index=True)
    contract_id = Column(String, unique=True, index=True, nullable=False)
    category = Column(String, nullable=False)
    name = Column(String, nullable=False)
    party = Column(String, nullable=False)
    department = Column(String, nullable=False)
    status = Column(String, nullable=False)
    value = Column(Float)
    expiry = Column(DateTime)
    version = Column(String, default="v1.0")
    created_at = Column(DateTime, default=datetime.utcnow)