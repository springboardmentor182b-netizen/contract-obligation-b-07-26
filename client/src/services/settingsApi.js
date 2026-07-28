/**
 * Settings API service — raw fetch calls only. State/logic lives in
 * hooks/useSettings.js.
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

/** GET /settings/profile -> { id, name, email, department, role } */
export function getProfile() {
  return request('/settings/profile');
}

/**
 * PATCH /settings/profile
 * body: partial { name, email, department }
 * -> same shape as getProfile()
 */
export function updateProfile(payload) {
  return request('/settings/profile', {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

/**
 * POST /settings/password
 * body: { currentPassword, newPassword }
 * -> null (204)
 */
export function changePassword(currentPassword, newPassword) {
  return request('/settings/password', {
    method: 'POST',
    body: JSON.stringify({ currentPassword, newPassword }),
  });
}

/**
 * GET /settings/notifications
 * -> { emailEnabled, smsEnabled, inAppEnabled, renewalReminders,
 *      obligationAlerts, complianceAlerts, approvalAlerts }
 */
export function getNotificationPreferences() {
  return request('/settings/notifications');
}

/**
 * PATCH /settings/notifications
 * body: partial of the shape above
 * -> full updated preferences object
 */
export function updateNotificationPreferences(payload) {
  return request('/settings/notifications', {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

/**
 * GET /settings/organization  (Administrators only)
 * -> { name, timezone, defaultCurrency }
 */
export function getOrganizationSettings() {
  return request('/settings/organization');
}

/**
 * PATCH /settings/organization  (Administrators only)
 * body: partial { name, timezone, defaultCurrency }
 * -> full updated organization settings object
 */
export function updateOrganizationSettings(payload) {
  return request('/settings/organization', {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}
