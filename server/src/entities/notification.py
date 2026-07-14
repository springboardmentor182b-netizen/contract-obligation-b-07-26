from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, ForeignKey, Enum
from sqlalchemy.sql import func
from src.database.core import Base
import enum


class NotificationType(enum.Enum):
    CONTRACT_CREATED = "Contract Created"
    CONTRACT_UPDATED = "Contract Updated"
    CONTRACT_APPROVED = "Contract Approved"
    CONTRACT_REJECTED = "Contract Rejected"
    CONTRACT_EXPIRED = "Contract Expired"
    OBLIGATION_DUE = "Obligation Due"
    RENEWAL_REQUESTED = "Renewal Requested"
    COMPLIANCE_ALERT = "Compliance Alert"
    ASSIGNMENT = "Assignment"


class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    type = Column(Enum(NotificationType), nullable=False)
    title = Column(String, nullable=False)
    message = Column(Text, nullable=False)
    contract_id = Column(Integer, ForeignKey("contracts.id"))
    is_read = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
