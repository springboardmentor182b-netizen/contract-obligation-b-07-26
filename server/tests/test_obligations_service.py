from datetime import datetime

from src.entities.contract import Contract
from src.entities.obligation import Obligation
from src.entities.user import User
from src.obligations.service import _serialize


def test_serialize_obligation_includes_contract_and_assignee():
    contract = Contract(id=4, contract_no="CTR-004", title="Master Services Agreement")
    assignee = User(id=7, first_name="Sarah", last_name="Chen")
    obligation = Obligation(
        id=12,
        title="Submit compliance report",
        due_date=datetime(2026, 8, 30),
        priority="High",
        status="Pending",
        obligation_type="Reporting",
    )
    obligation.contract = contract
    obligation.assignee = assignee

    result = _serialize(obligation)

    assert result == {
        "id": 12,
        "reference": "OBL-012",
        "title": "Submit compliance report",
        "contract": "Master Services Agreement",
        "assignee": {
            "id": 7,
            "name": "Sarah Chen",
            "initials": "SC",
            "color_index": 2,
        },
        "due_date": datetime(2026, 8, 30).date(),
        "priority": "High",
        "status": "Pending",
        "category": "Reporting",
    }


def test_serialize_obligation_handles_missing_contract_and_assignee():
    obligation = Obligation(id=3, title="Review renewal")

    result = _serialize(obligation)

    assert result["reference"] == "OBL-003"
    assert result["contract"] == ""
    assert result["assignee"] is None
    assert result["due_date"] is None
