from pydantic import BaseModel
from typing import List


class DashboardSummary(BaseModel):
    total_contracts: int
    active_contracts: int
    expiring_soon: int
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
    department: str
    owner: str
    status: str
    renewal_version: str