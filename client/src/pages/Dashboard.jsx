import { useEffect, useMemo, useState } from 'react'

const API_BASE_URL = 'http://127.0.0.1:8000'

const reportMetricConfig = [
  { label: 'Total Contracts', tone: 'blue', icon: 'doc', getValue: () => 0 },
  { label: 'Active', tone: 'green', icon: 'check', getValue: () => 0 },
  { label: 'Expiring 30D', tone: 'orange', icon: 'alert', getValue: () => 0 },
  { label: 'Total Value', tone: 'purple', icon: 'money', getValue: () => 0 },
  { label: 'Compliance', tone: 'teal', icon: 'shield', getValue: () => 0 },
  { label: 'Pending Review', tone: 'red', icon: 'clock', getValue: () => 0 },
]

const navItems = [
  { label: 'Dashboard', icon: 'dashboard' },
  { label: 'Contracts', icon: 'contracts' },
  { label: 'Repository', icon: 'repository' },
  { label: 'Obligations', icon: 'obligations' },
  { label: 'Renewals', icon: 'renewals' },
  { label: 'Compliance', icon: 'compliance' },
  { label: 'Reports', icon: 'reports' },
  { label: 'Notifications', icon: 'notifications' },
  { label: 'Audit Logs', icon: 'audit' },
  { label: 'Users', icon: 'users' },
  { label: 'Settings', icon: 'settings' },
]

const statusBreakdownConfig = [
  { label: 'Active', color: '#10b981', keys: ['active'] },
  { label: 'Under Review', color: '#f59e0b', keys: ['under review', 'review'] },
  { label: 'Draft', color: '#cbd5e1', keys: ['draft'] },
  { label: 'Approved', color: '#2563eb', keys: ['approved', 'generated'] },
  { label: 'Expired', color: '#fb7185', keys: ['expired'] },
  { label: 'Terminated', color: '#e11d48', keys: ['terminated'] },
]

export function Dashboard({ userRole }) {
  const [activeView, setActiveView] = useState('Dashboard')
  const [currentUser, setCurrentUser] = useState(null)
  const [reports, setReports] = useState([])
  const [reportsStatus, setReportsStatus] = useState('idle')
  const isReportsView = activeView === 'Reports'
  const pageTitle = isReportsView ? 'Reports Dashboard' : 'Dashboard'
  const breadcrumb = isReportsView ? 'Reports' : 'Dashboard'
  const profileName = currentUser?.name || currentUser?.email || ''
  const profileInitials = getInitials(profileName)
  const profileRole = currentUser?.role || userRole || ''
  const welcomeText = isReportsView
    ? `Welcome back${profileName ? `, ${profileName}` : ''}. Here's your reporting activity today.`
    : `Welcome back${profileName ? `, ${profileName}` : ''}. Here's what's happening today.`
  const metrics = useMemo(
    () =>
      reportMetricConfig.map((metric) => ({
        ...metric,
        value: metric.getValue(reports),
      })),
    [reports],
  )
  const statusBreakdown = useMemo(() => {
    const counts = statusBreakdownConfig.map((statusItem) => {
      const value = reports.filter((report) => {
        const status = String(report.status || '').toLowerCase()
        return statusItem.keys.includes(status)
      }).length

      return { ...statusItem, value }
    })
    const maxValue = Math.max(...counts.map((item) => item.value), 0)

    return counts.map((item) => ({
      ...item,
      width: maxValue > 0 ? `${(item.value / maxValue) * 100}%` : '0%',
    }))
  }, [reports])

  useEffect(() => {
    const token = window.localStorage.getItem('contractiq_token')
    if (!token) {
      return
    }

    let isMounted = true

    fetch(`${API_BASE_URL}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to load user')
        }
        return response.json()
      })
      .then((data) => {
        if (isMounted) {
          setCurrentUser(data)
        }
      })
      .catch(() => {
        if (isMounted) {
          setCurrentUser(null)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    if (!isReportsView || reportsStatus !== 'idle') {
      return
    }

    const token = window.localStorage.getItem('contractiq_token')
    if (!token) {
      return
    }

    let isMounted = true
    setReportsStatus('loading')

    fetch(`${API_BASE_URL}/api/reports`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Unable to load reports')
        }
        return response.json()
      })
      .then((data) => {
        if (isMounted) {
          setReports(Array.isArray(data) ? data : [])
          setReportsStatus('success')
        }
      })
      .catch(() => {
        if (isMounted) {
          setReports([])
          setReportsStatus('error')
        }
      })

    return () => {
      isMounted = false
    }
  }, [isReportsView, reportsStatus])

  return (
    <main className="contract-dashboard">
      <aside className="dashboard-sidebar">
        <div className="sidebar-brand">
          <span className="sidebar-logo">C</span>
          <strong>ContractIQ</strong>
        </div>

        <nav className="sidebar-nav" aria-label="Dashboard navigation">
          {navItems.map((item) => (
            <button
              className={activeView === item.label ? 'nav-item active' : 'nav-item'}
              key={item.label}
              onClick={() => setActiveView(item.label)}
              type="button"
            >
              <span className={`nav-icon ${item.icon}`} aria-hidden="true" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-user">
          <span className="user-avatar">{profileInitials}</span>
          <div>
            <strong>{profileName}</strong>
            <small>{profileRole}</small>
          </div>
        </div>
      </aside>

      <section className="dashboard-workspace">
        <header className="topbar">
          <div>
            <p>
              ContractIQ / <strong>{breadcrumb}</strong>
            </p>
            <h1>{pageTitle}</h1>
          </div>
          <label className="dashboard-search">
            <span>Search</span>
            <input placeholder="Search..." type="search" />
          </label>
          <button className="notification-button" type="button" aria-label="Notifications">
            <span aria-hidden="true">!</span>
          </button>
          <button className="profile-button" type="button">
            <span>{profileInitials}</span>
            <div>
              <strong>{profileName}</strong>
              <small>{profileRole}</small>
            </div>
          </button>
        </header>

        <div className="dashboard-content">
          <div className="dashboard-title-row">
            <div>
              <h2>{pageTitle}</h2>
              <p>{welcomeText}</p>
            </div>
            <div className="dashboard-actions">
              <button className="export-button" type="button">
                Export Report
              </button>
              {isReportsView ? (
                <button className="new-contract-button" type="button">
                  + New Report
                </button>
              ) : null}
            </div>
          </div>

          {isReportsView ? (
            <>
              <section className="metrics-grid" aria-label="Reports dashboard metrics">
                {metrics.map((metric) => (
                  <article className="metric-card" key={metric.label}>
                    <span className={`metric-icon ${metric.tone} ${metric.icon}`} aria-hidden="true" />
                    <span className={metric.tone === 'orange' || metric.tone === 'red' ? 'trend down' : 'trend'}>↑</span>
                    <strong>{metric.value}</strong>
                    <p>{metric.label}</p>
                  </article>
                ))}
              </section>

              <section className="recent-card">
                <div className="section-heading">
                  <h3>Recent Reports</h3>
                  <button type="button">View all →</button>
                </div>

                <div className="contracts-table">
                  <div className="table-row table-head">
                    <span>Report</span>
                    <span>Type</span>
                    <span>Status</span>
                    <span>Value</span>
                    <span>Due Date</span>
                  </div>
                  {reports.map((item) => {
                    const title = item.name || item.title || ''
                    const owner = item.owner || item.generated_by || ''
                    const type = item.report_type || item.type || ''
                    const status = item.status || ''
                    const value = item.value || item.amount || ''
                    const dueDate = item.due_date || item.dueDate || ''

                    return (
                      <div className="table-row" key={item.id}>
                        <span>
                          <strong>{title}</strong>
                          <small>{owner}</small>
                        </span>
                        <span>{type ? <mark>{type}</mark> : ''}</span>
                        <span>{status ? <em>{status}</em> : ''}</span>
                        <span>
                          <strong>{value}</strong>
                        </span>
                        <span>{dueDate}</span>
                      </div>
                    )
                  })}
                </div>
                {reportsStatus === 'loading' ? <p className="empty-table-message">Loading reports...</p> : null}
                {reportsStatus === 'error' ? <p className="empty-table-message">Unable to load reports.</p> : null}
              </section>

              <section className="status-breakdown-card">
                <h3>Status Breakdown</h3>
                <div className="status-breakdown-list">
                  {statusBreakdown.map((item) => (
                    <div className="status-breakdown-row" key={item.label}>
                      <div className="status-breakdown-meta">
                        <span>{item.label}</span>
                        <strong>{item.value}</strong>
                      </div>
                      <div className="status-track">
                        <span style={{ backgroundColor: item.color, width: item.width }} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </>
          ) : null}
        </div>
      </section>
    </main>
  )
}

function getInitials(value) {
  if (!value) {
    return ''
  }

  return value
    .split(/[\s@.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join('')
}
