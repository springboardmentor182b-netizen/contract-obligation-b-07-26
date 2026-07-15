import CONFIG from "../config/config";

const BASE_URL = CONFIG.BASE_URL;

export default BASE_URL;

// Get all obligations
export async function getObligations() {
    const response = await fetch(`${BASE_URL}/obligations`);
    return response.json();
}

// Create
export async function createObligation(data) {
    const response = await fetch(`${BASE_URL}/obligations`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return response.json();
}

// Update
export async function updateObligation(id, data) {
    const response = await fetch(`${BASE_URL}/obligations/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return response.json();
}

// Delete
export async function deleteObligation(id) {
    const response = await fetch(`${BASE_URL}/obligations/${id}`, {
        method: "DELETE",
    });

    return response.json();
}
