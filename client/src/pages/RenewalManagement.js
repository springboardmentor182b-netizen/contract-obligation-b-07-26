import React, { useEffect, useMemo, useState } from 'react'

import apiClient from '../utils/axios'
import { getDashboard, getProfile } from '../features/dashboard/services/dashboardApi'
import Navbar from '../layout/Navbar'
import PageContainer from '../layout/PageContainer'
import Sidebar from '../layout/Sidebar'
import './RenewalManagement.css'

function asDate(value) {
  const parsed = value ? new Date(value) : null
  return parsed && !Number.isNaN(parsed.getTime()) ? parsed : null
}

function formatDate(value) {
  const parsed = asDate(value)
  return parsed ? parsed.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : 'Not scheduled'
}

function daysUntil(value) {
  const target = asDate(value)
  if (!target) return null
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  target.setHours(0, 0, 0, 0)
  return Math.round((target - today) / 86400000)
}

function statusKey(value) {
  return String(value || 'upcoming').trim().toLowerCase().replaceAll('_', ' ')
}

function displayStatus(value) {
  return statusKey(value).replace(/\b\w/g, (letter) => letter.toUpperCase())
}

export default function RenewalManagement() {
  const [renewals, setRenewals] = useState([])
  const [contracts, setContracts] = useState([])
  const [profile, setProfile] = useState(null)
  const [dashboard, setDashboard] = useState(null)
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showScheduleForm, setShowScheduleForm] = useState(false)
  const [saving, setSaving] = useState(false)
  const [scheduleForm, setScheduleForm] = useState({ contract_id: '', renewal_date: '', reminder_date: '', remarks: '' })
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => localStorage.getItem('contractiq_sidebar_collapsed') === 'true')

  useEffect(() => {
    let active = true
    Promise.all([apiClient.get('/api/renewals'), apiClient.get('/api/renewals/contracts'), getProfile(), getDashboard()])
      .then(([renewalResponse, contractsResponse, user, dashboardData]) => {
        if (!active) return
        setRenewals(Array.isArray(renewalResponse.data) ? renewalResponse.data : [])
        setContracts(Array.isArray(contractsResponse.data) ? contractsResponse.data : [])
        setProfile(user)
        setDashboard(dashboardData)
      })
      .catch((requestError) => {
        if (!active) return
        setError(requestError.response?.data?.detail || 'Unable to load renewals from PostgreSQL.')
      })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [])

  const visibleRenewals = useMemo(() => renewals.filter((item) => {
    const matchesSearch = String(item.contract_name || '').toLowerCase().includes(search.trim().toLowerCase())
    return matchesSearch && (status === 'all' || statusKey(item.status) === status)
  }), [renewals, search, status])

  const metrics = useMemo(() => ({
    upcoming: renewals.filter((item) => statusKey(item.status) === 'upcoming').length,
    inProgress: renewals.filter((item) => statusKey(item.status) === 'in progress').length,
    expired: renewals.filter((item) => statusKey(item.status) === 'expired' || (daysUntil(item.renewal_date) ?? 0) < 0).length,
    renewed: renewals.filter((item) => statusKey(item.status) === 'completed' || statusKey(item.status) === 'renewed').length,
  }), [renewals])

  function contractDetails(item) {
    const contract = contracts.find((entry) => entry.id === item.contract_id)
    return {
      name: contract?.contract_number || item.contract_name || 'Contract',
      title: contract?.title || 'Contract renewal',
    }
  }

  function toggleSidebar() {
    setSidebarCollapsed((current) => {
      const next = !current
      localStorage.setItem('contractiq_sidebar_collapsed', String(next))
      return next
    })
  }

  async function scheduleRenewal(event) {
    event.preventDefault()
    setSaving(true)
    setError('')
    try {
      const response = await apiClient.post('/api/renewals', scheduleForm)
      const contract = contracts.find((item) => item.id === response.data.contract_id)
      setRenewals((items) => [{ ...response.data, contract_name: contract?.title || contract?.contract_number || 'Contract' }, ...items])
      setScheduleForm({ contract_id: '', renewal_date: '', reminder_date: '', remarks: '' })
      setShowScheduleForm(false)
    } catch (requestError) {
      setError(requestError.response?.data?.detail || 'Unable to schedule the renewal.')
    } finally { setSaving(false) }
  }

  async function initiateRenewal(item) {
    setError('')
    try {
      const response = await apiClient.patch(`/api/renewals/${item.id}`, { status: 'in_progress' })
      setRenewals((items) => items.map((renewal) => renewal.id === item.id ? { ...renewal, ...response.data } : renewal))
    } catch (requestError) {
      setError(requestError.response?.data?.detail || 'Unable to initiate the renewal.')
    }
  }

  return <div className="app-shell">
    <Sidebar profile={profile} stats={dashboard?.stats} collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
    <div className="app-main">
      <Navbar profile={profile} pageTitle="Renewals" unreadCount={dashboard?.unread_notifications || 0} />
      <PageContainer>
        <section className="renewal-management">
          <header className="renewal-page-heading">
            <div><h1>Renewal Management</h1><p>Track contract expirations and renewal workflows.</p></div>
            <button className="schedule-renewal-button" type="button" onClick={() => setShowScheduleForm(true)}>+ Schedule Renewal</button>
          </header>

          {showScheduleForm ? <div className="renewal-modal-backdrop"><form className="renewal-modal" onSubmit={scheduleRenewal}>
            <div className="renewal-modal-heading"><h2>Schedule Renewal</h2><button type="button" onClick={() => setShowScheduleForm(false)} aria-label="Close">×</button></div>
            <label>Contract<select required value={scheduleForm.contract_id} onChange={(event) => setScheduleForm((form) => ({ ...form, contract_id: event.target.value }))}><option value="">Select a contract</option>{contracts.map((contract) => <option key={contract.id} value={contract.id}>{contract.contract_number} — {contract.title}</option>)}</select></label>
            <div className="renewal-form-grid"><label>Renewal Date<input required type="date" value={scheduleForm.renewal_date} onChange={(event) => setScheduleForm((form) => ({ ...form, renewal_date: event.target.value }))} /></label><label>Reminder Date<input type="date" value={scheduleForm.reminder_date} onChange={(event) => setScheduleForm((form) => ({ ...form, reminder_date: event.target.value }))} /></label></div>
            <label>Remarks<textarea value={scheduleForm.remarks} onChange={(event) => setScheduleForm((form) => ({ ...form, remarks: event.target.value }))} placeholder="Optional notes" /></label>
            <div className="renewal-modal-actions"><button type="button" onClick={() => setShowScheduleForm(false)}>Cancel</button><button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Schedule Renewal'}</button></div>
          </form></div> : null}

          <div className="renewal-filters">
            <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search contracts..." aria-label="Search renewals" />
            <select value={status} onChange={(event) => setStatus(event.target.value)} aria-label="Filter by status">
              <option value="all">All Statuses</option><option value="upcoming">Upcoming</option><option value="in progress">In Progress</option><option value="expired">Expired</option><option value="completed">Renewed</option>
            </select>
          </div>

          {error ? <p className="dashboard-error" role="alert">{error}</p> : null}

          <div className="renewal-metrics" aria-label="Renewal summary">
            <div className="renewal-metric upcoming"><span>Upcoming Renewals</span><strong>{metrics.upcoming}</strong></div>
            <div className="renewal-metric progress"><span>In Progress</span><strong>{metrics.inProgress}</strong></div>
            <div className="renewal-metric expired"><span>Expired</span><strong>{metrics.expired}</strong></div>
            <div className="renewal-metric renewed"><span>Renewed</span><strong>{metrics.renewed}</strong></div>
          </div>

          <div className="renewal-list-card">
            <div className="renewal-list-title"><h2>Renewal List</h2><span>{visibleRenewals.length} record{visibleRenewals.length === 1 ? '' : 's'}</span></div>
            <div className="renewal-table-wrap"><table><thead><tr><th>Contract</th><th>Renewal Date</th><th>Reminder Date</th><th>Status</th><th>Remarks</th><th>Action</th></tr></thead>
              <tbody>
                {loading ? <tr><td colSpan="6" className="renewal-empty">Loading renewals...</td></tr> : null}
                {!loading && !visibleRenewals.length ? <tr><td colSpan="6" className="renewal-empty">No renewal records found.</td></tr> : null}
                {visibleRenewals.map((item) => {
                  const contract = contractDetails(item)
                  return <tr key={item.id}>
                  <td><strong>{contract.name}</strong><small>{contract.title}</small></td>
                  <td>{formatDate(item.renewal_date)}</td><td>{formatDate(item.reminder_date)}</td>
                  <td><span className={`renewal-status ${statusKey(item.status).replaceAll(' ', '-')}`}>{displayStatus(item.status)}</span></td>
                  <td>{item.remarks || '—'}</td>
                  <td><button className="initiate-renewal-button" type="button" onClick={() => initiateRenewal(item)} disabled={statusKey(item.status) === 'in progress' || statusKey(item.status) === 'completed'}>{statusKey(item.status) === 'in progress' ? 'In Progress' : 'Initiate Renewal'}</button></td>
                </tr>})}
              </tbody>
            </table></div>
          </div>
        </section>
      </PageContainer>
    </div>
  </div>
}
