import apiClient from '../utils/axios'

function chatError(error) {
  const detail = error.response?.data?.detail
  if (typeof detail === 'string') return new Error(detail)
  if (!error.response) return new Error('Cannot connect to the ContractIQ API.')
  return new Error('The assistant could not respond. Please try again.')
}

export async function askAssistant(message, history = []) {
  try {
    const response = await apiClient.post('/api/chat/ask', { message, history })
    return response.data
  } catch (error) {
    throw chatError(error)
  }
}
