from sqlalchemy import Column, Integer, String, Float, Date, DateTime
from database import Base

# Your existing Contract model
class Contract(Base):
    __tablename__ = "contracts"
    id = Column(Integer, primary_key=True, index=True)
    contract_id = Column(String, index=True)
    contract_name = Column(String)
    counterparty = Column(String)
    status = Column(String)
    owner = Column(String)
    value = Column(Float)       
    due_date = Column(Date)     
    priority = Column(String)
    category = Column(String)

# NEW: The Audit Log model
class AuditLog(Base):
    __tablename__ = "audit_logs"
    id = Column(Integer, primary_key=True, index=True)
    log_id = Column(String, index=True)
    user_name = Column(String)
    user_initials = Column(String)
    action = Column(String)
    module = Column(String)
    ip_address = Column(String)
    severity = Column(String)
    timestamp = Column(DateTime)