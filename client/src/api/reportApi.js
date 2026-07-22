import api from "./axios";

// Get All Missed Obligations
export const getMissedObligations = async () => {
    const response = await api.get("/missed-obligations/");
    return response.data;
};

// Get Missed Obligation By ID
export const getMissedObligationById = async (id) => {
    const response = await api.get(`/missed-obligations/${id}`);
    return response.data;
};

// Create Missed Obligation
export const createMissedObligation = async (obligation) => {
    const response = await api.post("/missed-obligations/", obligation);
    return response.data;
};

// Update Missed Obligation
export const updateMissedObligation = async (id, obligation) => {
    const response = await api.put(`/missed-obligations/${id}`, obligation);
    return response.data;
};

// Delete Missed Obligation
export const deleteMissedObligation = async (id) => {
    const response = await api.delete(`/missed-obligations/${id}`);
    return response.data;
};
