from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from typing import List

from app.database.database import get_db

from app.schemas.user import (
    UserCreate,
    UserResponse,
    UserUpdate
)

from app.services.user_service import (
    get_all_users,
    get_user_by_id,
    create_new_user,
    update_existing_user,
    remove_user,
    search_users,
    users_by_role
)

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


# ---------------------------------------
# Get All Users
# ---------------------------------------

@router.get(
    "",
    response_model=List[UserResponse]
)

def get_users(

    db: Session = Depends(get_db)

):

    return get_all_users(db)


# ---------------------------------------
# Get User By ID
# ---------------------------------------

@router.get(
    "/{user_id}",
    response_model=UserResponse
)

def get_user(

    user_id: int,

    db: Session = Depends(get_db)

):

    user = get_user_by_id(

        db,

        user_id

    )

    if not user:

        raise HTTPException(

            status_code=404,

            detail="User not found"

        )

    return user


# ---------------------------------------
# Create User
# ---------------------------------------

@router.post(
    "",
    response_model=UserResponse
)

def create_user(

    user: UserCreate,

    db: Session = Depends(get_db)

):

    created = create_new_user(

        db,

        user

    )

    if not created:

        raise HTTPException(

            status_code=400,

            detail="Email already exists"

        )

    return created


# ---------------------------------------
# Update User
# ---------------------------------------

@router.put(
    "/{user_id}",
    response_model=UserResponse
)

def update_user(

    user_id: int,

    user: UserUpdate,

    db: Session = Depends(get_db)

):

    updated = update_existing_user(

        db,

        user_id,

        user

    )

    if not updated:

        raise HTTPException(

            status_code=404,

            detail="User not found"

        )

    return updated


# ---------------------------------------
# Delete User
# ---------------------------------------

@router.delete("/{user_id}")

def delete_user(

    user_id: int,

    db: Session = Depends(get_db)

):

    deleted = remove_user(

        db,

        user_id

    )

    if not deleted:

        raise HTTPException(

            status_code=404,

            detail="User not found"

        )

    return {

        "message": "User deleted successfully"

    }


# ---------------------------------------
# Search Users
# ---------------------------------------

@router.get("/search/{keyword}")

def search(

    keyword: str,

    db: Session = Depends(get_db)

):

    return search_users(

        db,

        keyword

    )


# ---------------------------------------
# Filter By Role
# ---------------------------------------

@router.get("/role/{role_id}")

def get_role_users(

    role_id: int,

    db: Session = Depends(get_db)

):

    return users_by_role(

        db,

        role_id

    )
