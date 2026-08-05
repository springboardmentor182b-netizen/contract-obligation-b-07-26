import { API_BASE_URL } from '../features/authentication/constants'

const BASE_URL = `${API_BASE_URL}/api`

function authHeaders() {
  const token = localStorage.getItem('contractiq_token') || sessionStorage.getItem('contractiq_token')
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

async function request(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, { ...options, headers: { ...authHeaders(), ...options.headers } })
  if (!response.ok) throw new Error(`Request failed (${response.status})`)
  return response.status === 204 ? null : response.json()
}

export default BASE_URL
export const getObligations = () => request('/obligations')
export const createObligation = (data) => request('/obligations', { method: 'POST', body: JSON.stringify(data) })
export const updateObligation = (id, data) => request(`/obligations/${id}`, { method: 'PATCH', body: JSON.stringify(data) })
export const deleteObligation = (id) => request(`/obligations/${id}`, { method: 'DELETE' })
