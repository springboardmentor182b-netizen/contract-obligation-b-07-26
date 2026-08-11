from sqlalchemy import Column, String, Boolean
from src.database.core import Base


class Setting(Base):
    __tablename__ = "settings"

    id = Column(String, primary_key=True, index=True)

    firstName = Column(String)
    lastName = Column(String)
    email = Column(String, unique=True, index=True)
    phone = Column(String)

    jobTitle = Column(String)
    department = Column(String)
    timezone = Column(String)

    emailNotifications = Column(Boolean, default=True)
    smsNotifications = Column(Boolean, default=False)
    pushNotifications = Column(Boolean, default=True)

    theme = Column(String, default="Light")
    language = Column(String, default="English")