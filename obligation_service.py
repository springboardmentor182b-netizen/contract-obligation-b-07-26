from typing import Optional
from app.models.obligation import Obligation, ObligationCreate, ObligationUpdate, Status, Assignee

# ---- In-memory "database" ----
# Swap this out for real DB calls (SQLAlchemy + SQLite/Postgres) later.
# The seed data below matches the obligations shown in the team's Figma design.

_obligations: list[Obligation] = [
    Obligation(
        id=1,
        title="GDPR Data Audit Completion",
        contract="GDPR Data Processing Agreement",
        status=Status.pending,
        priority="High",
        assignee=Assignee(name="David", initials="DP", color="bg-emerald-500"),
        due="Jul 1",
        category="Audit",
    ),
    Obligation(
        id=2,
        title="Salesforce License Renewal Decision",
        contract="Enterprise SaaS License",
        status=Status.pending,
        priority="Medium",
        assignee=Assignee(name="Mark", initials="MJ", color="bg-orange-500"),
        due="Nov 1",
        category="Renewal",
    ),
    Obligation(
        id=3,
        title="Executive Compensation Adjustment",
        contract="Executive Employment Agreement",
        status=Status.pending,
        priority="High",
        assignee=Assignee(name="David", initials="DP", color="bg-emerald-500"),
        due="Sep 1",
        category="HR",
    ),
    Obligation(
        id=4,
        title="NDA Scope Review — Partnership Terms",
        contract="Mutual NDA",
        status=Status.pending,
        priority="Low",
        assignee=Assignee(name="Sarah", initials="SC", color="bg-blue-600"),
        due="Aug 10",
        category="Review",
    ),
    Obligation(
        id=5,
        title="Q2 Compliance Report Submission",
        contract="Master Services Agreement",
        status=Status.in_progress,
        priority="High",
        assignee=Assignee(name="Sarah", initials="SC", color="bg-blue-600"),
        due="Jun 30",
        category="Reporting",
    ),
    Obligation(
        id=6,
        title="AWS Usage Compliance Report",
        contract="Cloud Infrastructure Agreement",
        status=Status.in_progress,
        priority="Medium",
        assignee=Assignee(name="Mark", initials="MJ", color="bg-orange-500"),
        due="Jul 15",
        category="Reporting",
    ),
    Obligation(
        id=7,
        title="APAC Vendor Performance Review",
        contract="APAC Distribution Agreement",
        status=Status.under_review,
        priority="Medium",
        assignee=Assignee(name="James", initials="JL", color="bg-red-500"),
        due="Jun 15",
        category="Review",
    ),
    Obligation(
        id=8,
        title="Q2 Lease Payment — Metropolitan REIT",
        contract="Commercial Lease",
        status=Status.completed,
        priority="Critical",
        assignee=Assignee(name="Lisa", initials="LT", color="bg-purple-500"),
        due="Jun 1",
        category="Payment",
    ),
    Obligation(
        id=9,
        title="Marketing Campaign Legal Review",
        contract="Marketing Agency Retainer",
        status=Status.completed,
        priority="Low",
        assignee=Assignee(name="Sarah", initials="SC", color="bg-blue-600"),
        due="Jun 20",
        category="Review",
    ),
    Obligation(
        id=10,
        title="Annual Insurance Certification",
        contract="Commercial Lease Agreement",
        status=Status.overdue,
        priority="Critical",
        assignee=Assignee(name="Lisa", initials="LT", color="bg-purple-500"),
        due="May 30",
        category="Insurance",
    ),
]

_next_id = 11


def get_obligations(status: Optional[Status] = None, priority: Optional[str] = None) -> list[Obligation]:
    result = _obligations
    if status:
        result = [o for o in result if o.status == status]
    if priority:
        result = [o for o in result if o.priority == priority]
    return result


def get_obligation(obligation_id: int) -> Optional[Obligation]:
    return next((o for o in _obligations if o.id == obligation_id), None)


def create_obligation(payload: ObligationCreate) -> Obligation:
    global _next_id
    new_obligation = Obligation(id=_next_id, **payload.model_dump())
    _obligations.append(new_obligation)
    _next_id += 1
    return new_obligation


def update_obligation(obligation_id: int, payload: ObligationUpdate) -> Optional[Obligation]:
    obligation = get_obligation(obligation_id)
    if not obligation:
        return None
    updated_data = obligation.model_dump()
    updated_data.update({k: v for k, v in payload.model_dump().items() if v is not None})
    updated_obligation = Obligation(**updated_data)
    idx = _obligations.index(obligation)
    _obligations[idx] = updated_obligation
    return updated_obligation


def update_status(obligation_id: int, status: Status) -> Optional[Obligation]:
    return update_obligation(obligation_id, ObligationUpdate(status=status))


def delete_obligation(obligation_id: int) -> bool:
    obligation = get_obligation(obligation_id)
    if not obligation:
        return False
    _obligations.remove(obligation)
    return True
