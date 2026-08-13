from sqlalchemy import (
    Column,
    BigInteger,
    Text,
    TIMESTAMP
)
from sqlalchemy.sql import func

from src.database.core import Base


class ProfileSettings(Base):
    __tablename__ = "profile_settings"

    id = Column(
        BigInteger,
        primary_key=True
    )

    first_name = Column(Text)

    last_name = Column(Text)

    email = Column(Text)

    phone = Column(Text)

    job_title = Column(Text)

    department = Column(Text)

    employee_id = Column(Text)

    bio = Column(Text)

    language = Column(Text)

    timezone = Column(Text)

    date_format = Column(Text)

    currency = Column(Text)

    created_at = Column(
        TIMESTAMP(timezone=True),
        server_default=func.now()
    )

    updated_at = Column(
        TIMESTAMP(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )