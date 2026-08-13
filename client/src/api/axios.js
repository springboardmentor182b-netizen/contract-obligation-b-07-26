import axios from 'axios';

const api = axios.create({
  // API helpers already use paths beginning with /api.  Do not prepend /api
  // here or the request becomes /api/api/... in production.
  baseURL: import.meta.env.VITE_API_URL || '',
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
