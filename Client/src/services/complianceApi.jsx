import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const getComplianceOverview = () =>
  API.get("/api/compliance/overview");

export const getRiskIndicators = () =>
  API.get("/api/compliance/risk-indicators");

export const getAuditSummary = () =>
  API.get("/api/compliance/audit-summary");

export const getDepartmentScores = () =>
  API.get("/api/compliance/departments");

export const getMissedObligations = () =>
  API.get("/api/compliance/missed-obligations");

export const getComplianceHistory = () =>
  API.get("/api/compliance/history");

export const getComplianceDocuments = () =>
  API.get("/api/compliance/documents");

export const getComplianceContracts = () =>
  API.get("/api/compliance/contracts");
