from sqlalchemy import Column, Integer, String
from src.database.session import Base

class SettingsProfile(Base):
    __tablename__ = "settings_profiles"

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String, nullable=True)
    last_name = Column(String, nullable=True)
    email = Column(String, unique=True, index=True, nullable=False)
    phone = Column(String, nullable=True)
    job_title = Column(String, nullable=True)
    department = Column(String, nullable=True)
    timezone = Column(String, nullable=True)
    profile_image = Column(String, nullable=True)
