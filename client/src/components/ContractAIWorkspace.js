import React, { useState } from 'react'
import { generateObligationSuggestions, summarizeContract } from '../api/contractAiApi'
import './ContractAIWorkspace.css'

const emptyDraft = { title: '', category: 'Service Agreements', counterparty: '', description: '', expiry_date: '' }

export default function ContractAIWorkspace({ contracts, onCreateObligation }) {
  const [draft, setDraft] = useState(emptyDraft)
  const [summaryContractId, setSummaryContractId] = useState('')
  const [summary, setSummary] = useState(null)
  const [selectedContractId, setSelectedContractId] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [suggestionsProvider, setSuggestionsProvider] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [saved, setSaved] = useState(new Set())

  const updateDraft = (event) => setDraft((current) => ({ ...current, [event.target.name]: event.target.value }))

  function selectContractForSummary(event) {
    const contractId = event.target.value
    setSummaryContractId(contractId)
    const contract = contracts.find((item) => item.id === contractId)
    if (!contract) return
    setDraft({
      title: contract.name || contract.title || '',
      category: contract.category || 'Service Agreements',
      counterparty: contract.party || contract.counterparty || '',
      description: contract.description || '',
      expiry_date: contract.expiry ? String(contract.expiry).slice(0, 10) : '',
    })
  }

  async function handleSummary(event) {
    event.preventDefault()
    setBusy(true); setError(''); setSummary(null)
    try {
      setSummary(await summarizeContract(draft))
    } catch (requestError) {
      setError(requestError.message || 'Unable to create the contract summary.')
    } finally { setBusy(false) }
  }

  async function handleSuggestions() {
    if (!selectedContractId) return
    setBusy(true); setError(''); setSuggestions([]); setSuggestionsProvider(''); setSaved(new Set())
    try {
      const result = await generateObligationSuggestions(selectedContractId)
      setSuggestions(result.suggestions || [])
      setSuggestionsProvider(result.provider || 'AI suggestions')
    } catch (requestError) {
      setError(requestError.message || 'Unable to generate obligations.')
    } finally { setBusy(false) }
  }

  async function addSuggestion(suggestion, index) {
    setError('')
    try {
      await onCreateObligation({ ...suggestion, contract_id: selectedContractId, status: 'Pending' })
      setSaved((current) => new Set([...current, index]))
    } catch (requestError) {
      setError(requestError.message || 'Unable to save the generated obligation.')
    }
  }

  return <section className="contract-ai-workspace">
    <div className="contract-ai-heading"><div><span>AI ASSISTANT</span><h2>Contract Intelligence</h2><p>Summarise contract terms and generate review-ready obligations.</p></div></div>
    {error ? <p className="contract-ai-error">{error}</p> : null}
    <div className="contract-ai-grid">
      <form className="contract-ai-card" onSubmit={handleSummary}>
        <h3>AI Contract Summarizer</h3>
        <select value={summaryContractId} onChange={selectContractForSummary}><option value="">Select a saved contract (optional)</option>{contracts.map((contract) => <option key={contract.id} value={contract.id}>{contract.contract_id} — {contract.name}</option>)}</select>
        <input required name="title" value={draft.title} onChange={updateDraft} placeholder="Contract title" />
        <input name="counterparty" value={draft.counterparty} onChange={updateDraft} placeholder="Counterparty" />
        <select name="category" value={draft.category} onChange={updateDraft}><option>Service Agreements</option><option>IT Services</option><option>Compliance</option><option>Lease Agreements</option></select>
        <textarea name="description" value={draft.description} onChange={updateDraft} placeholder="Paste key contract terms or a short description" rows="3" />
        <input type="date" name="expiry_date" value={draft.expiry_date} onChange={updateDraft} />
        <button type="submit" disabled={busy}>{busy ? 'Analysing...' : 'Generate Summary'}</button>
        {summary ? <div className="contract-ai-result"><span className="ai-provider">{summary.provider || 'AI'}</span><strong>Summary</strong><p>{summary.summary}</p><strong>Key terms</strong><ul>{summary.key_terms.map((term) => <li key={term}>{term}</li>)}</ul><strong>Review flags</strong><ul>{summary.risk_flags.map((flag) => <li key={flag}>{flag}</li>)}</ul></div> : null}
      </form>
      <div className="contract-ai-card">
        <h3>AI Obligation Generator</h3>
        <p>Select a saved contract. Suggested obligations are only saved when you choose <em>Add obligation</em>.</p>
        <select value={selectedContractId} onChange={(event) => setSelectedContractId(event.target.value)}><option value="">Select a contract</option>{contracts.map((contract) => <option key={contract.id} value={contract.id}>{contract.contract_id} — {contract.name}</option>)}</select>
        <button type="button" onClick={handleSuggestions} disabled={busy || !selectedContractId}>{busy ? 'Generating...' : 'Generate Obligations'}</button>
        {suggestions.length ? <span className="ai-provider">{suggestionsProvider}</span> : null}
        {suggestions.map((suggestion, index) => <article className="contract-ai-suggestion" key={`${suggestion.title}-${index}`}><div><strong>{suggestion.title}</strong><p>{suggestion.description}</p><small>{suggestion.obligation_type} · Due {suggestion.due_date} · {suggestion.priority} priority</small></div><button type="button" onClick={() => addSuggestion(suggestion, index)} disabled={saved.has(index)}>{saved.has(index) ? 'Added' : 'Add obligation'}</button></article>)}
      </div>
    </div>
  </section>
}
