from sqlalchemy.orm import Session

from app.models.obligation import Obligation
from app.schemas.obligation import ObligationCreate, ObligationUpdate


class ObligationService:
    def list_all(self, db: Session):
        return db.query(Obligation).order_by(Obligation.id).all()

    def get_by_id(self, db: Session, obligation_id: int):
        return (
            db.query(Obligation)
            .filter(Obligation.id == obligation_id)
            .first()
        )

    def create(self, db: Session, payload: ObligationCreate):
        obligation = Obligation(**payload.model_dump())

        db.add(obligation)
        db.commit()
        db.refresh(obligation)

        return obligation

    def update(
        self,
        db: Session,
        obligation_id: int,
        payload: ObligationUpdate,
    ):
        obligation = self.get_by_id(db, obligation_id)

        if obligation is None:
            return None

        update_data = payload.model_dump(exclude_unset=True)

        for field, value in update_data.items():
            setattr(obligation, field, value)

        db.commit()
        db.refresh(obligation)

        return obligation

    def delete(self, db: Session, obligation_id: int):
        obligation = self.get_by_id(db, obligation_id)

        if obligation is None:
            return False

        db.delete(obligation)
        db.commit()

        return True


obligation_service = ObligationService()