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
    const response = await api.get("/settings/section/security");
    return response.data;
};

export const updateSecurity = async (securityData) => {
    const response = await api.put("/settings/section/security", securityData);
    return response.data;
};

export const getNotifications = async () => {
    const response = await api.get("/settings/section/notifications");
    return response.data;
};

export const updateNotifications = async (notificationsData) => {
    const response = await api.put("/settings/section/notifications", notificationsData);
    return response.data;
};

export const getAppearance = async () => {
    const response = await api.get("/settings/section/appearance");
    return response.data;
};

export const updateAppearance = async (appearanceData) => {
    const response = await api.put("/settings/section/appearance", appearanceData);
    return response.data;
};

export const getOrganization = async () => {
    const response = await api.get("/settings/section/organization");
    return response.data;
};

export const updateOrganization = async (organizationData) => {
    const response = await api.put("/settings/section/organization", organizationData);
    return response.data;
};

export const getIntegrations = async () => {
    const response = await api.get("/settings/section/integrations");
    return response.data;
};

export const updateIntegrations = async (integrationsData) => {
    const response = await api.put("/settings/section/integrations", integrationsData);
    return response.data;
};

export const getApiKeys = async () => (await api.get("/settings/api-keys")).data;
export const createApiKey = async (data) => (await api.post("/settings/api-keys", data)).data;
export const revokeApiKey = async (id) => api.delete(`/settings/api-keys/${id}`);
export const updateWebhook = async (webhook_url) => (await api.put("/settings/api-keys/webhook", { webhook_url })).data;
export const getSecuritySessions = async () => (await api.get("/settings/security/sessions")).data;
export const revokeSecuritySession = async (id) => api.delete(`/settings/security/sessions/${id}`);
