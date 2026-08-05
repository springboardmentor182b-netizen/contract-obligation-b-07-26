from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String

from sqlalchemy.orm import relationship

from app.database.database import Base


class Role(Base):

    __tablename__ = "roles"

    role_id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    role_name = Column(
        String,
        unique=True,
        nullable=False
    )

    role_description = Column(
        String,
        nullable=False
    )

    users = relationship(

        "User",

        back_populates="role"

    )
