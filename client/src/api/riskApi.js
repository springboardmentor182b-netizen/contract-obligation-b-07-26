import api from "./axios";

// Get All Risks
export const getRisks = async () => {
    const response = await api.get("/risk/");
    return response.data;
};

// Get Risk By ID
export const getRiskById = async (id) => {
    const response = await api.get(`/risk/${id}`);
    return response.data;
};

// Create Risk
export const createRisk = async (risk) => {
    const response = await api.post("/risk/", risk);
    return response.data;
};

// Update Risk
export const updateRisk = async (id, risk) => {
    const response = await api.put(`/risk/${id}`, risk);
    return response.data;
};

// Delete Risk
export const deleteRisk = async (id) => {
    const response = await api.delete(`/risk/${id}`);
    return response.data;
};
