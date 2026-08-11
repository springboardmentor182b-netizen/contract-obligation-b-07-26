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
 * GET /analytics/overview
 * -> { activeContracts, activeContractsDelta, pendingObligations, pendingObligationsDelta,
 *      complianceRate, complianceRateDeltaPts, upcomingRenewals, upcomingRenewalsWindowDays }
 */
export function getOverview() {
  return request('/analytics/overview');
}

/**
 * GET /analytics/growth-trend?range=3M
 * range is one of: '7D' | '1M' | '3M' | 'YTD'
 * -> { range, points: Array<{ period, contracts, obligations }> }
 */
export function getGrowthTrend(range = '3M') {
  return request(`/analytics/growth-trend?range=${range}`);
}

/**
 * GET /analytics/performance-metrics
 * -> { items: Array<{ label, valuePercent, color }> }
 */
export function getPerformanceMetrics() {
  return request('/analytics/performance-metrics');
}

/**
 * GET /analytics/department-performance
 * -> { departments: Array<{ name, activeContracts, complianceScore }> }
 */
export function getDepartmentPerformance() {
  return request('/analytics/department-performance');
}

/**
 * GET /analytics/recent-activities?limit=5
 * -> { items: Array<{ id, type, title, subtitle, timestamp }> }
 * type is one of: 'contract_uploaded' | 'obligation_completed' | 'compliance_risk' | 'renewal_reminder' | 'security_audit'
 */
export function getRecentActivities(limit = 5) {
  return request(`/analytics/recent-activities?limit=${limit}`);
}
