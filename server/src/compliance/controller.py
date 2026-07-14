from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.database.core import get_db
from src.compliance.service import ComplianceService
from src.compliance.models import ComplianceCreate, ComplianceUpdate, ComplianceResponse

router = APIRouter(prefix="/compliance", tags=["compliance"])


def get_compliance_service(db: Session = Depends(get_db)):
    return ComplianceService(db)


@router.get("/", response_model=list[ComplianceResponse])
def get_all_compliance_records(
    contract_id: int = None,
    status: str = None,
    service: ComplianceService = Depends(get_compliance_service)
):
    return service.get_all_compliance_records(contract_id, status)


@router.get("/{compliance_id}", response_model=ComplianceResponse)
def get_compliance_record(compliance_id: int, service: ComplianceService = Depends(get_compliance_service)):
    record = service.get_compliance_by_id(compliance_id)
    if not record:
        raise HTTPException(status_code=404, detail="Compliance record not found")
    return record


@router.post("/", response_model=ComplianceResponse)
def create_compliance_record(compliance_data: ComplianceCreate, service: ComplianceService = Depends(get_compliance_service)):
    return service.create_compliance_record(compliance_data)


@router.put("/{compliance_id}", response_model=ComplianceResponse)
def update_compliance_record(compliance_id: int, compliance_data: ComplianceUpdate, service: ComplianceService = Depends(get_compliance_service)):
    record = service.update_compliance_record(compliance_id, compliance_data)
    if not record:
        raise HTTPException(status_code=404, detail="Compliance record not found")
    return record
