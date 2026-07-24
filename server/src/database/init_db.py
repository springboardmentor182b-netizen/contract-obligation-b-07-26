from src.database.core import Base, engine
from src.entities.dashboard import (
    DashboardMetric,
    Department,
    RiskTrend,
    Audit,
    Risk,
)

Base.metadata.create_all(bind=engine)

print("Tables created successfully!")