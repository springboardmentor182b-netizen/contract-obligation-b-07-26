from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from src.database.core import get_db
from src.contracts.service import ContractService
from src.contracts.models import ContractCreate, ContractUpdate, ContractVersionCreate, ContractResponse, ContractVersionResponse
from src.entities import ContractStatus, ContractCategory

router = APIRouter(prefix="/contracts", tags=["contracts"])


def get_contract_service(db: Session = Depends(get_db)):
    return ContractService(db)


@router.get("/", response_model=list[ContractResponse])
def get_all_contracts(
    category: str = None,
    status: str = None,
    search: str = None,
    is_archived: bool = False,
    service: ContractService = Depends(get_contract_service)
):
    return service.get_all_contracts(category, status, search, is_archived)


@router.get("/{contract_id}", response_model=ContractResponse)
def get_contract(contract_id: int, service: ContractService = Depends(get_contract_service)):
    contract = service.get_contract_by_id(contract_id)
    if not contract:
        raise HTTPException(status_code=404, detail="Contract not found")
    return contract


@router.post("/", response_model=ContractResponse)
def create_contract(contract_data: ContractCreate, service: ContractService = Depends(get_contract_service)):
    try:
        return service.create_contract(contract_data)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.put("/{contract_id}", response_model=ContractResponse)
def update_contract(
    contract_id: int,
    contract_data: ContractUpdate,
    user_id: int = Form(1),
    service: ContractService = Depends(get_contract_service)
):
    contract = service.update_contract(contract_id, contract_data, user_id)
    if not contract:
        raise HTTPException(status_code=404, detail="Contract not found")
    return contract


@router.post("/{contract_id}/archive", response_model=ContractResponse)
def archive_contract(
    contract_id: int,
    user_id: int = Form(1),
    service: ContractService = Depends(get_contract_service)
):
    contract = service.archive_contract(contract_id, user_id)
    if not contract:
        raise HTTPException(status_code=404, detail="Contract not found")
    return contract


@router.post("/{contract_id}/restore", response_model=ContractResponse)
def restore_contract(
    contract_id: int,
    user_id: int = Form(1),
    service: ContractService = Depends(get_contract_service)
):
    contract = service.restore_contract(contract_id, user_id)
    if not contract:
        raise HTTPException(status_code=404, detail="Contract not found")
    return contract


@router.post("/{contract_id}/versions", response_model=ContractVersionResponse)
def upload_contract_version(
    contract_id: int,
    file: UploadFile = File(...),
    version_number: str = Form(...),
    notes: str = Form(None),
    user_id: int = Form(1),
    service: ContractService = Depends(get_contract_service)
):
    # Save file
    upload_dir = "uploads/contracts"
    os.makedirs(upload_dir, exist_ok=True)
    file_path = f"{upload_dir}/{contract_id}_{version_number}_{file.filename}"
    
    with open(file_path, "wb") as buffer:
        buffer.write(file.file.read())
    
    file_size = f"{len(file.file.read()) / 1024:.2f} KB"
    
    version_data = ContractVersionCreate(
        version_number=version_number,
        file_path=file_path,
        file_size=file_size,
        notes=notes
    )
    
    return service.upload_contract_version(contract_id, version_data, user_id)


@router.get("/{contract_id}/versions", response_model=list[ContractVersionResponse])
def get_contract_versions(contract_id: int, service: ContractService = Depends(get_contract_service)):
    return service.get_contract_versions(contract_id)


@router.get("/categories/list")
def get_categories():
    return [category.value for category in ContractCategory]


@router.get("/statuses/list")
def get_statuses():
    return [status.value for status in ContractStatus]
