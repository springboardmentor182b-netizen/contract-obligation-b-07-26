import React, { useRef } from 'react'
import { Bell, Upload } from 'lucide-react'
import { Link } from 'react-router-dom'
import { importContracts } from '../api'
import { useUser } from '../context/UserContext'
import './Navbar.css'

// Contracts-only navbar: same base layout as the shared navbar, plus Import.
function parseCsv(text) {
  const rows = text.trim().split(/\r?\n/).filter(Boolean)
  if (rows.length < 2) return []

  const columns = (line) => line.split(',').map((value) => value.trim().replace(/^"|"$/g, ''))
  const headers = columns(rows[0]).map((header) => header.toLowerCase().replaceAll(' ', '_'))

  const statusValues = {
    draft: 'Draft', 'under review': 'Under Review', approved: 'Approved',
    active: 'Active', expired: 'Expired', terminated: 'Terminated', archived: 'Archived',
  }

  return rows.slice(1).map((line) => {
    const values = columns(line)
    const row = Object.fromEntries(headers.map((header, index) => [header, values[index]?.trim() || '']))
    return {
      title: row.title || row.name || row.contract_name,
      contract_number: row.contract_number || row.contract_id || '',
      category: row.category || 'Service Agreements',
      counterparty: row.counterparty || row.party || 'Not specified',
      department: row.department || null,
      status: statusValues[String(row.status).trim().toLowerCase()] || 'Draft',
      expiry_date: row.expiry_date || row.expiry || row.end_date || null,
      value: row.value ? Number(row.value.replaceAll(',', '')) : null,
    }
  }).filter((contract) => contract.title)
}

export default function Navbar({ onNewContract, onImportComplete }) {
  const fileInputRef = useRef(null)
  const { userData: user } = useUser()

  const displayName = `${user?.first_name || ''} ${user?.last_name || ''}`.trim() || user?.name || user?.full_name || 'User'
  const initials = displayName.split(' ').filter(Boolean).map((part) => part[0]).join('').slice(0, 2).toUpperCase() || 'U'

  async function logout() {
    const token = window.localStorage.getItem('contractiq_token')
      || window.sessionStorage.getItem('contractiq_token')
      || window.localStorage.getItem('access_token')
    try {
      await fetch(`${import.meta.env.VITE_API_URL || ""}/api/auth/logout`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
    } catch {
      // The local logout still completes if the API is unavailable.
    }
    window.localStorage.removeItem('contractiq_token')
    window.localStorage.removeItem('contractiq_role')
    window.localStorage.removeItem('access_token')
    window.sessionStorage.removeItem('contractiq_token')
    window.sessionStorage.removeItem('contractiq_role')
    window.location.assign('/login')
  }

  async function handleImport(event) {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return

    try {
      const contracts = parseCsv(await file.text())
      if (!contracts.length) {
        window.alert('Choose a CSV with a header row and at least one contract title.')
        return
      }
      const result = await importContracts(contracts)
      onImportComplete?.()
      window.alert(`${result.imported_count} contract${result.imported_count === 1 ? '' : 's'} imported successfully. Linked obligations, renewals, notification, and import report were created.`)
    } catch (error) {
      window.alert(error.message || 'Unable to import contracts. Check the CSV data and try again.')
    }
  }

  return (
    <header className="navbar contracts-navbar">
      <div className="breadcrumb">
        <Link to="/dashboard">ContractIQ</Link>
        <span className="breadcrumb-arrow">&gt;</span>
        <strong>Contracts</strong>
      </div>

      <div className="navbar-actions">
        <input ref={fileInputRef} className="contract-import-input" type="file" accept=".csv,text/csv" onChange={handleImport} />
        <button className="secondary-button contract-import-button" type="button" title="Import contracts from CSV" onClick={() => fileInputRef.current?.click()}>
          <Upload size={16} />
          Import
        </button>
        <button className="primary-button" type="button" onClick={onNewContract}>
          New Contract
        </button>
        <Link className="notification-button" to="/notifications" aria-label="Notifications">
          <Bell size={20} strokeWidth={1.8} aria-hidden="true" />
          <span className="notification-dot" />
        </Link>
        <div className="profile-summary">
          {user?.profile_image
            ? <img className="avatar avatar-image" src={user.profile_image} alt={`${displayName} profile`} />
            : <span className="avatar">{initials}</span>}
          <span className="profile-copy">
            <strong>{displayName}</strong>
            <small>{user?.job_title || user?.role || ''}</small>
          </span>
        </div>
        <button className="logout-button" type="button" onClick={logout}>Logout</button>
      </div>
    </header>
  )
}
