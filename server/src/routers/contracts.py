from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from datetime import date
from fastapi.responses import StreamingResponse
import io
import csv
import tempfile

from src.database.session import get_db
from src.schemas.contract import ContractCreate, ContractResponse, ContractUpdate
from src.services import contract_service
from src.auth.dependencies import get_current_active_user
from src.models.user import User

router = APIRouter()


@router.get("/", response_model=List[ContractResponse])
def read_contracts(
    skip: int = 0,
    limit: int = 100,
    status: Optional[str] = None,
    category: Optional[str] = None,
    search: Optional[str] = None,
    department: Optional[str] = None,
    expiry_from: Optional[date] = None,
    expiry_to: Optional[date] = None,
    value_min: Optional[float] = None,
    value_max: Optional[float] = None,
    db: Session = Depends(get_db),
):
    try:
        contracts = contract_service.get_contracts(
            db, 
            skip=skip, 
            limit=limit, 
            status=status, 
            category=category, 
            search=search,
            department=department,
            expiry_from=expiry_from,
            expiry_to=expiry_to,
            value_min=value_min,
            value_max=value_max
        )
        return contracts
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/", response_model=ContractResponse)
def create_contract(
    contract: ContractCreate,
    db: Session = Depends(get_db),
):
    return contract_service.create_contract(db=db, contract=contract)


@router.get("/stats/summary")
def get_contract_stats(db: Session = Depends(get_db)):
    return contract_service.get_contract_stats(db)


@router.get("/export/csv")
def export_contracts_csv(
    status: Optional[str] = None,
    category: Optional[str] = None,
    search: Optional[str] = None,
    department: Optional[str] = None,
    expiry_from: Optional[date] = None,
    expiry_to: Optional[date] = None,
    value_min: Optional[float] = None,
    value_max: Optional[float] = None,
    db: Session = Depends(get_db),
):
    contracts = contract_service.get_contracts(
        db, 
        skip=0, 
        limit=10000, 
        status=status, 
        category=category, 
        search=search,
        department=department,
        expiry_from=expiry_from,
        expiry_to=expiry_to,
        value_min=value_min,
        value_max=value_max
    )
    
    output = io.StringIO()
    writer = csv.writer(output)
    
    # Write header
    writer.writerow(['Contract ID', 'Name', 'Party', 'Department', 'Category', 'Status', 'Value', 'Expiry', 'Version', 'Created At'])
    
    # Write data
    for contract in contracts:
        writer.writerow([
            contract.contract_id,
            contract.name,
            contract.party,
            contract.department,
            contract.category,
            contract.status,
            contract.value,
            contract.expiry,
            contract.version,
            contract.created_at
        ])
    
    output.seek(0)
    
    return StreamingResponse(
        io.BytesIO(output.getvalue().encode('utf-8')),
        media_type='text/csv',
        headers={'Content-Disposition': 'attachment; filename="contracts.csv"'}
    )


@router.get("/export/excel")
def export_contracts_excel(
    status: Optional[str] = None,
    category: Optional[str] = None,
    search: Optional[str] = None,
    department: Optional[str] = None,
    expiry_from: Optional[date] = None,
    expiry_to: Optional[date] = None,
    value_min: Optional[float] = None,
    value_max: Optional[float] = None,
    db: Session = Depends(get_db),
):
    try:
        import pandas as pd
    except ImportError:
        raise HTTPException(status_code=503, detail="Excel export requires the pandas package.")
    
    contracts = contract_service.get_contracts(
        db, 
        skip=0, 
        limit=10000, 
        status=status, 
        category=category, 
        search=search,
        department=department,
        expiry_from=expiry_from,
        expiry_to=expiry_to,
        value_min=value_min,
        value_max=value_max
    )
    
    # Convert to DataFrame
    data = []
    for contract in contracts:
        data.append({
            'Contract ID': contract.contract_id,
            'Name': contract.name,
            'Party': contract.party,
            'Department': contract.department,
            'Category': contract.category,
            'Status': contract.status,
            'Value': contract.value,
            'Expiry': contract.expiry,
            'Version': contract.version,
            'Created At': contract.created_at
        })
    
    df = pd.DataFrame(data)
    
    # Create Excel file in memory
    output = io.BytesIO()
    with pd.ExcelWriter(output, engine='openpyxl') as writer:
        df.to_excel(writer, index=False, sheet_name='Contracts')
    
    output.seek(0)
    
    return StreamingResponse(
        output,
        media_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        headers={'Content-Disposition': 'attachment; filename="contracts.xlsx"'}
    )


@router.get("/{id}", response_model=ContractResponse)
def read_contract(id: int, db: Session = Depends(get_db)):
    db_contract = contract_service.get_contract(db, id)

    if db_contract is None:
        raise HTTPException(status_code=404, detail="Contract not found")

    return db_contract


@router.put("/{id}", response_model=ContractResponse)
def update_contract(
    id: int,
    contract: ContractUpdate,
    db: Session = Depends(get_db),
):
    db_contract = contract_service.update_contract(db, id, contract)

    if db_contract is None:
        raise HTTPException(status_code=404, detail="Contract not found")

    return db_contract


@router.delete("/{id}")
def delete_contract(
    id: int,
    db: Session = Depends(get_db),
):
    db_contract = contract_service.delete_contract(db, id)

    if db_contract is None:
        raise HTTPException(status_code=404, detail="Contract not found")

    return {"message": "Contract deleted successfully"}



