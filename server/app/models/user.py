from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func

from app.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(String(100), nullable=False)

    email = Column(String(120), unique=True, nullable=False)

    role = Column(String(50), nullable=False)

    department = Column(String(100), nullable=False)

    status = Column(String(20), nullable=False)

    last_login = Column(String(50))

    created_at = Column(DateTime(timezone=True), server_default=func.now())