from pydantic import BaseModel
from enum import Enum
from typing import Optional


class Status(str, Enum):
    pending = "Pending"
    in_progress = "In Progress"
    under_review = "Under Review"
    completed = "Completed"
    overdue = "Overdue"


class Priority(str, Enum):
    low = "Low"
    medium = "Medium"
    high = "High"
    critical = "Critical"


class Assignee(BaseModel):
    name: str
    initials: str
    color: str  # tailwind bg-color class, e.g. "bg-blue-600"


class ObligationBase(BaseModel):
    title: str
    contract: str
    status: Status
    priority: Priority
    assignee: Assignee
    due: str  # kept as display string (e.g. "Jul 1") to match the Figma design
    category: str


class ObligationCreate(ObligationBase):
    pass


class ObligationUpdate(BaseModel):
    title: Optional[str] = None
    contract: Optional[str] = None
    status: Optional[Status] = None
    priority: Optional[Priority] = None
    assignee: Optional[Assignee] = None
    due: Optional[str] = None
    category: Optional[str] = None


class Obligation(ObligationBase):
    id: int
