from sqlalchemy.orm import Session

from app.models.compliance import Compliance
from app.models.report import Report
from app.models.audit import Audit
from app.models.risk import Risk
from app.models.history import History
from app.models.missed_obligation import MissedObligation


def get_dashboard_kpis(db: Session):

    compliances = db.query(Compliance).all()
    reports = db.query(Report).all()
    audits = db.query(Audit).all()
    risks = db.query(Risk).all()
    histories = db.query(History).all()
    missed = db.query(MissedObligation).all()

    compliance_score = 0

    if len(compliances) > 0:

        total_score = sum(
            item.compliance_score
            for item in compliances
        )

        compliance_score = round(
            total_score / len(compliances)
        )

    reports_ready = len(

        [
            report

            for report in reports

            if report.status.lower() == "ready"
        ]

    )

    audit_findings = len(audits)

    high_risks = len(

        [

            risk

            for risk in risks

            if risk.severity.lower() == "high"

        ]

    )

    pending_reviews = len(

        [

            item

            for item in compliances

            if item.status.lower() == "pending"

        ]

    )

    history_records = len(histories)

    missed_obligations = len(missed)

    return {

        "compliance_score": compliance_score,

        "reports_ready": reports_ready,

        "missed_obligations": missed_obligations,

        "audit_findings": audit_findings,

        "high_risks": high_risks,

        "pending_reviews": pending_reviews,

        "history_records": history_records

    }
