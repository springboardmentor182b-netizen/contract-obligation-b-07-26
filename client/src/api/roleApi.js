import axios from "axios";
import { API_BASE_URL } from "../features/authentication/constants";

const ROLE_API = `${API_BASE_URL}/api/roles`;

// Get All Roles
export const getRoles = async () => {

    try {

        const response = await axios.get(ROLE_API);

        return response.data;

    }

    catch (error) {

        console.error("Error fetching roles:", error);

        throw error;

    }

};

// Get Role By ID
export const getRole = async (id) => {

    try {

        const response = await axios.get(`${ROLE_API}/${id}`);

        return response.data;

    }

    catch (error) {

        console.error("Error fetching role:", error);

        throw error;

    }

};
