import api from '../utils/axios'

export async function getReports() {
  const response = await api.get('/reports/')
  return response.data
}

export async function createReport(report) {
  const response = await api.post('/reports/', report)
  return response.data
}
