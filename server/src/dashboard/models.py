from pydantic import BaseModel
from typing import List


class DashboardSummary(BaseModel):
    total_contracts: int
    active_contracts: int
    under_review: int
    expiring_soon: int
    pending_obligations: int
    compliance_rate: float
    high_risk: int


class ComplianceLevel(BaseModel):
    name: str
    value: int


class ContractGrowth(BaseModel):
    month: str
    total: int
    active: int


class ContractStatus(BaseModel):
    status: str
    count: int


class UpcomingRenewal(BaseModel):
    name: str
    owner: str
    expiry: str
    days: int
    risk: str


class RecentContract(BaseModel):
    contract_id: str
    name: str
    category: str
    department: str
    owner: str
    status: str
    renewal: str
    renewal_version: str

class ContractByDepartment(BaseModel):
    department:str
    compliance:int

class RecentActivity(BaseModel):
    title:str
    description:str
    time:str
    type:str

class ComplianceSummaryItem(BaseModel):
    name:str
    value:int