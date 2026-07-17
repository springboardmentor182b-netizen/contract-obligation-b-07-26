from pydantic import BaseModel
from datetime import date

class ObligationCreate(BaseModel):

    title: str

    department: str

    owner: str

    due_date: date

    priority: str

    status: str


class ObligationResponse(ObligationCreate):

    id: int

    class Config:

        from_attributes = True
