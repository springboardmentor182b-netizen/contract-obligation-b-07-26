def test_contract_crud_and_summary(client):
    payload = {
        "name": "Test Agreement",
        "type": "Services",
        "party": "Test Co",
        "effective": "2026-01-01",
        "expiry": "2027-01-01",
        "status": "Draft",
        "owner": "Test Owner",
        "value": "$1000",
    }
    created = client.post("/api/contracts", json=payload)
    assert created.status_code == 201
    contract = created.json()
    assert contract["name"] == "Test Agreement"

    updated = client.patch(f"/api/contracts/{contract['id']}", json={"status": "Active"})
    assert updated.status_code == 200
    assert updated.json()["status"] == "Active"

    deleted = client.delete(f"/api/contracts/{contract['id']}")
    assert deleted.status_code == 204
    assert client.get(f"/api/contracts/{contract['id']}").status_code == 404


def test_obligation_crud(client):
    payload = {
        "contract_id": "CTR-2024-001",
        "title": "Test obligation",
        "assignee": "Test Owner",
        "due": "2026-12-31",
        "priority": "Medium",
        "status": "Active",
        "category": "Reporting",
    }
    created = client.post("/api/obligations", json=payload)
    assert created.status_code == 201
    obligation_id = created.json()["id"]

    updated = client.patch(f"/api/obligations/{obligation_id}", json={"status": "Completed"})
    assert updated.status_code == 200
    assert updated.json()["status"] == "Completed"

    assert client.delete(f"/api/obligations/{obligation_id}").status_code == 204
