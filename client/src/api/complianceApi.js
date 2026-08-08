import api from "../utils/axios";

// ==============================
// GET ALL COMPLIANCE RECORDS
// ==============================

export const getCompliance = async () => {

    const response = await api.get("/api/compliance/");

    return response.data;

};


// ==============================
// GET COMPLIANCE BY ID
// ==============================

export const getComplianceById = async (id) => {

    const response = await api.get(`/api/compliance/${id}`);

    return response.data;

};


// ==============================
// CREATE COMPLIANCE
// ==============================

export const createCompliance = async (compliance) => {

    const response = await api.post(
        "/api/compliance/",
        compliance
    );

    return response.data;

};


// ==============================
// UPDATE COMPLIANCE
// ==============================

export const updateCompliance = async (id, compliance) => {

    const response = await api.put(
        `/api/compliance/${id}`,
        compliance
    );

    return response.data;

};


// ==============================
// DELETE COMPLIANCE
// ==============================

export const deleteCompliance = async (id) => {

    const response = await api.delete(
        `/api/compliance/${id}`
    );

    return response.data;

};
