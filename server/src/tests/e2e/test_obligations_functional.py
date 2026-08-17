"""
Functional end-to-end tests for the ContractIQ Obligations API.

These tests use the real FastAPI application through TestClient and exercise
the real obligations controller/service/database layers.

The tests create their own User and Contract records because the current
application does not seed demo rows automatically. Each test cleans up the
records it creates, so the suite can be repeated against the development
database without depending on pre-existing obligation data.

Place this file in:
    server/src/tests/e2e/test_obligations_functional.py

Run from the server directory:
    pytest src/tests/e2e/test_obligations_functional.py -q
"""

import uuid
from datetime import date, timedelta

import pytest

from src.database.core import SessionLocal
from src.entities.contract import Contract
from src.entities.obligation import Obligation
from src.entities.user import User


@pytest.fixture
def contract_and_user():
    """Create an isolated User + Contract required by the obligation FK fields."""
    db = SessionLocal()
    unique = uuid.uuid4().hex[:10]

    user = User(
        first_name="Functional",
        last_name="Tester",
        email=f"functional.tester.{unique}@example.com",
        role="Employee",
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    contract = Contract(
        contract_no=f"CTR-FUNC-{unique}",
        title=f"Functional Test Contract {unique}",
        status="Active",
        owner_id=user.id,
        created_by=user.id,
    )
    db.add(contract)
    db.commit()
    db.refresh(contract)

    try:
        yield contract, user
    finally:
        # Remove obligations first because they reference the contract/user.
        db.query(Obligation).filter(
            Obligation.contract_id == contract.id
        ).delete(synchronize_session=False)

        db.query(Contract).filter(
            Contract.id == contract.id
        ).delete(synchronize_session=False)

        db.query(User).filter(
            User.id == user.id
        ).delete(synchronize_session=False)

        db.commit()
        db.close()


def obligation_payload(contract_id, user_id, title="Functional test obligation"):
    """Return a payload matching the current ObligationCreate schema."""
    return {
        "contract_id": contract_id,
        "title": title,
        "description": "Created by the functional test suite.",
        "obligation_type": "Compliance",
        "assigned_to": user_id,
        "due_date": (date.today() + timedelta(days=14)).isoformat(),
        "priority": "High",
        "status": "Pending",
    }


def test_create_get_update_delete_obligation(client, contract_and_user):
    """Verify the complete obligation lifecycle."""
    contract, user = contract_and_user

    payload = obligation_payload(
        contract.id,
        user.id,
        "Complete quarterly compliance audit",
    )

    # CREATE
    create_res = client.post("/api/obligations", json=payload)
    assert create_res.status_code == 201

    created = create_res.json()
    obligation_id = created["id"]

    assert created["id"] == obligation_id
    assert created["reference"] == f"OBL-{obligation_id:03d}"
    assert created["title"] == payload["title"]
    assert created["contract"] == contract.title
    assert created["assignee"]["id"] == user.id
    assert created["assignee"]["name"] == "Functional Tester"
    assert created["assignee"]["initials"] == "FT"
    assert created["due_date"] == payload["due_date"]
    assert created["priority"] == "High"
    assert created["status"] == "Pending"
    assert created["category"] == "Compliance"

    # GET
    get_res = client.get(f"/api/obligations/{obligation_id}")
    assert get_res.status_code == 200
    assert get_res.json() == created

    # UPDATE
    update_res = client.patch(
        f"/api/obligations/{obligation_id}",
        json={
            "status": "Completed",
            "completed_date": date.today().isoformat(),
        },
    )
    assert update_res.status_code == 200

    updated = update_res.json()
    assert updated["id"] == obligation_id
    assert updated["status"] == "Completed"
    assert updated["title"] == payload["title"]

    # DELETE
    delete_res = client.delete(f"/api/obligations/{obligation_id}")
    assert delete_res.status_code == 204
    assert delete_res.content == b""

    # VERIFY DELETION
    missing_res = client.get(f"/api/obligations/{obligation_id}")
    assert missing_res.status_code == 404
    assert missing_res.json()["detail"] == (
        f"Obligation {obligation_id} was not found"
    )


def test_list_obligations_returns_created_obligation(client, contract_and_user):
    """Verify that an existing obligation is returned by the list endpoint."""
    contract, user = contract_and_user

    payload = obligation_payload(
        contract.id,
        user.id,
        "List endpoint functional test",
    )

    create_res = client.post("/api/obligations", json=payload)
    assert create_res.status_code == 201

    response = client.get("/api/obligations")
    assert response.status_code == 200

    data = response.json()
    assert isinstance(data, list)
    assert any(
        obligation["id"] == create_res.json()["id"]
        for obligation in data
    )


def test_status_filter_returns_only_requested_status(
    client, contract_and_user
):
    """Verify the API status query parameter filters obligations correctly."""
    contract, user = contract_and_user

    created_ids = []

    try:
        for title, status_value in [
            ("Pending functional obligation", "Pending"),
            ("Completed functional obligation", "Completed"),
            ("In progress functional obligation", "In Progress"),
        ]:
            payload = obligation_payload(contract.id, user.id, title)
            payload["status"] = status_value

            response = client.post("/api/obligations", json=payload)
            assert response.status_code == 201
            created_ids.append(response.json()["id"])

        response = client.get(
            "/api/obligations",
            params={"status": "Pending"},
        )
        assert response.status_code == 200

        data = response.json()
        titles = {obligation["title"] for obligation in data}

        assert "Pending functional obligation" in titles
        assert "Completed functional obligation" not in titles
        assert "In progress functional obligation" not in titles
        assert all(obligation["status"] == "Pending" for obligation in data)

    finally:
        for obligation_id in created_ids:
            client.delete(f"/api/obligations/{obligation_id}")


def test_search_finds_obligation_by_title(client, contract_and_user):
    """Verify text search finds an obligation by its title."""
    contract, user = contract_and_user

    payload = obligation_payload(
        contract.id,
        user.id,
        "Unique Vendor Compliance Review",
    )

    create_res = client.post("/api/obligations", json=payload)
    assert create_res.status_code == 201

    obligation_id = create_res.json()["id"]

    try:
        response = client.get(
            "/api/obligations",
            params={"search": "Vendor Compliance"},
        )
        assert response.status_code == 200

        data = response.json()
        assert any(
            obligation["id"] == obligation_id
            and obligation["title"] == "Unique Vendor Compliance Review"
            for obligation in data
        )
    finally:
        client.delete(f"/api/obligations/{obligation_id}")


def test_summary_contains_status_counts(client, contract_and_user):
    """Verify the summary endpoint reports counts for created statuses."""
    contract, user = contract_and_user

    created_ids = []

    try:
        for title, status_value in [
            ("Summary Pending", "Pending"),
            ("Summary In Progress", "In Progress"),
            ("Summary Completed", "Completed"),
        ]:
            payload = obligation_payload(contract.id, user.id, title)
            payload["status"] = status_value

            response = client.post("/api/obligations", json=payload)
            assert response.status_code == 201
            created_ids.append(response.json()["id"])

        response = client.get("/api/obligations/summary")
        assert response.status_code == 200

        summary = response.json()
        assert isinstance(summary, list)

        counts = {row["status"]: row["count"] for row in summary}

        assert counts["Pending"] >= 1
        assert counts["In Progress"] >= 1
        assert counts["Completed"] >= 1

    finally:
        for obligation_id in created_ids:
            client.delete(f"/api/obligations/{obligation_id}")


def test_get_nonexistent_obligation_returns_404(client):
    """Verify that requesting a nonexistent obligation returns HTTP 404."""
    missing_id = 999999999

    response = client.get(f"/api/obligations/{missing_id}")

    assert response.status_code == 404
    assert response.json()["detail"] == (
        f"Obligation {missing_id} was not found"
    )


def test_create_obligation_rejects_empty_title(client, contract_and_user):
    """Verify request validation rejects an empty obligation title."""
    contract, user = contract_and_user

    payload = obligation_payload(contract.id, user.id)
    payload["title"] = ""

    response = client.post("/api/obligations", json=payload)

    assert response.status_code == 422
