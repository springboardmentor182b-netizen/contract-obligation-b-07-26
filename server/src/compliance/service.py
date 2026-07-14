from sqlalchemy.orm import Session
from src.entities import ComplianceRecord, User
from src.compliance.models import ComplianceCreate, ComplianceUpdate
from datetime import datetime


class ComplianceService:
    def __init__(self, db: Session):
        self.db = db

    def get_all_compliance_records(self, contract_id: int = None, status: str = None):
        query = self.db.query(ComplianceRecord)
        
        if contract_id:
            query = query.filter(ComplianceRecord.contract_id == contract_id)
        
        if status:
            query = query.filter(ComplianceRecord.status == status)
        
        records = query.order_by(ComplianceRecord.created_at.desc()).all()
        return self._populate_compliance_details(records)

    def get_compliance_by_id(self, compliance_id: int):
        record = self.db.query(ComplianceRecord).filter(ComplianceRecord.id == compliance_id).first()
        if record:
            return self._populate_compliance_details(record)
        return None

    def create_compliance_record(self, compliance_data: ComplianceCreate):
        record = ComplianceRecord(**compliance_data.model_dump())
        self.db.add(record)
        self.db.commit()
        self.db.refresh(record)
        return self._populate_compliance_details(record)

    def update_compliance_record(self, compliance_id: int, compliance_data: ComplianceUpdate):
        record = self.db.query(ComplianceRecord).filter(ComplianceRecord.id == compliance_id).first()
        if not record:
            return None
        
        for field, value in compliance_data.model_dump(exclude_unset=True).items():
            setattr(record, field, value)
        
        record.updated_at = datetime.utcnow()
        self.db.commit()
        self.db.refresh(record)
        return self._populate_compliance_details(record)

    def _populate_compliance_details(self, data):
        if not data:
            return data
        
        is_list = isinstance(data, list)
        records = data if is_list else [data]
        
        for record in records:
            if record.reviewed_by:
                reviewed_user = self.db.query(User).filter(User.id == record.reviewed_by).first()
                if reviewed_user:
                    record.reviewed_by_name = f"{reviewed_user.first_name} {reviewed_user.last_name}"
                else:
                    record.reviewed_by_name = "Unknown"
        
        return data
