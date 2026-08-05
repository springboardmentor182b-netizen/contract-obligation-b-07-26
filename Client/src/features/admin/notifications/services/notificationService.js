import API from "../api/api";

export const getNotifications = () =>
  API.get("/notifications");

export const createNotification = (data) =>
  API.post("/notifications", data);

export const updateNotification = (id, data) =>
  API.put(`/notifications/${id}`, data);

export const deleteNotification = (id) =>
  API.delete(`/notifications/${id}`);

export const markAsRead = (id) =>
  API.patch(`/notifications/${id}/read`);

export const markAllRead = () =>
  API.patch("/notifications/read/all");

export const updateNotification = (id, data) =>
  axios.put(`${API_URL}/${id}`, data);