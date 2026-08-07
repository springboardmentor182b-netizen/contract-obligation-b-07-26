

const BASE_URL = import.meta.env?.VITE_API_BASE_URL || process.env.REACT_APP_API_BASE_URL || '/api';

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
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

  // 204 No Content etc.
  if (res.status === 204) return null;
  return res.json();
}


export function getReportsSummary() {
  return request('/reports/summary');
}

/**
 * GET /reports/monthly-activity?year=2026
 * -> { year: number, months: Array<{ month: string, generated: number, scheduled: number }> }
 */
export function getMonthlyActivity(year = new Date().getFullYear()) {
  return request(`/reports/monthly-activity?year=${year}`);
}

/**
 * GET /reports/library?page=1&pageSize=10&filter=
 * -> { items: Array<{ id, name, type, createdAt, status }>, total: number }
 */
export function getReportLibrary({ page = 1, pageSize = 10, filter = '' } = {}) {
  const params = new URLSearchParams({ page, pageSize, filter });
  return request(`/reports/library?${params.toString()}`);
}

/**
 * POST /reports/export
 * body: { type: 'compliance' | 'contract-summary' | 'obligation' | 'user-activity' | 'audit-trail' }
 * -> { downloadUrl: string }
 */
export function exportReport(type) {
  return request('/reports/export', {
    method: 'POST',
    body: JSON.stringify({ type }),
  });
}

/**
 * POST /reports/schedule
 * body: { reportType: string, frequency: string, recipients: string[] }
 * -> { id: string, nextRunAt: string }
 */
export function scheduleReport(payload) {
  return request('/reports/schedule', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
