from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from src.database.core import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=True)

    todos = relationship(
        "Todo",
        back_populates="user",
        cascade="all, delete-orphan"
    )