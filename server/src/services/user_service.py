from sqlalchemy.orm import Session
from sqlalchemy import or_
from sqlalchemy.orm import joinedload

from app.models.user import User
from app.schemas.user import UserCreate
from app.schemas.user import UserUpdate

from app.utils.security import hash_password


# ---------------------------------------
# Get All Users
# ---------------------------------------
def get_all_users(db: Session):

    return (
        db.query(User)
        .options(joinedload(User.role))
        .all()
    )

# ---------------------------------------
# Get User By ID
# ---------------------------------------

def get_user_by_id(
    db: Session,
    user_id: int
):

    return (
        db.query(User)
        .options(joinedload(User.role))
        .filter(User.id == user_id)
        .first()
    )

# ---------------------------------------
# Create User
# ---------------------------------------

def create_new_user(
    db: Session,
    user: UserCreate
):

    existing = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing:

        return None

    new_user = User(

        first_name=user.first_name,

        last_name=user.last_name,

        email=user.email,

        phone=user.phone,

        department=user.department,

        designation=user.designation,

        role_id=user.role_id,

        password=hash_password(user.password)

    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    return new_user


# ---------------------------------------
# Update User
# ---------------------------------------

def update_existing_user(

    db: Session,

    user_id: int,

    updated_user: UserUpdate

):

    user = get_user_by_id(

        db,

        user_id

    )

    if not user:

        return None

    update_data = updated_user.model_dump(
        exclude_unset=True
    )

    for key, value in update_data.items():

        setattr(

            user,

            key,

            value

        )

    db.commit()

    db.refresh(user)

    return user


# ---------------------------------------
# Delete User
# ---------------------------------------

def remove_user(

    db: Session,

    user_id: int

):

    user = get_user_by_id(

        db,

        user_id

    )

    if not user:

        return False

    db.delete(user)

    db.commit()

    return True


# ---------------------------------------
# Search Users
# ---------------------------------------

def search_users(

    db: Session,

    keyword: str

):

    return db.query(User).filter(

        or_(

            User.first_name.ilike(f"%{keyword}%"),

            User.last_name.ilike(f"%{keyword}%"),

            User.email.ilike(f"%{keyword}%"),

            User.department.ilike(f"%{keyword}%")

        )

    ).all()


# ---------------------------------------
# Users By Role
# ---------------------------------------

def users_by_role(

    db: Session,

    role_id: int

):

    return db.query(User).filter(

        User.role_id == role_id

    ).all()
