import api from "../utils/axios";

// Get All History
export const getHistory = async () => {
    const response = await api.get("/api/history/");
    return response.data;
};

// Get History By ID
export const getHistoryById = async (id) => {
    const response = await api.get(`/api/history/${id}`);
    return response.data;
};

// Create History
export const createHistory = async (history) => {
    const response = await api.post("/api/history/", history);
    return response.data;
};

// Update History
export const updateHistory = async (id, history) => {
    const response = await api.put(`/api/history/${id}`, history);
    return response.data;
};

// Delete History
export const deleteHistory = async (id) => {
    const response = await api.delete(`/api/history/${id}`);
    return response.data;
};
