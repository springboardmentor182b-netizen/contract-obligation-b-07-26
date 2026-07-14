from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from src.database.core import Base


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, nullable=False)
    action = Column(String, nullable=False)
    entity_type = Column(String, nullable=False)
    entity_id = Column(Integer, nullable=False)
    changes = Column(Text)
    ip_address = Column(String)
    user_agent = Column(String)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
