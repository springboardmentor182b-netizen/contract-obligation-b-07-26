from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from typing import List

from app.database.database import get_db

from app.schemas.role import (
    RoleCreate,
    RoleUpdate,
    RoleResponse
)

from app.services.role_service import (
    get_all_roles,
    get_role_by_id,
    create_role,
    update_role,
    delete_role
)

router = APIRouter(

    prefix="/roles",

    tags=["Roles"]

)


# -----------------------------------
# Get All Roles
# -----------------------------------

@router.get(
    "",
    response_model=List[RoleResponse]
)
def get_roles(
    db: Session = Depends(get_db)
):

    return get_all_roles(db)


# -----------------------------------
# Get Role By ID
# -----------------------------------

@router.get(
    "/{role_id}",
    response_model=RoleResponse
)
def get_role(
    role_id: int,
    db: Session = Depends(get_db)
):

    role = get_role_by_id(
        db,
        role_id
    )

    if not role:

        raise HTTPException(
            status_code=404,
            detail="Role not found"
        )

    return role


# -----------------------------------
# Create Role
# -----------------------------------

@router.post(
    "",
    response_model=RoleResponse
)
def add_role(
    role: RoleCreate,
    db: Session = Depends(get_db)
):

    created = create_role(
        db,
        role
    )

    if not created:

        raise HTTPException(
            status_code=400,
            detail="Role already exists"
        )

    return created


# -----------------------------------
# Update Role
# -----------------------------------

@router.put(
    "/{role_id}",
    response_model=RoleResponse
)
def edit_role(
    role_id: int,
    role: RoleUpdate,
    db: Session = Depends(get_db)
):

    updated = update_role(
        db,
        role_id,
        role
    )

    if not updated:

        raise HTTPException(
            status_code=404,
            detail="Role not found"
        )

    return updated


# -----------------------------------
# Delete Role
# -----------------------------------

@router.delete("/{role_id}")
def remove_role(
    role_id: int,
    db: Session = Depends(get_db)
):

    deleted = delete_role(
        db,
        role_id
    )

    if not deleted:

        raise HTTPException(
            status_code=404,
            detail="Role not found"
        )

    return {

        "message": "Role deleted successfully"

    }
