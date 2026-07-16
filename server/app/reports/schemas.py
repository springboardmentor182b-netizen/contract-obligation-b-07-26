"""
Pydantic schemas for the Reports module.

These shapes are the source of truth matching client/src/services/reportsApi.js
— keep both in sync if either side changes.
"""
from datetime import datetime
from typing import List, Optional
from uuid import UUID

from pydantic import BaseModel, ConfigDict


# ---- GET /reports/summary ----

class ReportsSummary(BaseModel):
    generatedReports: int
    generatedDelta: int
    scheduledReports: int
    scheduledWindowDays: int
    downloads: int
    downloadsDelta: int
    pendingReports: int


# ---- GET /reports/monthly-activity ----

class MonthlyActivityPoint(BaseModel):
    month: str  # e.g. "Jan"
    generated: int
    scheduled: int


class MonthlyActivityResponse(BaseModel):
    year: int
    months: List[MonthlyActivityPoint]


# ---- GET /reports/library ----

class ReportLibraryItem(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: UUID
    name: str
    type: str
    createdAt: datetime
    status: str


class ReportLibraryResponse(BaseModel):
    items: List[ReportLibraryItem]
    total: int


# ---- POST /reports/export ----

class ExportRequest(BaseModel):
    type: str  # one of: compliance | contract-summary | obligation | user-activity | audit-trail


class ExportResponse(BaseModel):
    downloadUrl: str


# ---- POST /reports/schedule ----

class ScheduleRequest(BaseModel):
    reportType: str
    frequency: str  # daily | weekly | monthly
    recipients: List[str]


class ScheduleResponse(BaseModel):
    id: UUID
    nextRunAt: datetime
