/**
 * Auth business logic — composes authApi.js with localStorage token
 * persistence and access-token refresh scheduling. authContext.jsx is the
 * only thing that should import this; components should use useAuth()
 * instead of importing authService directly.
 */
import * as authApi from '../../services/authApi';

const ACCESS_TOKEN_KEY = 'ciq_access_token';
const REFRESH_TOKEN_KEY = 'ciq_refresh_token';

export function getStoredAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function getStoredRefreshToken() {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
}

function storeTokens({ accessToken, refreshToken }) {
  if (accessToken) localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
  if (refreshToken) localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
}

function clearTokens() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export async function loginUser(email, password) {
  const result = await authApi.login(email, password);
  storeTokens(result);
  return result.user;
}

export async function registerUser(payload) {
  const result = await authApi.register(payload);
  storeTokens(result);
  return result.user;
}

export async function logoutUser() {
  const refreshToken = getStoredRefreshToken();
  try {
    if (refreshToken) await authApi.logout(refreshToken);
  } finally {
    // Always clear local tokens even if the server call fails —
    // being logged out locally is the safe default.
    clearTokens();
  }
}

/**
 * Called on app load to restore a session from a previously-stored token.
 * Returns the user if the access token is still valid, refreshes it once
 * if expired, or returns null if there's no usable session.
 */
export async function restoreSession() {
  const accessToken = getStoredAccessToken();
  if (!accessToken) return null;

  try {
    return await authApi.getCurrentUser(accessToken);
  } catch {
    // Access token likely expired — try refreshing once.
    const refreshToken = getStoredRefreshToken();
    if (!refreshToken) {
      clearTokens();
      return null;
    }
    try {
      const { accessToken: newAccessToken } = await authApi.refreshAccessToken(refreshToken);
      storeTokens({ accessToken: newAccessToken });
      return await authApi.getCurrentUser(newAccessToken);
    } catch {
      clearTokens();
      return null;
    }
  }
}

/** Simple role-check helper used by components/route guards. */
export function userHasRole(user, allowedRoles = []) {
  if (!user) return false;
  if (allowedRoles.length === 0) return true;
  return allowedRoles.includes(user.role);
}
