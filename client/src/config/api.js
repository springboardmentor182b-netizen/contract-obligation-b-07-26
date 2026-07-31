// API Configuration
export const API_BASE_URL = 'http://localhost:8000/api';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login`,
    SIGNUP: `${API_BASE_URL}/auth/signup`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
  },
  USERS: {
    PROFILE: `${API_BASE_URL}/users/profile`,
    LIST: `${API_BASE_URL}/users`,
  }
};
