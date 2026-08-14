import { useEffect, useState } from 'react'
import { fetchContracts, createObligation } from '../api'
import { generateObligationSuggestions } from '../api/contractAiApi'
import './ObligationAIWorkspace.css'

export default function ObligationAIWorkspace({ onCreated }) {
  const [contracts, setContracts] = useState([])
  const [contractId, setContractId] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [provider, setProvider] = useState('')
  const [saving, setSaving] = useState(new Set())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchContracts()
      .then((rows) => setContracts(Array.isArray(rows) ? rows : []))
      .catch(() => setError('Unable to load contracts for AI suggestions.'))
  }, [])

  async function generate() {
    if (!contractId) return
    setLoading(true)
    setError('')
    setSuggestions([])
    setProvider('')
    setSaving(new Set())
    try {
      const result = await generateObligationSuggestions(contractId)
      setSuggestions(result.suggestions || [])
      setProvider(result.provider || 'AI suggestions')
    } catch (requestError) {
      setError(requestError.message || 'Unable to generate obligation suggestions.')
    } finally {
      setLoading(false)
    }
  }

  async function addSuggestion(suggestion, index) {
    setError('')
    try {
      await createObligation({ ...suggestion, contract_id: contractId, status: 'Pending' })
      setSaving((current) => new Set([...current, index]))
      await onCreated?.()
    } catch (requestError) {
      setError(requestError.message || 'Unable to save the generated obligation.')
    }
  }

  return <section className="obligation-ai-workspace">
    <div>
      <span>AI ASSISTANT</span>
      <h2>AI Obligation Generator</h2>
      <p>Select a saved contract to generate review-ready obligation drafts. Nothing is saved until you select <em>Add obligation</em>.</p>
    </div>
    <div className="obligation-ai-controls">
      <select value={contractId} onChange={(event) => setContractId(event.target.value)}>
        <option value="">Select a contract</option>
        {contracts.map((contract) => <option key={contract.id} value={contract.id}>{contract.contract_id} — {contract.name}</option>)}
      </select>
      <button type="button" onClick={generate} disabled={!contractId || loading}>{loading ? 'Generating…' : 'Generate obligations'}</button>
    </div>
    {error ? <p className="obligation-ai-error">{error}</p> : null}
    {suggestions.length ? <span className="ai-provider">{provider}</span> : null}
    {suggestions.map((suggestion, index) => <article className="obligation-ai-suggestion" key={`${suggestion.title}-${index}`}>
      <div><strong>{suggestion.title}</strong><p>{suggestion.description}</p><small>{suggestion.obligation_type} · Due {suggestion.due_date} · {suggestion.priority} priority</small></div>
      <button type="button" onClick={() => addSuggestion(suggestion, index)} disabled={saving.has(index)}>{saving.has(index) ? 'Added' : 'Add obligation'}</button>
    </article>)}
  </section>
}
