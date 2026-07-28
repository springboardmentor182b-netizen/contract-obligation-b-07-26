/**
 * Renewals API service — raw fetch calls only. State lives in
 * hooks/useRenewalsDashboard.js.
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
 * GET /renewals/summary
 * -> { upcomingRenewals, upcomingWindowDays, renewedCount, renewedDeltaVsLastQuarter,
 *      expiredCount, expiredNeedsReview, cancelledCount, cancelledFiscalYear }
 */
export function getRenewalsSummary() {
  return request('/renewals/summary');
}

/**
 * GET /renewals/activity-trend?year=2026
 * -> { year, months: Array<{ month, renewed, expired, upcoming }> }
 */
export function getActivityTrend(year = new Date().getFullYear()) {
  return request(`/renewals/activity-trend?year=${year}`);
}

/**
 * GET /renewals/reminders?limit=5
 * -> { items: Array<{ id, contractName, expiresInDays, urgency }> }
 * urgency is one of: 'critical' | 'soon' | 'upcoming' | 'planned'
 */
export function getReminderSchedule(limit = 5) {
  return request(`/renewals/reminders?limit=${limit}`);
}

/**
 * GET /renewals/pipeline?page=1&pageSize=10&status=&search=
 * -> { items: Array<RenewalItem>, total }
 * RenewalItem = { id, displayId, contractName, counterparty, expiryDate,
 *                 value, status, noticePeriodDays }
 */
export function getPipeline({ page = 1, pageSize = 10, status = '', search = '' } = {}) {
  const params = new URLSearchParams({ page, pageSize, status, search });
  return request(`/renewals/pipeline?${params.toString()}`);
}

/**
 * POST /renewals
 * body: { contractName, counterparty, expiryDate, value, noticePeriodDays }
 * -> RenewalItem
 */
export function createRenewal(payload) {
  return request('/renewals', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/**
 * PATCH /renewals/{id}
 * body: partial RenewalItem fields
 * -> RenewalItem
 */
export function updateRenewal(id, payload) {
  return request(`/renewals/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });
}

/**
 * POST /renewals/{id}/renew
 * body: { newExpiryDate, value }
 * -> RenewalItem (status set to 'renewed', history preserved server-side)
 */
export function renewContract(id, payload) {
  return request(`/renewals/${id}/renew`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

/** DELETE /renewals/{id} -> null (204) */
export function deleteRenewal(id) {
  return request(`/renewals/${id}`, { method: 'DELETE' });
}

/**
 * GET /renewals/reminder-settings
 * -> { thresholds: number[] }  e.g. [14, 60, 90] days
 */
export function getReminderSettings() {
  return request('/renewals/reminder-settings');
}

/**
 * PATCH /renewals/reminder-settings
 * body: { thresholds: number[] }
 * -> { thresholds: number[] }
 */
export function updateReminderSettings(thresholds) {
  return request('/renewals/reminder-settings', {
    method: 'PATCH',
    body: JSON.stringify({ thresholds }),
  });
}
