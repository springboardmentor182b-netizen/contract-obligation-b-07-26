import axios from 'axios';

const api = axios.create({
  // Use the configured API URL for production, fallback to proxy for development
  baseURL: import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': import.meta.env.VITE_API_KEY || ''
  },
});

// Add authentication token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('contractiq_token') || sessionStorage.getItem('contractiq_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Handle authentication errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Clear tokens and redirect to login
      localStorage.removeItem('contractiq_token');
      localStorage.removeItem('contractiq_role');
      localStorage.removeItem('contractiq_user');
      sessionStorage.removeItem('contractiq_token');
      sessionStorage.removeItem('contractiq_role');
      sessionStorage.removeItem('contractiq_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
