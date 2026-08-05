from sqlalchemy import Column, Integer, String, DateTime, Boolean
from sqlalchemy.sql import func
from src.database.core import Base
from datetime import datetime

class PasswordReset(Base):
    __tablename__ = "password_resets"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, nullable=False, index=True)
    reset_code = Column(String, nullable=False, unique=True)
    is_used = Column(Boolean, default=False)
    expires_at = Column(DateTime(timezone=False), nullable=False)  # Store without timezone
    created_at = Column(DateTime(timezone=False), server_default=func.now())

    def is_expired(self):
        # Use naive datetime to match how expires_at is stored
        now = datetime.utcnow()
        print(f"DEBUG is_expired: now={now}, expires_at={self.expires_at}, comparison={now > self.expires_at}")
        return now > self.expires_at

    def __repr__(self):
        return f"<PasswordReset {self.email}>"
