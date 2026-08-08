import axios from "axios";
import { API_BASE_URL } from "../features/authentication/constants";

const API = axios.create({
    baseURL: `${API_BASE_URL}/api`,
});

// Register
export const registerUser = async (userData) => {
    const response = await API.post(
        "/auth/register",
        userData
    );

    return response.data;
};

// Login
export const loginUser = async (credentials) => {
    const response = await API.post(
        "/auth/login",
        credentials
    );

    return response.data;
};

// Forgot Password
export const forgotPassword = async (email) => {
    const response = await API.post(
        "/auth/forgot-password",
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
