from sqlalchemy.orm import Session
from app.models.obligation import Obligation
from app.schemas.obligation import ObligationCreate


# CREATE
def create_obligation(db: Session, obligation: ObligationCreate):

    db_obligation = Obligation(**obligation.model_dump())

    db.add(db_obligation)

    db.commit()

    db.refresh(db_obligation)

    return db_obligation


# GET ALL
def get_all_obligations(db: Session):

    return db.query(Obligation).all()


# GET ONE
def get_obligation(db: Session, obligation_id: int):

    return db.query(Obligation).filter(
        Obligation.id == obligation_id
    ).first()


# UPDATE

def update_obligation(
    db: Session,
    obligation_id: int,
    obligation
):
    db_obligation = (
        db.query(Obligation)
        .filter(Obligation.id == obligation_id)
        .first()
    )

    if not db_obligation:
        return {"message": "Not Found"}

    db_obligation.title = obligation.title
    db_obligation.department = obligation.department
    db_obligation.owner = obligation.owner
    db_obligation.due_date = obligation.due_date
    db_obligation.priority = obligation.priority
    db_obligation.status = obligation.status

    db.commit()
    db.refresh(db_obligation)

    return db_obligation

# DELETE
def delete_obligation(db: Session, obligation_id: int):

    db_obligation = get_obligation(db, obligation_id)

    if not db_obligation:

        return None

    db.delete(db_obligation)

    db.commit()

    return db_obligation
