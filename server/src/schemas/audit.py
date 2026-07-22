from pydantic import BaseModel
from datetime import date

class AuditBase(BaseModel):

    audit_name: str
    department: str
    severity: str
    status: str
    audit_date: date


class AuditCreate(AuditBase):
    pass


class AuditResponse(AuditBase):

    id: int

    class Config:
        from_attributes = True
