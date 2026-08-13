import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

export const getObligations = () =>
  API.get("/obligations");

export const getObligationStats = () =>
  API.get("/obligations/stats");

export const addObligation = (data) =>
  API.post("/obligations", data);

export const updateObligation = (id, data) =>
  API.put(`/obligations/${id}`, data);

export const deleteObligation = (id) =>
  API.delete(`/obligations/${id}`);