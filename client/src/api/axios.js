import axios from 'axios';

const api = axios.create({
  // Using the Vite proxy defined in vite.config.js
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': import.meta.env.VITE_API_KEY || ''
  },
});

export default api;
