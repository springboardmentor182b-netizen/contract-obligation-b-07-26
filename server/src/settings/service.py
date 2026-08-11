import uuid

from sqlalchemy.orm import Session

from .models import Setting
from .schema import SettingCreate, SettingUpdate


class SettingService:

    @staticmethod
    def get_all_settings(db: Session):
        return db.query(Setting).all()

    @staticmethod
    def get_setting_by_id(db: Session, setting_id: str):
        return (
            db.query(Setting)
            .filter(Setting.id == setting_id)
            .first()
        )

    @staticmethod
    def create_setting(
        db: Session,
        setting: SettingCreate
    ):
        new_id = f"SET-{str(uuid.uuid4())[:8].upper()}"

        db_setting = Setting(
            id=new_id,
            **setting.model_dump()
        )

        db.add(db_setting)
        db.commit()
        db.refresh(db_setting)

        return db_setting

    @staticmethod
    def update_setting(
        db: Session,
        setting_id: str,
        setting: SettingUpdate
    ):
        db_setting = (
            db.query(Setting)
            .filter(Setting.id == setting_id)
            .first()
        )

        if not db_setting:
            return None

        for key, value in setting.model_dump().items():
            setattr(db_setting, key, value)

        db.commit()
        db.refresh(db_setting)

        return db_setting

    @staticmethod
    def delete_setting(
        db: Session,
        setting_id: str
    ):
        db_setting = (
            db.query(Setting)
            .filter(Setting.id == setting_id)
            .first()
        )

        if not db_setting:
            return None

        db.delete(db_setting)
        db.commit()

        return {
            "message": "Setting deleted successfully"
        }