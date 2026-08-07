from sqlalchemy import Column, Integer, String, Float, Date
from app.database import Base

class Contract(Base):
    __tablename__ = "contracts"

    # Primary key for the database
    id = Column(Integer, primary_key=True, index=True)
    
    # Combined fields from both of your dashboard screenshots
    contract_id = Column(String, unique=True, index=True)  # e.g., CTR-001
    contract_name = Column(String, index=True)             # e.g., Enterprise SaaS Agreement
    counterparty = Column(String)                          # e.g., Nexus Technologies
    status = Column(String)                                # e.g., Active, Draft, In Review
    owner = Column(String)                                 # e.g., P. Nair
    value = Column(Float)                                  # e.g., 420000
    due_date = Column(Date)                                # e.g., 2026-12-31
    priority = Column(String)                              # e.g., High, Medium, Low
    category = Column(String)                              # e.g., Services, Technology
    version = Column(String)                               # e.g., v3.2
    file_size = Column(String)                             # e.g., 2.4 MB
    uploaded_date = Column(Date)                           # e.g., 2026-01-15