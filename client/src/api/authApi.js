import axios from "axios";
import API_URL from "../config/config";

const API = axios.create({
    baseURL: API_URL,
});

// Register
export const registerUser = async (userData) => {
    const response = await API.post(
        "/register",
        userData
    );

    return response.data;
};

// Login
export const loginUser = async (credentials) => {
    const response = await API.post(
        "/login",
        credentials
    );

    return response.data;
};

// Forgot Password
export const forgotPassword = async (email) => {
    const response = await API.post(
        "/forgot-password",
        {
            email,
        }
    );

    return response.data;
};

// Reset Password
export const resetPassword = async (data) => {
    const response = await API.post(
        "/reset-password",
        data
    );

    return response.data;
};

// Logout
export const logoutUser = async () => {
    const response = await API.post(
        "/logout"
    );

    return response.data;
};

export default API;
