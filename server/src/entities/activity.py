from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Enum
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from src.database.core import Base
import enum


class ActivityType(enum.Enum):
    CREATED = "Created"
    UPDATED = "Updated"
    DELETED = "Deleted"
    APPROVED = "Approved"
    REJECTED = "Rejected"
    ARCHIVED = "Archived"
    RESTORED = "Restored"
    VERSION_UPLOADED = "Version Uploaded"
    STATUS_CHANGED = "Status Changed"
    ASSIGNED = "Assigned"


class Activity(Base):
    __tablename__ = "activities"

    id = Column(Integer, primary_key=True, autoincrement=True)
    contract_id = Column(Integer, ForeignKey("contracts.id"))
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    type = Column(Enum(ActivityType), nullable=False)
    description = Column(Text, nullable=False)
    changes = Column(Text)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    # Relationships
    contract = relationship("Contract", back_populates="activities")
