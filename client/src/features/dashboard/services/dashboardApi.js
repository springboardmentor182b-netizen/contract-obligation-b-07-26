import apiClient from '../../../utils/axios'

function dashboardError(error) {
  const detail = error.response?.data?.detail
  if (typeof detail === 'string') return new Error(detail)
  if (!error.response) return new Error('Cannot connect to the ContractIQ API.')
  return new Error('The dashboard could not be loaded. Please try again.')
}

async function get(path) {
  try {
    const response = await apiClient.get(path)
    return response.data
  } catch (error) {
    throw dashboardError(error)
  }
}

export function getDashboard() {
  return get('/api/dashboard')
}

export function getProfile() {
  return get('/api/users/profile')
}
