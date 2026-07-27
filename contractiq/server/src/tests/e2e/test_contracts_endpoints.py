def test_list_contracts_returns_seeded_data(client):
    response = client.get("/api/contracts")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 10


def test_get_single_contract(client):
    response = client.get("/api/contracts/CTR-2024-001")
    assert response.status_code == 200
    assert response.json()["party"] == "Accenture LLP"


def test_get_missing_contract_returns_404(client):
    response = client.get("/api/contracts/CTR-9999-999")
    assert response.status_code == 404
