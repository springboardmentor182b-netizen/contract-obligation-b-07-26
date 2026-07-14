from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, ForeignKey, Enum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from src.database.core import Base
import enum


class ComplianceStatus(enum.Enum):
    COMPLIANT = "Compliant"
    NON_COMPLIANT = "Non-Compliant"
    PENDING_REVIEW = "Pending Review"
    EXEMPT = "Exempt"


class ComplianceRecord(Base):
    __tablename__ = "compliance_records"

    id = Column(Integer, primary_key=True, autoincrement=True)
    contract_id = Column(Integer, ForeignKey("contracts.id"), nullable=False)
    requirement = Column(String, nullable=False)
    status = Column(Enum(ComplianceStatus), default=ComplianceStatus.PENDING_REVIEW, nullable=False)
    due_date = Column(DateTime)
    completed_date = Column(DateTime)
    reviewed_by = Column(Integer, ForeignKey("users.id"))
    notes = Column(Text)
    evidence_file = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationships
    contract = relationship("Contract", back_populates="compliance_records")
