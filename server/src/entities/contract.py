from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, ForeignKey, Enum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from src.database.core import Base
import enum


class ContractStatus(enum.Enum):
    DRAFT = "Draft"
    UNDER_REVIEW = "Under Review"
    APPROVED = "Approved"
    ACTIVE = "Active"
    EXPIRED = "Expired"
    TERMINATED = "Terminated"


class ContractCategory(enum.Enum):
    EMPLOYMENT = "Employment Contracts"
    VENDOR = "Vendor Contracts"
    SERVICE = "Service Agreements"
    LEASE = "Lease Agreements"
    PURCHASE = "Purchase Agreements"
    PARTNERSHIP = "Partnership Agreements"
    CONFIDENTIALITY = "Confidentiality Agreements"


class Contract(Base):
    __tablename__ = "contracts"

    id = Column(Integer, primary_key=True, autoincrement=True)
    contract_number = Column(String, unique=True, nullable=False)
    title = Column(String, nullable=False)
    description = Column(Text)
    category = Column(Enum(ContractCategory), nullable=False)
    status = Column(Enum(ContractStatus), default=ContractStatus.DRAFT, nullable=False)
    start_date = Column(DateTime)
    end_date = Column(DateTime)
    value = Column(String)
    owner_id = Column(Integer, ForeignKey("users.id"))
    creator_id = Column(Integer, ForeignKey("users.id"))
    is_archived = Column(Boolean, default=False, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    # Relationships
    versions = relationship("ContractVersion", back_populates="contract", cascade="all, delete-orphan")
    obligations = relationship("Obligation", back_populates="contract", cascade="all, delete-orphan")
    renewals = relationship("Renewal", back_populates="contract", cascade="all, delete-orphan")
    compliance_records = relationship("ComplianceRecord", back_populates="contract", cascade="all, delete-orphan")
    activities = relationship("Activity", back_populates="contract", cascade="all, delete-orphan")


class ContractVersion(Base):
    __tablename__ = "contract_versions"

    id = Column(Integer, primary_key=True, autoincrement=True)
    contract_id = Column(Integer, ForeignKey("contracts.id"), nullable=False)
    version_number = Column(String, nullable=False)
    file_path = Column(String, nullable=False)
    file_size = Column(String)
    uploaded_by = Column(Integer, ForeignKey("users.id"))
    upload_date = Column(DateTime(timezone=True), server_default=func.now())
    is_current = Column(Boolean, default=False, nullable=False)
    notes = Column(Text)

    # Relationships
    contract = relationship("Contract", back_populates="versions")
