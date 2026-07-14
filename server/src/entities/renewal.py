from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, ForeignKey, Enum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from src.database.core import Base
import enum


class RenewalStatus(enum.Enum):
    PENDING = "Pending"
    UNDER_REVIEW = "Under Review"
    APPROVED = "Approved"
    REJECTED = "Rejected"
    COMPLETED = "Completed"


class Renewal(Base):
    __tablename__ = "renewals"

    id = Column(Integer, primary_key=True, autoincrement=True)
    contract_id = Column(Integer, ForeignKey("contracts.id"), nullable=False)
    renewal_date = Column(DateTime, nullable=False)
    new_end_date = Column(DateTime)
    status = Column(Enum(RenewalStatus), default=RenewalStatus.PENDING, nullable=False)
    terms = Column(Text)
    value = Column(String)
    requested_by = Column(Integer, ForeignKey("users.id"))
    approved_by = Column(Integer, ForeignKey("users.id"))
    notes = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationships
    contract = relationship("Contract", back_populates="renewals")
