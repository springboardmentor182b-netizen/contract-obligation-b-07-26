import axios from 'axios';

const api = axios.create({
  // Using the Vite proxy defined in vite.config.js
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': import.meta.env.VITE_API_KEY || ''
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('contractiq_token')
    || sessionStorage.getItem('contractiq_token')
    || localStorage.getItem('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
