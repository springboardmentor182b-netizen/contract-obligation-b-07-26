from sqlalchemy import Column, Integer, String, Date
from app.config.database import Base


class Audit(Base):

    __tablename__ = "audit"

    id = Column(Integer, primary_key=True, index=True)

    audit_name = Column(String(200))

    department = Column(String(100))

    severity = Column(String(50))

    status = Column(String(50))

    audit_date = Column(Date)
