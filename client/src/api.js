/**
 * api.js – Centralised fetch wrapper for the ContractIQ API.
 *
 * All requests are sent to /api/* which Vite's dev-server proxies to
 * http://localhost:8000 during development (see vite.config.js).
 */

const BASE = '/api';

function errorMessage(detail, fallback = 'Request failed') {
  if (typeof detail === 'string') return detail;
  if (Array.isArray(detail)) {
    return detail.map((item) => {
      if (typeof item === 'string') return item;
      const field = Array.isArray(item?.loc) ? item.loc.filter((part) => part !== 'body').join('.') : '';
      return field ? `${field}: ${item?.msg || 'Invalid value'}` : item?.msg || 'Invalid request';
    }).join('. ');
  }
  return fallback;
}

/** Get auth token from localStorage */
function getAuthHeader() {
  const token = localStorage.getItem('contractiq_token')
    || sessionStorage.getItem('contractiq_token')
    || localStorage.getItem('access_token');
  return token ? { 'Authorization': `Bearer ${token}` } : {};
}

/** Perform a GET request and return parsed JSON. */
async function get(path, params = {}) {
  const url = new URL(path, window.location.origin);
  Object.entries(params).forEach(([k, v]) => {
    if (['string', 'number', 'boolean'].includes(typeof v) && v !== '') {
      url.searchParams.set(k, v);
    }
  });
  const res = await fetch(url.toString(), {
    headers: getAuthHeader()
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(errorMessage(err.detail));
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
    throw new Error(errorMessage(err.detail));
  }
  return res.json();
}

/** Perform a PUT request and return parsed JSON. */
async function put(path, data = {}) {
  const res = await fetch(path, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeader()
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ detail: res.statusText }));
    throw new Error(errorMessage(err.detail));
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
    throw new Error(errorMessage(err.detail));
  }
  return res.status === 204 ? null : res.json();
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

export function fetchUsers() {
  return get(`${BASE}/users`);
}

/**
 * Create a new contract.
 */
export function createContract(contractData) {
  return post(`${BASE}/contracts`, contractData);
}

export function importContracts(contracts) {
  return post(`${BASE}/contracts/import`, contracts);
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

/**
 * Export contracts to CSV.
 */
export function exportContractsCSV(params = {}) {
  const url = new URL(`${BASE}/contracts/export/csv`, window.location.origin);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== null && v !== undefined && v !== '') {
      url.searchParams.set(k, v);
    }
  });
  
  return fetch(url.toString(), {
    headers: getAuthHeader()
  }).then(res => {
    if (!res.ok) throw new Error('Export failed');
    return res.blob();
  });
}

/**
 * Export contracts to Excel.
 */
export function exportContractsExcel(params = {}) {
  const url = new URL(`${BASE}/contracts/export/excel`, window.location.origin);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== null && v !== undefined && v !== '') {
      url.searchParams.set(k, v);
    }
  });
  
  return fetch(url.toString(), {
    headers: getAuthHeader()
  }).then(res => {
    if (!res.ok) throw new Error('Export failed');
    return res.blob();
  });
}

export function exportDashboardCSV() {
  return fetch(`${BASE}/dashboard/export/csv`, { headers: getAuthHeader() }).then(async (res) => {
    if (!res.ok) {
      const error = await res.json().catch(() => ({ detail: 'Dashboard export failed' }));
      throw new Error(error.detail || 'Dashboard export failed');
    }
    return res.blob();
  });
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

// ── Obligations ─────────────────────────────────────────────────────────────

/** Fetch all obligations */
export function getObligations() {
  return get(`${BASE}/obligations/`);
}

/** Create a new obligation */
export function createObligation(data) {
  return post(`${BASE}/obligations/`, data);
}

/** Update an obligation */
export function updateObligation(id, data) {
  return put(`${BASE}/obligations/${id}`, data);
}

/** Delete an obligation */
export function deleteObligation(id) {
  return del(`${BASE}/obligations/${id}`);
}

export { get, post, put, del };
