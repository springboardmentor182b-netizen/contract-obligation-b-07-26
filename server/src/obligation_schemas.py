"""Schemas used by the SQLAlchemy obligation router."""

from datetime import date

from pydantic import BaseModel


class ObligationCreate(BaseModel):
    title: str
    department: str
    owner: str
    due_date: date
    priority: str
    status: str
