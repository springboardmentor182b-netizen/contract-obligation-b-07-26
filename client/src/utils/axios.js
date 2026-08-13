import axios from 'axios'

const apiClient = axios.create({
  // Callers already use paths beginning with /api.  Keeping the origin here
  // prevents production requests such as /api/api/dashboard.
  baseURL: import.meta.env.VITE_API_URL || '',
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
})

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('contractiq_token')
    || sessionStorage.getItem('contractiq_token')
    || localStorage.getItem('access_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default apiClient
