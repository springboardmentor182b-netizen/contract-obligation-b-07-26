from pydantic import BaseModel
from datetime import date, datetime

# --- Contract Schemas (Keep what you have) ---
class ContractBase(BaseModel):
    contract_id: str
    contract_name: str
    counterparty: str
    status: str
    owner: str
    value: float
    due_date: date
    priority: str
    category: str

class ContractResponse(ContractBase):
    id: int
    class Config:
        from_attributes = True

# --- NEW: Audit Log Schemas ---
class AuditLogBase(BaseModel):
    log_id: str
    user_name: str
    user_initials: str
    action: str
    module: str
    ip_address: str
    severity: str
    timestamp: datetime

class AuditLogResponse(AuditLogBase):
    id: int
    class Config:
        from_attributes = True