from sqlalchemy.orm import Session

from app.models.report import Report
from app.schemas.report import ReportCreate


def get_all_reports(db: Session):
    return db.query(Report).all()


def get_report_by_id(db: Session, report_id: int):
    return db.query(Report).filter(Report.id == report_id).first()


def create_report(db: Session, report: ReportCreate):

    new_report = Report(**report.model_dump())

    db.add(new_report)
    db.commit()
    db.refresh(new_report)

    return new_report


def update_report(db: Session, report_id: int, report: ReportCreate):

    existing = db.query(Report).filter(Report.id == report_id).first()

    if not existing:
        return None

    existing.title = report.title
    existing.department = report.department
    existing.status = report.status
    existing.file_size = report.file_size
    existing.generated_date = report.generated_date

    db.commit()
    db.refresh(existing)

    return existing


def delete_report(db: Session, report_id: int):

    existing = db.query(Report).filter(Report.id == report_id).first()

    if not existing:
        return None

    db.delete(existing)
    db.commit()

    return {"message": "Report deleted successfully"}
