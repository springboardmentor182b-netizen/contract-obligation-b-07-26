import api from "./axios";

export const getProfile = async () => {
    const response = await api.get("/settings/profile");
    return response.data;
};

export const updateProfile = async (profileData) => {
    const response = await api.put("/settings/profile", profileData);
    return response.data;
};
