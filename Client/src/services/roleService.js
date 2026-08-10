import { api } from "../utils/api";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getToken = () => api.getToken();

const getHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
  "Content-Type": "application/json",
});

export async function getRoles() {
  const response = await fetch(`${API_BASE_URL}/roles/`, {
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
}

export async function createRole(roleData) {
  const response = await fetch(`${API_BASE_URL}/roles/`, {
    method: "POST",
    headers: getHeaders(),
    body: JSON.stringify(roleData),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
}

export async function updateRole(id, roleData) {
  const response = await fetch(`${API_BASE_URL}/roles/${id}`, {
    method: "PUT",
    headers: getHeaders(),
    body: JSON.stringify(roleData),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
}

export async function deleteRole(id) {
  const response = await fetch(`${API_BASE_URL}/roles/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
}