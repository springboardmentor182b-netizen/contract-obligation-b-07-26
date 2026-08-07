import React, { useEffect, useMemo, useState } from 'react'
import { Activity, CheckCircle2, Download, FilePenLine, History, LockKeyhole, ShieldAlert, UsersRound } from 'lucide-react'
import Navbar from '../layout/Navbar'
import PageContainer from '../layout/PageContainer'
import Sidebar from '../layout/Sidebar'
import { getAuditLogs } from '../api/auditLogsApi'
import { getDashboard, getProfile } from '../features/dashboard/services/dashboardApi'
import './AuditLogs.css'

const tabs = ['Activity Logs', 'Contract History', 'Approval Logs', 'Security Logs', 'Change History']

function formatDate(value) {
  if (!value) return '—'
  return new Intl.DateTimeFormat(undefined, { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(value))
}

function moduleName(item) {
  const value = String(item.entity_type || 'system')
  return value.charAt(0).toUpperCase() + value.slice(1).replaceAll('_', ' ')
}

function matchesTab(item, tab) {
  const action = String(item.action || '').toLowerCase()
  const entity = String(item.entity_type || '').toLowerCase()
  if (tab === 'Activity Logs') return true
  if (tab === 'Contract History') return entity === 'contract'
  if (tab === 'Approval Logs') return /approv|review/.test(action)
  if (tab === 'Security Logs') return /login|password|security|access/.test(action) || entity === 'user'
  return /updated|changed|created|deleted|archived/.test(action)
}

function isSecurityEvent(item) {
  const action = String(item.action || '').toLowerCase()
  const module = String(item.entity_type || '').toLowerCase()
  return /login|password|security|access/.test(action) || module === 'security'
}

function isApprovalEvent(item) {
  return /approv|review/.test(String(item.action || '').toLowerCase())
}

export default function AuditLogs() {
  const [logs, setLogs] = useState([])
  const [profile, setProfile] = useState(null)
  const [dashboard, setDashboard] = useState(null)
  const [activeTab, setActiveTab] = useState('Activity Logs')
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => localStorage.getItem('contractiq_sidebar_collapsed') === 'true')

  useEffect(() => {
    let active = true
    Promise.all([getAuditLogs(), getProfile(), getDashboard()])
      .then(([items, user, dashboardData]) => {
        if (!active) return
        setLogs(Array.isArray(items) ? items : [])
        setProfile(user)
        setDashboard(dashboardData)
      })
      .catch((requestError) => active && setError(requestError.message || 'Unable to load audit logs.'))
    return () => { active = false }
  }, [])

  const visibleLogs = useMemo(() => logs.filter((item) => {
    const query = search.trim().toLowerCase()
    const matchesSearch = !query || [item.action, item.entity_type, item.entity_id, item.actor_id].some((value) => String(value || '').toLowerCase().includes(query))
    return matchesTab(item, activeTab) && matchesSearch
  }), [activeTab, logs, search])

  const summary = useMemo(() => ({
    total: logs.length,
    userActions: logs.filter((item) => item.actor_id && !isSecurityEvent(item) && !isApprovalEvent(item)).length,
    security: logs.filter(isSecurityEvent).length,
    approvals: logs.filter(isApprovalEvent).length,
  }), [logs])

  function toggleSidebar() {
    setSidebarCollapsed((current) => {
      const next = !current
      localStorage.setItem('contractiq_sidebar_collapsed', String(next))
      return next
    })
  }

  function exportLogs() {
    const lines = [
      ['User', 'Action', 'Module', 'Timestamp'].join(','),
      ...visibleLogs.map((item) => [profile?.name || 'System user', item.action || '', moduleName(item), formatDate(item.created_at)].map((value) => `"${String(value).replaceAll('"', '""')}"`).join(',')),
    ]
    const file = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(file)
    const link = document.createElement('a')
    link.href = url
    link.download = 'contractiq-audit-logs.csv'
    link.click()
    URL.revokeObjectURL(url)
  }

  return <div className="app-shell">
    <Sidebar profile={profile} stats={dashboard?.stats} collapsed={sidebarCollapsed} onToggle={toggleSidebar} />
    <div className="app-main">
      <Navbar profile={profile} pageTitle="Audit Logs" unreadCount={dashboard?.unread_notifications || 0} actionLabel="Export Logs" onAction={exportLogs} />
      <PageContainer>
        <main className="audit-logs-page">
          <header className="audit-logs-heading">
            <div>
              <h1>Audit &amp; Activity Management</h1>
              <p>Complete audit trail of all user actions, approvals, and system events</p>
            </div>
          </header>

          <section className="audit-stat-grid" aria-label="Audit log summary">
            <Stat icon={<Activity />} tone="blue" value={summary.total} label="Total Events" />
            <Stat icon={<UsersRound />} tone="purple" value={summary.userActions} label="User Actions" />
            <Stat icon={<ShieldAlert />} tone="red" value={summary.security} label="Security Events" />
            <Stat icon={<CheckCircle2 />} tone="green" value={summary.approvals} label="Approvals" />
          </section>

          <section className="audit-log-card">
            <div className="audit-log-toolbar">
              <div className="audit-log-tabs" role="tablist" aria-label="Audit log categories">
                {tabs.map((tab) => <button key={tab} type="button" role="tab" aria-selected={activeTab === tab} className={activeTab === tab ? 'active' : ''} onClick={() => setActiveTab(tab)}>{tab}</button>)}
              </div>
              <label className="audit-log-search"><span>Search</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search logs..." /></label>
            </div>
            {error ? <p className="audit-log-error">{error}</p> : null}
            <div className="audit-log-table-wrap">
              <table className="audit-log-table">
                <thead><tr><th>User</th><th>Action</th><th>Module</th><th>Timestamp</th><th>IP Address</th></tr></thead>
                <tbody>
                  {visibleLogs.map((item) => <tr key={item.id}>
                    <td><span className="audit-user"><span className="audit-user-avatar">{(profile?.name || 'System User').split(' ').map((part) => part[0]).join('').slice(0, 2)}</span>{profile?.name || 'System User'}</span></td>
                    <td><span className="audit-action"><FilePenLine size={16} />{item.action || 'System event'}</span></td>
                    <td><span className="audit-module">{moduleName(item)}</span></td>
                    <td>{formatDate(item.created_at)}</td>
                    <td className="audit-ip-address">{item.ip_address || '—'}</td>
                  </tr>)}
                  {!visibleLogs.length ? <tr><td colSpan="5" className="audit-empty">No audit logs match this selection.</td></tr> : null}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </PageContainer>
    </div>
  </div>
}

function Stat({ icon, tone, value, label }) {
  return <article className="audit-stat-card"><span className={`audit-stat-icon ${tone}`}>{icon}</span><div><strong>{value}</strong><span>{label}</span></div></article>
}
