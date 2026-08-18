import { post } from '../api'

export function summarizeContract(payload) {
  return post('/api/contracts/ai/summarize', payload)
}

export function generateObligationSuggestions(contractId) {
  return post(`/api/contracts/${contractId}/ai/obligations`)
}
