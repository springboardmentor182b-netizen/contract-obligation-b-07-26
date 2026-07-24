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

import BASE_URL from "./config";

// ==========================
// GET
// ==========================

export async function getCompliance() {

    const response = await fetch(`${BASE_URL}/compliance`);

    if (!response.ok) {

        throw new Error("Failed to fetch Compliance");

    }

    return await response.json();

}

// ==========================
// ADD
// ==========================

export async function addCompliance(data) {

    const response = await fetch(`${BASE_URL}/compliance`, {

        method: "POST",

        headers: {

            "Content-Type": "application/json"

        },

        body: JSON.stringify(data)

    });

    if (!response.ok) {

        throw new Error("Failed to Add Compliance");

    }

    return await response.json();

}

// ==========================
// UPDATE
// ==========================

export async function updateCompliance(id,data){

    const response = await fetch(`${BASE_URL}/compliance/${id}`,{

        method:"PUT",

        headers:{

            "Content-Type":"application/json"

        },

        body:JSON.stringify(data)

    });

    if(!response.ok){

        throw new Error("Failed to Update");

    }

    return await response.json();

}

// ==========================
// DELETE
// ==========================

export async function deleteCompliance(id){

    const response = await fetch(`${BASE_URL}/compliance/${id}`,{

        method:"DELETE"

    });

    if(!response.ok){

        throw new Error("Delete Failed");

    }

    return await response.json();

}

// Delete
export async function deleteObligation(id) {
    const response = await fetch(`${BASE_URL}/obligations/${id}`, {
        method: "DELETE",
    });

    return response.json();
}
