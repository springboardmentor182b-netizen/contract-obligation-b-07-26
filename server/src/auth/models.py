from sqlalchemy import Column, Integer, String, Boolean
from sqlalchemy.orm import relationship
from src.database.core import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=True)  # Made nullable for OAuth users
    google_id = Column(String, unique=True, nullable=True)
    facebook_id = Column(String, unique=True, nullable=True)
    github_id = Column(String, unique=True, nullable=True)
    apple_id = Column(String, unique=True, nullable=True)
    is_oauth_user = Column(Boolean, default=False)
    
    # Relationship with Todo
    todos = relationship("Todo", back_populates="user", cascade="all, delete-orphan")