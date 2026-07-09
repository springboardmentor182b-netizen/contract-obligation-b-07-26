const BASE_URL = "http://localhost:8000/obligations";

export async function fetchObligations() {
  const res = await fetch(`${BASE_URL}/`);
  if (!res.ok) throw new Error("Failed to fetch obligations");
  return res.json();
}

export async function createObligation(data) {
  const res = await fetch(`${BASE_URL}/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create obligation");
  return res.json();
}

export async function updateObligationStatus(id, status) {
  const res = await fetch(
    `${BASE_URL}/${id}/status?status=${encodeURIComponent(status)}`,
    { method: "PATCH" }
  );
  if (!res.ok) throw new Error("Failed to update status");
  return res.json();
}

export async function deleteObligation(id) {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok && res.status !== 204) throw new Error("Failed to delete obligation");
}
