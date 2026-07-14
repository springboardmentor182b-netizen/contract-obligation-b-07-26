from sqlalchemy.orm import Session
from sqlalchemy import or_, and_
from src.entities import Contract, ContractVersion, User, Activity, ActivityType
from src.contracts.models import ContractCreate, ContractUpdate, ContractVersionCreate
from datetime import datetime
import os


class ContractService:
    def __init__(self, db: Session):
        self.db = db

    def get_all_contracts(
        self,
        category: str = None,
        status: str = None,
        search: str = None,
        is_archived: bool = False
    ):
        query = self.db.query(Contract).filter(Contract.is_archived == is_archived)
        
        if category:
            query = query.filter(Contract.category == category)
        
        if status:
            query = query.filter(Contract.status == status)
        
        if search:
            query = query.filter(
                or_(
                    Contract.title.ilike(f"%{search}%"),
                    Contract.contract_number.ilike(f"%{search}%"),
                    Contract.description.ilike(f"%{search}%")
                )
            )
        
        contracts = query.all()
        return self._populate_contract_details(contracts)

    def get_contract_by_id(self, contract_id: int):
        contract = self.db.query(Contract).filter(Contract.id == contract_id).first()
        if contract:
            return self._populate_contract_details(contract)
        return None

    def get_contract_by_no(self, contract_number: str):
        return self.db.query(Contract).filter(Contract.contract_number == contract_number).first()

    def create_contract(self, contract_data: ContractCreate):
        # Check if contract number already exists
        existing = self.get_contract_by_no(contract_data.contract_number)
        if existing:
            raise ValueError("Contract number already exists")
        
        contract = Contract(**contract_data.model_dump())
        self.db.add(contract)
        self.db.commit()
        self.db.refresh(contract)
        
        # Create activity log
        self._create_activity(contract.id, contract_data.creator_id, ActivityType.CREATED, "Contract created")
        
        return self._populate_contract_details(contract)

    def update_contract(self, contract_id: int, contract_data: ContractUpdate, user_id: int):
        contract = self.db.query(Contract).filter(Contract.id == contract_id).first()
        if not contract:
            return None
        
        # Track changes
        changes = []
        for field, value in contract_data.model_dump(exclude_unset=True).items():
            if getattr(contract, field) != value:
                changes.append(f"{field}: {getattr(contract, field)} -> {value}")
                setattr(contract, field, value)
        
        if changes:
            contract.updated_at = datetime.utcnow()
            self.db.commit()
            self.db.refresh(contract)
            
            # Create activity log
            self._create_activity(contract.id, user_id, ActivityType.UPDATED, f"Contract updated: {', '.join(changes)}")
        
        return self._populate_contract_details(contract)

    def archive_contract(self, contract_id: int, user_id: int):
        contract = self.db.query(Contract).filter(Contract.id == contract_id).first()
        if not contract:
            return None
        
        contract.is_archived = True
        contract.status = ContractStatus.TERMINATED
        self.db.commit()
        self.db.refresh(contract)
        
        # Create activity log
        self._create_activity(contract.id, user_id, ActivityType.ARCHIVED, "Contract archived")
        
        return self._populate_contract_details(contract)

    def restore_contract(self, contract_id: int, user_id: int):
        contract = self.db.query(Contract).filter(Contract.id == contract_id).first()
        if not contract:
            return None
        
        contract.is_archived = False
        self.db.commit()
        self.db.refresh(contract)
        
        # Create activity log
        self._create_activity(contract.id, user_id, ActivityType.RESTORED, "Contract restored")
        
        return self._populate_contract_details(contract)

    def upload_contract_version(self, contract_id: int, version_data: ContractVersionCreate, user_id: int):
        contract = self.db.query(Contract).filter(Contract.id == contract_id).first()
        if not contract:
            return None
        
        # Set previous current version to false
        self.db.query(ContractVersion).filter(
            ContractVersion.contract_id == contract_id,
            ContractVersion.is_current == True
        ).update({"is_current": False})
        
        version = ContractVersion(
            contract_id=contract_id,
            uploaded_by=user_id,
            **version_data.model_dump()
        )
        version.is_current = True
        self.db.add(version)
        self.db.commit()
        self.db.refresh(version)
        
        # Create activity log
        self._create_activity(contract.id, user_id, ActivityType.VERSION_UPLOADED, f"Version {version_data.version_number} uploaded")
        
        return version

    def get_contract_versions(self, contract_id: int):
        return self.db.query(ContractVersion).filter(ContractVersion.contract_id == contract_id).order_by(ContractVersion.upload_date.desc()).all()

    def _populate_contract_details(self, data):
        if not data:
            return data
        
        is_list = isinstance(data, list)
        contracts = data if is_list else [data]
        
        for contract in contracts:
            # Get owner name
            if contract.owner_id:
                owner_user = self.db.query(User).filter(User.id == contract.owner_id).first()
                if owner_user:
                    contract.owner = f"{owner_user.first_name} {owner_user.last_name}"
                    contract.department = owner_user.department
                else:
                    contract.owner = "Unknown"
                    contract.department = "Unknown"
            else:
                contract.owner = "Unassigned"
                contract.department = "Unassigned"
        
        return data

    def _create_activity(self, contract_id: int, user_id: int, activity_type: ActivityType, description: str):
        activity = Activity(
            contract_id=contract_id,
            user_id=user_id,
            type=activity_type,
            description=description
        )
        self.db.add(activity)
        self.db.commit()
