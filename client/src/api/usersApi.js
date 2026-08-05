import api from '../utils/axios'

export async function getManagedUsers() {
  const response = await api.get('/api/users')
  return response.data
}

export async function createManagedUser(data) {
  const response = await api.post('/api/auth/register', data)
  return response.data
}
