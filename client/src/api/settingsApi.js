import api from "./axios";

export const getProfile = async () => {
    const response = await api.get("/settings/profile");
    return response.data;
};

export const updateProfile = async (profileData) => {
    const response = await api.put("/settings/profile", profileData);
    return response.data;
};

export const getSecurity = async () => {
    const response = await api.get("/settings/security");
    return response.data;
};

export const updateSecurity = async (securityData) => {
    const response = await api.put("/settings/security", securityData);
    return response.data;
};

export const getNotifications = async () => {
    const response = await api.get("/settings/notifications");
    return response.data;
};

export const updateNotifications = async (notificationsData) => {
    const response = await api.put("/settings/notifications", notificationsData);
    return response.data;
};

export const getAppearance = async () => {
    const response = await api.get("/settings/appearance");
    return response.data;
};

export const updateAppearance = async (appearanceData) => {
    const response = await api.put("/settings/appearance", appearanceData);
    return response.data;
};

export const getOrganization = async () => {
    const response = await api.get("/settings/organization");
    return response.data;
};

export const updateOrganization = async (organizationData) => {
    const response = await api.put("/settings/organization", organizationData);
    return response.data;
};
