from datetime import datetime
from typing import List

from pydantic import BaseModel


class OverviewResponse(BaseModel):
    activeContracts: int
    activeContractsDelta: int
    pendingObligations: int
    pendingObligationsDelta: int
    complianceRate: float
    complianceRateDeltaPts: float
    upcomingRenewals: int
    upcomingRenewalsWindowDays: int


class TrendPoint(BaseModel):
    period: str
    contracts: int
    obligations: int


class GrowthTrendResponse(BaseModel):
    range: str
    points: List[TrendPoint]


class PerformanceMetricItem(BaseModel):
    label: str
    valuePercent: float
    color: str


class PerformanceMetricsResponse(BaseModel):
    items: List[PerformanceMetricItem]


class DepartmentPerformanceItem(BaseModel):
    name: str
    activeContracts: int
    complianceScore: float


class DepartmentPerformanceResponse(BaseModel):
    departments: List[DepartmentPerformanceItem]


class ActivityItem(BaseModel):
    id: str
    type: str
    title: str
    subtitle: str
    timestamp: datetime


class RecentActivitiesResponse(BaseModel):
    items: List[ActivityItem]
