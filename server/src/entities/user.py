from sqlalchemy import Column, Integer, String, Boolean, DateTime, Enum
from sqlalchemy.sql import func
from src.database.core import Base
import enum

class UserRole(str, enum.Enum):
    ADMINISTRATOR = "Administrator"
    LEGAL_MANAGER = "Legal Manager"
    COMPLIANCE_OFFICER = "Compliance Officer"
    CONTRACT_MANAGER = "Contract Manager"
    DEPARTMENT_HEAD = "Department Head"
    EMPLOYEE = "Employee"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    role = Column(Enum(UserRole), default=UserRole.EMPLOYEE, nullable=False)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    def __repr__(self):
        return f"<User {self.email}>"
