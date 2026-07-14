from sqlalchemy.orm import Session
from src.entities import Obligation, User
from src.obligations.models import ObligationCreate, ObligationUpdate
from datetime import datetime


class ObligationService:
    def __init__(self, db: Session):
        self.db = db

    def get_all_obligations(self, contract_id: int = None, status: str = None):
        query = self.db.query(Obligation).filter(Obligation.is_active == True)
        
        if contract_id:
            query = query.filter(Obligation.contract_id == contract_id)
        
        if status:
            query = query.filter(Obligation.status == status)
        
        obligations = query.all()
        return self._populate_obligation_details(obligations)

    def get_obligation_by_id(self, obligation_id: int):
        obligation = self.db.query(Obligation).filter(Obligation.id == obligation_id).first()
        if obligation:
            return self._populate_obligation_details(obligation)
        return None

    def create_obligation(self, obligation_data: ObligationCreate):
        obligation = Obligation(**obligation_data.model_dump())
        self.db.add(obligation)
        self.db.commit()
        self.db.refresh(obligation)
        return self._populate_obligation_details(obligation)

    def update_obligation(self, obligation_id: int, obligation_data: ObligationUpdate):
        obligation = self.db.query(Obligation).filter(Obligation.id == obligation_id).first()
        if not obligation:
            return None
        
        for field, value in obligation_data.model_dump(exclude_unset=True).items():
            setattr(obligation, field, value)
        
        # If status is completed, set completed_date
        if obligation_data.status == "Completed" and not obligation.completed_date:
            obligation.completed_date = datetime.utcnow()
        
        obligation.updated_at = datetime.utcnow()
        self.db.commit()
        self.db.refresh(obligation)
        return self._populate_obligation_details(obligation)

    def delete_obligation(self, obligation_id: int):
        obligation = self.db.query(Obligation).filter(Obligation.id == obligation_id).first()
        if not obligation:
            return None
        
        obligation.is_active = False
        self.db.commit()
        return {"message": "Obligation deleted"}

    def _populate_obligation_details(self, data):
        if not data:
            return data
        
        is_list = isinstance(data, list)
        obligations = data if is_list else [data]
        
        for obligation in obligations:
            if obligation.assigned_to:
                assigned_user = self.db.query(User).filter(User.id == obligation.assigned_to).first()
                if assigned_user:
                    obligation.assigned_name = f"{assigned_user.first_name} {assigned_user.last_name}"
                else:
                    obligation.assigned_name = "Unknown"
            else:
                obligation.assigned_name = "Unassigned"
        
        return data
