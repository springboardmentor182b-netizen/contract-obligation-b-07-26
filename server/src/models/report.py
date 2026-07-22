from sqlalchemy import Column, Integer, String, Date
from app.config.database import Base


class Report(Base):

    __tablename__ = "report"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(200))

    department = Column(String(100))

    status = Column(String(50))

    file_size = Column(String(30))

    generated_date = Column(Date)
