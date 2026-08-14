import API from "../api/api";

export const getPreferences=()=>

API.get("/preferences");

export const updatePreference=(id,data)=>

API.put(`/preferences/${id}`,data);