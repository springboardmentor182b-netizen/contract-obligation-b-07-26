from sqlalchemy.orm import Session
from src.entities import Renewal, User
from src.renewals.models import RenewalCreate, RenewalUpdate
from datetime import datetime


class RenewalService:
    def __init__(self, db: Session):
        self.db = db

    def get_all_renewals(self, contract_id: int = None, status: str = None):
        query = self.db.query(Renewal)
        
        if contract_id:
            query = query.filter(Renewal.contract_id == contract_id)
        
        if status:
            query = query.filter(Renewal.status == status)
        
        renewals = query.order_by(Renewal.created_at.desc()).all()
        return self._populate_renewal_details(renewals)

    def get_renewal_by_id(self, renewal_id: int):
        renewal = self.db.query(Renewal).filter(Renewal.id == renewal_id).first()
        if renewal:
            return self._populate_renewal_details(renewal)
        return None

    def create_renewal(self, renewal_data: RenewalCreate):
        renewal = Renewal(**renewal_data.model_dump())
        self.db.add(renewal)
        self.db.commit()
        self.db.refresh(renewal)
        return self._populate_renewal_details(renewal)

    def update_renewal(self, renewal_id: int, renewal_data: RenewalUpdate):
        renewal = self.db.query(Renewal).filter(Renewal.id == renewal_id).first()
        if not renewal:
            return None
        
        for field, value in renewal_data.model_dump(exclude_unset=True).items():
            setattr(renewal, field, value)
        
        renewal.updated_at = datetime.utcnow()
        self.db.commit()
        self.db.refresh(renewal)
        return self._populate_renewal_details(renewal)

    def _populate_renewal_details(self, data):
        if not data:
            return data
        
        is_list = isinstance(data, list)
        renewals = data if is_list else [data]
        
        for renewal in renewals:
            if renewal.requested_by:
                requested_user = self.db.query(User).filter(User.id == renewal.requested_by).first()
                if requested_user:
                    renewal.requested_by_name = f"{requested_user.first_name} {requested_user.last_name}"
                else:
                    renewal.requested_by_name = "Unknown"
            
            if renewal.approved_by:
                approved_user = self.db.query(User).filter(User.id == renewal.approved_by).first()
                if approved_user:
                    renewal.approved_by_name = f"{approved_user.first_name} {approved_user.last_name}"
                else:
                    renewal.approved_by_name = "Unknown"
        
        return data
