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

export function getProfile() {
  return request('/settings/profile');
}

export function updateProfile(payload) {
  return request('/settings/profile', {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export function changePassword(currentPassword, newPassword) {
  return request('/settings/password', {
    method: 'POST',
    body: JSON.stringify({ currentPassword, newPassword }),
  });
}

export function getNotificationPreferences() {
  return request('/settings/notifications');
}

export function updateNotificationPreferences(payload) {
  return request('/settings/notifications', {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

export function getOrganizationSettings() {
  return request('/settings/organization');
}

export function updateOrganizationSettings(payload) {
  return request('/settings/organization', {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}
