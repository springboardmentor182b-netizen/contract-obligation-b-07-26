import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const getDashboardSummary = async() =>{
    const response=await API.get("/dashboard/summary");
    return response.data;
}

export const getComplianceLevels = async() =>{
  const response=await API.get("/dashboard/compliance-levels");
  return response.data;
};

export const getContractGrowth = async() =>{
    const response=await API.get("/dashboard/contract-growth");
    return response.data;
}

export const getContractStatus = async() =>{
  const response=await API.get("/dashboard/contract-status");
  return response.data;
};

export const getUpcomingRenewals = async() =>{
  const response=await API.get("/dashboard/upcoming-renewals");
  return response.data;
};

export const getRecentContracts = async() =>{
  const response=await API.get("/dashboard/recent-contracts");
  return response.data;
};