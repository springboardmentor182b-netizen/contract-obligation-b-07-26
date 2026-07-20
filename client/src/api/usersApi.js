import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000/api/users",
});

/**
 * Fetch paginated, filtered, sorted user list.
 * @param {object} params – search, role, status, department, sort_by, sort_order, page, per_page
 */
export const getUsers = (params = {}) => API.get("/", { params });

/** User statistics (total, active, new, blocked) */
export const getUserStats = () => API.get("/stats");

/** Role distribution for the donut chart */
export const getRoleDistribution = () => API.get("/role-distribution");

/** Monthly registration trend for the line/area chart */
export const getRegistrationTrend = () => API.get("/registration-trend");
