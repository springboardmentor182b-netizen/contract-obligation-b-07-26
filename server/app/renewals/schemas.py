from datetime import datetime
from typing import List
from uuid import UUID

from pydantic import BaseModel, ConfigDict, Field


class RenewalsSummary(BaseModel):
    upcomingRenewals: int
    upcomingWindowDays: int
    renewedCount: int
    renewedDeltaVsLastQuarter: int
    expiredCount: int
    expiredNeedsReview: bool
    cancelledCount: int


class MonthlyActivityPoint(BaseModel):
    month: str
    renewed: int
    expired: int
    upcoming: int


class ActivityTrendResponse(BaseModel):
    year: int
    months: List[MonthlyActivityPoint]


class ReminderItem(BaseModel):
    id: UUID
    contractName: str
    expiresInDays: int
    urgency: str  # 'critical' | 'soon' | 'upcoming' | 'planned'


class ReminderScheduleResponse(BaseModel):
    items: List[ReminderItem]


class RenewalItem(BaseModel):
    """
    NOTE: not built via model_validate(renewal) directly — services.py's
    to_item() helper constructs this explicitly so `displayId` can be
    derived from the model's display_seq (RNW-001 style), which isn't a
    plain column value.
    """

    id: UUID
    displayId: str
    contractName: str
    counterparty: str
    expiryDate: datetime
    value: float
    status: str
    noticePeriodDays: int


class RenewalPipelineResponse(BaseModel):
    items: List[RenewalItem]
    total: int


class RenewalCreate(BaseModel):
    contractName: str
    counterparty: str
    expiryDate: datetime
    value: float = 0
    noticePeriodDays: int = 30


class RenewalUpdate(BaseModel):
    contractName: str | None = None
    counterparty: str | None = None
    expiryDate: datetime | None = None
    value: float | None = None
    noticePeriodDays: int | None = None
    status: str | None = None


class RenewContractRequest(BaseModel):
    newExpiryDate: datetime
    value: float | None = None


class ReminderSettingsResponse(BaseModel):
    thresholds: List[int]


class ReminderSettingsUpdate(BaseModel):
    thresholds: List[int]
