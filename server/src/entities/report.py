from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Enum
from sqlalchemy.sql import func
from src.database.core import Base
import enum


class ReportType(enum.Enum):
    CONTRACT_SUMMARY = "Contract Summary"
    COMPLIANCE_REPORT = "Compliance Report"
    OBLIGATION_REPORT = "Obligation Report"
    RENEWAL_REPORT = "Renewal Report"
    ACTIVITY_REPORT = "Activity Report"


class Report(Base):
    __tablename__ = "reports"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    type = Column(Enum(ReportType), nullable=False)
    generated_by = Column(Integer, ForeignKey("users.id"), nullable=False)
    parameters = Column(Text)
    file_path = Column(String)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
