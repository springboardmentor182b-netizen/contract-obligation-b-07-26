import apiClient from '../utils/axios'

export async function getNotifications() {
  const response = await apiClient.get('/api/notifications')
  return response.data
}

export async function markNotificationRead(id) {
  const response = await apiClient.post(`/api/notifications/${id}/read`)
  return response.data
}

export async function markAllNotificationsRead() {
  const response = await apiClient.post('/api/notifications/read-all')
  return response.data
}
