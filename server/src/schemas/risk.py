from pydantic import BaseModel

class RiskBase(BaseModel):

    risk_name: str
    department: str
    severity: str
    status: str
    owner: str


class RiskCreate(RiskBase):
    pass


class RiskResponse(RiskBase):

    id: int

    class Config:
        from_attributes = True
