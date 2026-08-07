import api from '../utils/axios'

export async function getAuditLogs() {
  const response = await api.get('/api/audit-logs')
  return response.data
}
