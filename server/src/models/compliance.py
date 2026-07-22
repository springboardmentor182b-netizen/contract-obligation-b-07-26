from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.sql import func

from app.config.database import Base


class Compliance(Base):

    __tablename__ = "compliance"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(200), nullable=False)

    department = Column(String(100), nullable=False)

    status = Column(String(50), nullable=False)

    compliance_score = Column(Float)

    risk_level = Column(String(50))

    created_at = Column(DateTime(timezone=True), server_default=func.now())
