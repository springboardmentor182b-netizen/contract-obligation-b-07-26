import apiClient from '../utils/axios'
import { API_BASE_URL } from '../features/authentication/constants'

const BASE_URL = `${API_BASE_URL}/api`

async function request(path, options = {}) {
  const response = await apiClient({
    url: `/api${path}`,
    ...options,
  })

  return response.status === 204 ? null : response.data
}

export default BASE_URL
export const getObligations = () => request('/obligations')
export const createObligation = (data) => request('/obligations', { method: 'POST', data })
export const updateObligation = (id, data) => request(`/obligations/${id}`, { method: 'PATCH', data })
export const deleteObligation = (id) => request(`/obligations/${id}`, { method: 'DELETE' })
