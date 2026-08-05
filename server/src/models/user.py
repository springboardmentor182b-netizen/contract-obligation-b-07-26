from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Boolean
from sqlalchemy import DateTime
from sqlalchemy import ForeignKey

from sqlalchemy.orm import relationship

from datetime import datetime

from app.database.database import Base


class User(Base):

    __tablename__ = "users"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    first_name = Column(
        String,
        nullable=False
    )

    last_name = Column(
        String,
        nullable=False
    )

    email = Column(
        String,
        unique=True,
        nullable=False
    )

    phone = Column(
        String,
        nullable=False
    )

    department = Column(
        String,
        nullable=False
    )

    designation = Column(
        String,
        nullable=False
    )

    role_id = Column(
        Integer,
        ForeignKey("roles.role_id"),
        nullable=False
    )

    password = Column(
        String,
        nullable=False
    )

    is_active = Column(
        Boolean,
        default=True
    )

    last_login = Column(
        DateTime,
        nullable=True
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow
    )

    # Relationship

    role = relationship(
        "Role",
        back_populates="users"
    )
