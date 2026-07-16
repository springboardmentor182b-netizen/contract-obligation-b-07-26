from sqlalchemy import Column, Integer, String, Float, DateTime
from src.database.session import Base
from datetime import datetime

class Contract(Base):
    __tablename__ = "contracts"

    id = Column(Integer, primary_key=True, index=True)
    contract_id = Column(String, unique=True, index=True)
    name = Column(String, index=True)
    party = Column(String)
    department = Column(String)
    status = Column(String)
    value = Column(Float, nullable=True)
    expiry = Column(DateTime, nullable=True)
    version = Column(String, default="v1.0")
    created_at = Column(DateTime, default=datetime.utcnow)
