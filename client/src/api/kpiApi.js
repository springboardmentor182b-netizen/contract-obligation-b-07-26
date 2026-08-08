import api from "../utils/axios";

export const getDashboardKPIs = async () => {

    const response = await api.get("/api/dashboard/kpis");

    return response.data;

};
