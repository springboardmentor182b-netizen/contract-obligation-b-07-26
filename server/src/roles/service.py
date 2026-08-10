from fastapi import HTTPException
from sqlalchemy.orm import Session

from src.roles.models import Role
from src.roles.schemas import RoleCreate, RoleUpdate


def get_roles(db: Session):
    return db.query(Role).all()


def get_role(db: Session, role_id: int):
    role = db.query(Role).filter(Role.id == role_id).first()

    if not role:
        raise HTTPException(
            status_code=404,
            detail="Role not found"
        )

    return role


def create_role(db: Session, role: RoleCreate):
    existing = (
        db.query(Role)
        .filter(Role.name == role.name)
        .first()
    )

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Role already exists"
        )

    new_role = Role(
        name=role.name,
        description=role.description,
    )

    db.add(new_role)
    db.commit()
    db.refresh(new_role)

    return new_role


def update_role(
    db: Session,
    role_id: int,
    role_update: RoleUpdate,
):
    role = get_role(db, role_id)

    update_data = role_update.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(role, key, value)

    db.commit()
    db.refresh(role)

    return role


def delete_role(
    db: Session,
    role_id: int,
):
    role = get_role(db, role_id)

    db.delete(role)
    db.commit()

    return {
        "message": "Role deleted successfully"
    }