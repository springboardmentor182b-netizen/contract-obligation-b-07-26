from pydantic import BaseModel
from datetime import date

class HistoryBase(BaseModel):

    activity: str
    department: str
    status: str
    activity_date: date


class HistoryCreate(HistoryBase):
    pass


class HistoryResponse(HistoryBase):

    id: int

    class Config:
        from_attributes = True
