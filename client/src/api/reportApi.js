import api from '../utils/axios'

export async function getReports() {
  const response = await api.get('/api/reports')
  return response.data
}

export async function createReport(report) {
  const response = await api.post('/api/reports', report)
  return response.data
}

export async function deleteReport(id) {
  await api.delete(`/api/reports/${id}`)
}

export async function exportReports() {
  const response = await api.get('/api/reports/export/csv', { responseType: 'blob' })
  return response.data
}
