from typing import List

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from src.database.core import SessionLocal
from src.auth.jwt import get_current_user

from src.roles.schemas import (
    RoleCreate,
    RoleUpdate,
    RoleResponse,
)

from src.roles.service import (
    get_roles,
    get_role,
    create_role,
    update_role,
    delete_role,
)

router = APIRouter(
    prefix="/roles",
    tags=["Roles"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/", response_model=List[RoleResponse])
def read_roles(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_roles(db)


@router.get("/{role_id}", response_model=RoleResponse)
def read_role(
    role_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return get_role(db, role_id)


@router.post("/", response_model=RoleResponse)
def create_new_role(
    role: RoleCreate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return create_role(db, role)


@router.put("/{role_id}", response_model=RoleResponse)
def update_existing_role(
    role_id: int,
    role_update: RoleUpdate,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return update_role(
        db,
        role_id,
        role_update,
    )


@router.delete("/{role_id}")
def delete_existing_role(
    role_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return delete_role(db, role_id)