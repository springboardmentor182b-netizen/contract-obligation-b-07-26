import axios from 'axios';

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    import.meta.env.VITE_API_BASE_URL ||
    'https://contractiq-server.onrender.com',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': import.meta.env.VITE_API_KEY || '',
  },
});

api.interceptors.request.use(
  (config) => {
    const token =
      localStorage.getItem('contractiq_token') ||
      sessionStorage.getItem('contractiq_token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
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