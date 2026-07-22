from pydantic import BaseModel
from datetime import date

class ReportBase(BaseModel):

    title: str
    department: str
    status: str
    file_size: str
    generated_date: date


class ReportCreate(ReportBase):
    pass


class ReportResponse(ReportBase):

    id: int

    class Config:
        from_attributes = True
