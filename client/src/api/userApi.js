import axios from "axios";
import API_URL from "../config/config";

const API = axios.create({
    baseURL: API_URL,
});

// Add JWT token automatically to every request
API.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// ==========================
// Dashboard APIs
// ==========================

// Get Dashboard Statistics
export const getDashboardStats = async () => {

    const response = await API.get("/dashboard/stats");

    return response.data;

};

// ==========================
// User APIs
// ==========================

// Get All Users
export const getUsers = async () => {

    const response = await API.get("/users");

    return response.data;

};

// Get User By ID
export const getUserById = async (id) => {

    const response = await API.get(`/users/${id}`);

    return response.data;

};

// Create User
export const createUser = async (userData) => {

    const response = await API.post(
        "/users",
        userData
    );

    return response.data;

};

// Update User
export const updateUser = async (id, userData) => {

    const response = await API.put(
        `/users/${id}`,
        userData
    );

    return response.data;

};

// Delete User
export const deleteUser = async (id) => {

    const response = await API.delete(
        `/users/${id}`
    );

    return response.data;

};

// Search Users
export const searchUsers = async (keyword) => {

    const response = await API.get(
        `/users/search?keyword=${keyword}`
    );

    return response.data;

};

// Get Users By Role
export const getUsersByRole = async (role) => {

    const response = await API.get(
        `/users/role/${role}`
    );

    return response.data;

};

// Get User Profile
export const getProfile = async () => {

    const response = await API.get("/profile");

    return response.data;

};

// Update Profile
export const updateProfile = async (profileData) => {

    const response = await API.put(
        "/profile",
        profileData
    );

    return response.data;

};

export default API;
