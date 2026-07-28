import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const getUsers = () => API.get("/users");
export const createUser = (user) => API.post("/users", user);
export const updateUser = (id, user) => API.put(`/users/${id}`, user);
export const deleteUser = (id) => API.delete(`/users/${id}`);