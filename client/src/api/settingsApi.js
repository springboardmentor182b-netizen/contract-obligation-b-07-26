import api from "./axios";

export const getProfile = async () => {
  const response = await api.get("/api/settings/profile");
  return response.data;
};

export const updateProfile = async (profileData) => {
  const response = await api.put("/api/settings/profile", profileData);
  return response.data;
};

export const getSecurity = async () => {
  const response = await api.get("/api/settings/security");
  return response.data;
};

export const updateSecurity = async (securityData) => {
  const response = await api.put("/api/settings/security", securityData);
  return response.data;
};

export const getNotifications = async () => {
  const response = await api.get("/api/settings/notifications");
  return response.data;
};

export const updateNotifications = async (notificationsData) => {
  const response = await api.put("/api/settings/notifications", notificationsData);
  return response.data;
};

export const getAppearance = async () => {
  const response = await api.get("/api/settings/appearance");
  return response.data;
};

export const updateAppearance = async (appearanceData) => {
  const response = await api.put("/api/settings/appearance", appearanceData);
  return response.data;
};

export const getOrganization = async () => {
  const response = await api.get("/api/settings/organization");
  return response.data;
};

export const updateOrganization = async (organizationData) => {
  const response = await api.put("/api/settings/organization", organizationData);
  return response.data;
};