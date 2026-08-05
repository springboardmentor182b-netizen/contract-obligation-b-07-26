from sqlalchemy.orm import Session

from app.models.role import Role
from app.schemas.role import RoleCreate
from app.schemas.role import RoleUpdate


# -----------------------------------
# Get All Roles
# -----------------------------------

def get_all_roles(db: Session):

    return db.query(Role).all()


# -----------------------------------
# Get Role By ID
# -----------------------------------

def get_role_by_id(
    db: Session,
    role_id: int
):

    return db.query(Role).filter(
        Role.role_id == role_id
    ).first()


# -----------------------------------
# Create Role
# -----------------------------------

def create_role(
    db: Session,
    role: RoleCreate
):

    existing = db.query(Role).filter(
        Role.role_name == role.role_name
    ).first()

    if existing:

        return None

    new_role = Role(

        role_name=role.role_name,

        role_description=role.role_description

    )

    db.add(new_role)

    db.commit()

    db.refresh(new_role)

    return new_role


# -----------------------------------
# Update Role
# -----------------------------------

def update_role(
    db: Session,
    role_id: int,
    updated_role: RoleUpdate
):

    role = get_role_by_id(
        db,
        role_id
    )

    if not role:

        return None

    update_data = updated_role.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():

        setattr(
            role,
            key,
            value
        )

    db.commit()

    db.refresh(role)

    return role


# -----------------------------------
# Delete Role
# -----------------------------------

def delete_role(
    db: Session,
    role_id: int
):

    role = get_role_by_id(
        db,
        role_id
    )

    if not role:

        return False

    db.delete(role)

    db.commit()

    return True
