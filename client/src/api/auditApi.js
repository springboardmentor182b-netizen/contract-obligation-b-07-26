import api from "../utils/axios";

// Get All Audits
export const getAudits = async () => {
    const response = await api.get("/api/audit/");
    return response.data;
};

// Get Audit By ID
export const getAuditById = async (id) => {
    const response = await api.get(`/api/audit/${id}`);
    return response.data;
};

// Create Audit
export const createAudit = async (audit) => {
    const response = await api.post("/api/audit/", audit);
    return response.data;
};

// Update Audit
export const updateAudit = async (id, audit) => {
    const response = await api.put(`/api/audit/${id}`, audit);
    return response.data;
};

// Delete Audit
export const deleteAudit = async (id) => {
    const response = await api.delete(`/api/audit/${id}`);
    return response.data;
};
