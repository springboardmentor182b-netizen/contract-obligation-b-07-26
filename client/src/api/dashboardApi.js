import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/dashboard",
});

export const getDashboardSummary = () => API.get("/");
export const getActivities = () => API.get("/activities");
export const getNotifications = () => API.get("/notifications");
export const getDeadlines = () => API.get("/deadlines");
export const getProfile = () => API.get("/profile");