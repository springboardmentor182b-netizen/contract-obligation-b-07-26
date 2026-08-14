import API from "../api/api";

export const getChartData = () => {
  return API.get("/chart");
};