import React, { useState } from 'react'
import { summarizeContract } from '../api/contractAiApi'
import './ContractAIWorkspace.css'

export default function ContractAIWorkspace({ contracts }) {
  const [summaryContractId, setSummaryContractId] = useState('')
  const [summary, setSummary] = useState(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function handleSummary(event) {
    event.preventDefault()
    if (!summaryContractId) return
    setBusy(true)
    setError('')
    setSummary(null)
    try {
      setSummary(await summarizeContract({ contract_id: summaryContractId }))
    } catch (requestError) {
      setError(requestError.message || 'Unable to create the contract summary.')
    } finally {
      setBusy(false)
    }
  }

  return <section className="contract-ai-workspace">
    <div className="contract-ai-heading"><div><span>AI ASSISTANT</span><h2>AI Contract Summarizer</h2><p>Select a saved contract to generate a plain-language summary and review flags.</p></div></div>
    {error ? <p className="contract-ai-error">{error}</p> : null}
    <div className="contract-ai-grid contract-ai-single-card">
      <form className="contract-ai-card" onSubmit={handleSummary}>
        <h3>Select a Contract</h3>
        <select required value={summaryContractId} onChange={(event) => { setSummaryContractId(event.target.value); setSummary(null); setError('') }}>
          <option value="">Select a saved contract</option>
          {contracts.map((contract) => <option key={contract.id} value={contract.id}>{contract.contract_id} — {contract.name}</option>)}
        </select>
        <button type="submit" disabled={busy || !summaryContractId}>{busy ? 'Analysing...' : 'Generate Summary'}</button>
        {summary ? <div className="contract-ai-result"><span className="ai-provider">{summary.provider || 'AI'}</span><strong>Summary</strong><p>{summary.summary}</p><strong>Key terms</strong><ul>{summary.key_terms.map((term) => <li key={term}>{term}</li>)}</ul><strong>Review flags</strong><ul>{summary.risk_flags.map((flag) => <li key={flag}>{flag}</li>)}</ul></div> : null}
      </form>
    </div>
  </section>
}
