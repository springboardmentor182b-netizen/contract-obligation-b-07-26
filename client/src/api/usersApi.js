import api from '../utils/axios'

export async function getManagedUsers() {
  const response = await api.get('/api/users')
  return response.data
}

export async function createManagedUser(data) {
  const response = await api.post('/api/auth/register', data)
  return response.data
}

export async function updateManagedUser(id, data) {
  const response = await api.patch(`/api/users/${id}`, data)
  return response.data
}

export async function deleteManagedUser(id) {
  await api.delete(`/api/users/${id}`)
}

export async function getDeletedManagedUsers() {
  const response = await api.get('/api/users/deleted')
  return response.data
}

export async function restoreManagedUser(id) {
  const response = await api.post(`/api/users/${id}/restore`)
  return response.data
}

export async function getUserActivity(id) {
  const response = await api.get(`/api/users/${id}/activities`)
  return response.data
}
