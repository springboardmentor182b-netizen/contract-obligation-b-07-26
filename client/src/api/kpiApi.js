import api from "./axios";

export const getDashboardKPIs = async () => {

    const response = await api.get("/dashboard/kpis");

    return response.data;

};
