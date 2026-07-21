/**
 * api.js – Centralised fetch wrapper for the ContractIQ API.
 *
 * All requests are sent to /api/* which Vite's dev-server proxies to
 * http://localhost:8000 during development (see vite.config.js).
 */

const BASE = '/api';

/** Get auth token from localStorage */
function getAuthHeader() {
  const token = localStorage.getItem('access_token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

/** Perform a GET request and return parsed JSON. */
async function get(path, params = {}) {
  const url = new URL(path, window.location.origin);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== null && v !== undefined && v !== '') {
      url.searchParams.set(k, v);
    }
  });
  const res = await fetch(url.toString(), {
    headers: getAuthHeader()
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail ?? 'Request failed');
  }
  return res.json();
}

/** Perform a POST request and return parsed JSON. */
async function post(path, data = {}) {
  const res = await fetch(path, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader()
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail ?? 'Request failed');
  }
  return res.json();
}

/** Perform a PUT request and return parsed JSON. */
async function put(path, data = {}) {
  const res = await fetch(path, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader()
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail ?? 'Request failed');
  }
  return res.json();
}

/** Perform a DELETE request and return parsed JSON. */
async function del(path) {
  const res = await fetch(path, {
    method: 'DELETE',
    headers: getAuthHeader()
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(err.detail ?? 'Request failed');
  }
  return res.json();
}

// ── Contracts ──────────────────────────────────────────────────────────────

/**
 * Fetch contracts from the API with optional combined filters.
 * @param {{ status?: string, category?: string, search?: string, skip?: number, limit?: number }} opts
 */
export function fetchContracts({ status, category, search, skip = 0, limit = 200 } = {}) {
  return get(`${BASE}/contracts`, { status, category, search, skip, limit });
}

/**
 * Fetch per-status contract counts for the status cards.
 */
export function fetchContractStats() {
  return get(`${BASE}/contracts/stats/summary`);
}

/**
 * Create a new contract.
 */
export function createContract(contractData) {
  return post(`${BASE}/contracts`, contractData);
}

/**
 * Update an existing contract.
 */
export function updateContract(id, contractData) {
  return put(`${BASE}/contracts/${id}`, contractData);
}

/**
 * Delete a contract.
 */
export function deleteContract(id) {
  return del(`${BASE}/contracts/${id}`);
}

// ── Authentication ─────────────────────────────────────────────────────────────

/**
 * Login with email and password.
 */
export function login(email, password) {
  const formData = new URLSearchParams();
  formData.append('username', email);
  formData.append('password', password);
  
  return fetch(`${BASE}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: formData,
  }).then(res => {
    if (!res.ok) {
      return res.json().then(err => {
        throw new Error(err.detail || 'Login failed');
      });
    }
    return res.json();
  });
}

/**
 * Get current user information.
 */
export function getCurrentUser() {
  return get(`${BASE}/auth/me`);
}
export { get, post, put, del };
