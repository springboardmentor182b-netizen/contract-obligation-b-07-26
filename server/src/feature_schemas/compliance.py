from pydantic import BaseModel
from datetime import datetime

class ComplianceBase(BaseModel):

    title: str
    department: str
    status: str
    compliance_score: float
    risk_level: str


class ComplianceCreate(ComplianceBase):
    pass


class ComplianceResponse(ComplianceBase):

    id: int
    created_at: datetime

    class Config:
        from_attributes = True
