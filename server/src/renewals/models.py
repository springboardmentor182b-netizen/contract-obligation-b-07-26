from sqlalchemy import Column, BigInteger, Date, Text, ForeignKey, TIMESTAMP
from sqlalchemy.sql import func

from src.database.core import Base


class Renewal(Base):
    __tablename__ = "renewals"

    id = Column(BigInteger, primary_key=True)

    contract_id = Column(
        BigInteger,
        ForeignKey("contracts.id", ondelete="CASCADE"),
        nullable=False
    )

    renewal_date = Column(Date)

    reminder_date = Column(Date)

    renewal_status = Column(Text)

    approved_by = Column(
        BigInteger,
        ForeignKey("users.id"),
        nullable=True
    )

    notes = Column(Text)

    created_at = Column(
        TIMESTAMP(timezone=True),
        server_default=func.now()
    )