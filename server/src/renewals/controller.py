from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.database.core import get_db
from src.renewals.service import RenewalService
from src.renewals.models import RenewalCreate, RenewalUpdate, RenewalResponse

router = APIRouter(prefix="/renewals", tags=["renewals"])


def get_renewal_service(db: Session = Depends(get_db)):
    return RenewalService(db)


@router.get("/", response_model=list[RenewalResponse])
def get_all_renewals(
    contract_id: int = None,
    status: str = None,
    service: RenewalService = Depends(get_renewal_service)
):
    return service.get_all_renewals(contract_id, status)


@router.get("/{renewal_id}", response_model=RenewalResponse)
def get_renewal(renewal_id: int, service: RenewalService = Depends(get_renewal_service)):
    renewal = service.get_renewal_by_id(renewal_id)
    if not renewal:
        raise HTTPException(status_code=404, detail="Renewal not found")
    return renewal


@router.post("/", response_model=RenewalResponse)
def create_renewal(renewal_data: RenewalCreate, service: RenewalService = Depends(get_renewal_service)):
    return service.create_renewal(renewal_data)


@router.put("/{renewal_id}", response_model=RenewalResponse)
def update_renewal(renewal_id: int, renewal_data: RenewalUpdate, service: RenewalService = Depends(get_renewal_service)):
    renewal = service.update_renewal(renewal_id, renewal_data)
    if not renewal:
        raise HTTPException(status_code=404, detail="Renewal not found")
    return renewal
