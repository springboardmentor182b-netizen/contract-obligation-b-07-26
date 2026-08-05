/**
 * Users API service — raw fetch calls only. Business/state logic lives in
 * hooks/useUserManagement.js.
 */

const BASE_URL = import.meta.env?.VITE_API_BASE_URL || process.env.REACT_APP_API_BASE_URL || '/api';

function authHeaders() {
  const token = localStorage.getItem('ciq_access_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...authHeaders(), ...options.headers },
    ...options,
  });

  if (!res.ok) {
    let message = `Request failed (${res.status})`;
    try {
      const body = await res.json();
      message = body.message || body.detail || message;
    } catch {
      // response wasn't JSON, keep default message
    }
    throw new Error(message);
  }

  if (res.status === 204) return null;
  return res.json();
}

/**
 * GET /users?page=1&pageSize=10&search=&role=&status=
 * -> { items: Array<User>, total: number }
 * User = { id, name, email, role, status, department, createdAt, lastLoginAt }
 */
export function getUsers({ page = 1, pageSize = 10, search = '', role = '', status = '' } = {}) {
  const params = new URLSearchParams({ page, pageSize, search, role, status });
  return request(`/users?${params.toString()}`);
}

/** GET /users/{id} -> User */
export function getUser(id) {
  return request(`/users/${id}`);
}

/**
 * POST /users
 * body: { name, email, role, department, password }
 * -> User
 */
export function createUser(payload) {
  return request('/users', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/**
 * PATCH /users/{id}
 * body: partial { name, email, department }
 * -> User
 */
export function updateUser(id, payload) {
  return request(`/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

/**
 * PATCH /users/{id}/role
 * body: { role }
 * -> User
 */
export function updateUserRole(id, role) {
  return request(`/users/${id}/role`, {
    method: 'PATCH',
    body: JSON.stringify({ role }),
  });
}

/**
 * PATCH /users/{id}/status
 * body: { status: 'active' | 'inactive' }
 * -> User
 */
export function updateUserStatus(id, status) {
  return request(`/users/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

/** DELETE /users/{id} -> null (204) */
export function deleteUser(id) {
  return request(`/users/${id}`, { method: 'DELETE' });
}
