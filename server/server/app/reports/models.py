"""
SQLAlchemy models for the Reports module.

ASSUMPTION: app/database.py exposes a declarative `Base` (standard
`sqlalchemy.orm.declarative_base()` pattern) and a `get_db` dependency.
If your team named these differently, adjust the import below.
"""
import enum
import uuid
from datetime import datetime

from sqlalchemy import Column, String, DateTime, Boolean, ForeignKey, Enum, Integer, JSON
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship

from app.database import Base


class ReportType(str, enum.Enum):
    compliance = "compliance"
    contract_summary = "contract-summary"
    obligation = "obligation"
    user_activity = "user-activity"
    audit_trail = "audit-trail"


class ReportFormat(str, enum.Enum):
    pdf = "PDF"
    excel = "Excel"


class ReportStatus(str, enum.Enum):
    ready = "ready"
    processing = "processing"
    failed = "failed"


class ScheduleFrequency(str, enum.Enum):
    daily = "daily"
    weekly = "weekly"
    monthly = "monthly"


class Report(Base):
    """A single generated report, on-demand or produced by a schedule."""

    __tablename__ = "reports"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String, nullable=False)
    type = Column(Enum(ReportType), nullable=False)
    format = Column(Enum(ReportFormat), nullable=False, default=ReportFormat.pdf)
    status = Column(Enum(ReportStatus), nullable=False, default=ReportStatus.processing)
    is_scheduled = Column(Boolean, nullable=False, default=False)
    file_url = Column(String, nullable=True)

    created_by = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)

    downloads = relationship("ReportDownload", back_populates="report", cascade="all, delete-orphan")


class ReportDownload(Base):
    """One row per download — lets us compute 'Downloads' and its monthly delta accurately."""

    __tablename__ = "report_downloads"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    report_id = Column(UUID(as_uuid=True), ForeignKey("reports.id"), nullable=False)
    downloaded_by = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=True)
    downloaded_at = Column(DateTime, nullable=False, default=datetime.utcnow)

    report = relationship("Report", back_populates="downloads")


class ReportSchedule(Base):
    """A recurring export configuration, created via POST /reports/schedule."""

    __tablename__ = "report_schedules"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    report_type = Column(Enum(ReportType), nullable=False)
    frequency = Column(Enum(ScheduleFrequency), nullable=False)
    recipients = Column(JSON, nullable=False, default=list)  # list[str] of emails

    next_run_at = Column(DateTime, nullable=False)
    created_by = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
