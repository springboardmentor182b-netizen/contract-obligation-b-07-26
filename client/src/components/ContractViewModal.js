import React from 'react'
import StatusBadge from './StatusBadge'
import './ContractViewModal.css'

function displayDate(value) {
  return value ? new Date(value).toLocaleDateString() : 'Not set'
}

export default function ContractViewModal({ contract, onClose }) {
  if (!contract) return null

  const fields = [
    ['Contract number', contract.contract_id || 'Not set'],
    ['Category', contract.category || 'Not set'],
    ['Department', contract.department || 'Not set'],
    ['Counterparty', contract.party || 'Not set'],
    ['Expiry date', displayDate(contract.expiry)],
    ['Value', contract.value ? `$${Number(contract.value).toLocaleString()}` : 'Not set'],
    ['Version', contract.version || 'Not set'],
  ]

  return <div className="contract-view-backdrop" role="presentation" onMouseDown={onClose}>
    <section className="contract-view-modal" role="dialog" aria-modal="true" aria-labelledby="contract-view-title" onMouseDown={(event) => event.stopPropagation()}>
      <div className="contract-view-heading">
        <div><p>CONTRACT DETAILS</p><h2 id="contract-view-title">{contract.name || 'Contract'}</h2></div>
        <button type="button" className="contract-view-close" aria-label="Close contract details" onClick={onClose}>×</button>
      </div>
      <div className="contract-view-status"><span>Status</span><StatusBadge status={contract.status} /></div>
      <dl className="contract-view-grid">
        {fields.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
      </dl>
      <div className="contract-view-footer"><button type="button" onClick={onClose}>Close</button></div>
    </section>
  </div>
}
