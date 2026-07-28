import api from "./axios";

// Get All History
export const getHistory = async () => {
    const response = await api.get("/history/");
    return response.data;
};

// Get History By ID
export const getHistoryById = async (id) => {
    const response = await api.get(`/history/${id}`);
    return response.data;
};

// Create History
export const createHistory = async (history) => {
    const response = await api.post("/history/", history);
    return response.data;
};

// Update History
export const updateHistory = async (id, history) => {
    const response = await api.put(`/history/${id}`, history);
    return response.data;
};

// Delete History
export const deleteHistory = async (id) => {
    const response = await api.delete(`/history/${id}`);
    return response.data;
};
