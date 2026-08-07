import { useEffect, useMemo, useState } from 'react'

import Navbar from '../layout/Navbar'
import PageContainer from '../layout/PageContainer'
import Sidebar from '../layout/Sidebar'
import { getDashboard, getProfile } from '../features/dashboard/services/dashboardApi'
import apiClient from '../utils/axios'
import './Reports.css'

const statusBreakdownConfig = [
  { label: 'Generated', color: '#2563eb', keys: ['generated', 'approved', 'completed'] },
  { label: 'Under Review', color: '#f59e0b', keys: ['under review', 'review', 'pending'] },
  { label: 'Draft', color: '#94a3b8', keys: ['draft'] },
  { label: 'Expired', color: '#fb7185', keys: ['expired'] },
  { label: 'Terminated', color: '#e11d48', keys: ['terminated'] },
]

function normalizeStatus(report) {
  return String(report.status || '').trim().toLowerCase()
}

function reportDate(report) {
  return report.generated_date || report.generated_at || report.due_date || report.dueDate || ''
}

function reportAmount(report) {
  const amount = Number(report.value ?? report.amount ?? 0)
  return Number.isFinite(amount) ? amount : 0
}

function isWithinNext30Days(value) {
  if (!value) return false

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return false

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const thirtyDaysFromNow = new Date(today)
  thirtyDaysFromNow.setDate(today.getDate() + 30)

  return date >= today && date <= thirtyDaysFromNow
}

function formatCurrency(value) {
  if (!value) return '-'

  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 0,
    style: 'currency',
    currency: 'USD',
  }).format(value)
}

function formatDate(value) {
  if (!value) return '-'

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value

  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function buildMetrics(reports) {
  const totalValue = reports.reduce((sum, report) => sum + reportAmount(report), 0)
  const generatedCount = reports.filter((report) => (
    ['generated', 'approved', 'completed'].includes(normalizeStatus(report))
  )).length
  const pendingCount = reports.filter((report) => (
    ['pending', 'under review', 'review', 'draft'].includes(normalizeStatus(report))
  )).length
  const expiringCount = reports.filter((report) => isWithinNext30Days(reportDate(report))).length
  const complianceScore = reports.length ? Math.round((generatedCount / reports.length) * 100) : 0

  return [
    { label: 'Total Reports', tone: 'blue', icon: 'doc', value: reports.length },
    { label: 'Generated', tone: 'green', icon: 'check', value: generatedCount },
    { label: 'Due 30D', tone: 'orange', icon: 'alert', value: expiringCount },
    { label: 'Total Value', tone: 'purple', icon: 'money', value: formatCurrency(totalValue) },
    { label: 'Compliance', tone: 'teal', icon: 'shield', value: `${complianceScore}%` },
    { label: 'Pending Review', tone: 'red', icon: 'clock', value: pendingCount },
  ]
}

export default function Reports() {
  const [dashboard, setDashboard] = useState(null)
  const [profile, setProfile] = useState(null)
  const [reports, setReports] = useState([])
  const [reportsStatus, setReportsStatus] = useState('loading')
  const [error, setError] = useState('')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(
    () => localStorage.getItem('contractiq_sidebar_collapsed') === 'true',
  )

  useEffect(() => {
    let active = true

    async function loadReportsDashboard() {
      setReportsStatus('loading')
      setError('')

      try {
        const [dashboardData, profileData, reportsResponse] = await Promise.all([
          getDashboard(),
          getProfile(),
          apiClient.get('/api/reports'),
        ])

        if (!active) return

        setDashboard(dashboardData)
        setProfile(profileData)
        setReports(Array.isArray(reportsResponse.data) ? reportsResponse.data : [])
        setReportsStatus('success')
      } catch (requestError) {
        if (!active) return

        setReports([])
        setReportsStatus('error')
        setError(requestError.message || 'Unable to load reports.')
      }
    }

    loadReportsDashboard()

    return () => {
      active = false
    }
  }, [])

  const metrics = useMemo(() => buildMetrics(reports), [reports])

  const statusBreakdown = useMemo(() => {
    const counts = statusBreakdownConfig.map((statusItem) => {
      const value = reports.filter((report) => statusItem.keys.includes(normalizeStatus(report))).length
      return { ...statusItem, value }
    })
    const maxValue = Math.max(...counts.map((item) => item.value), 0)

    return counts.map((item) => ({
      ...item,
      width: maxValue > 0 ? `${(item.value / maxValue) * 100}%` : '0%',
    }))
  }, [reports])

  function toggleSidebar() {
    setSidebarCollapsed((currentValue) => {
      const nextValue = !currentValue
      localStorage.setItem('contractiq_sidebar_collapsed', String(nextValue))
      return nextValue
    })
  }

  return (
    <div className="app-shell">
      <Sidebar
        profile={profile}
        stats={dashboard?.stats}
        collapsed={sidebarCollapsed}
        onToggle={toggleSidebar}
      />
      <div className="app-main">
        <Navbar profile={profile} pageTitle="Reports" unreadCount={dashboard?.unread_notifications || 0} />
        <PageContainer>
          <div className="reports-title-row">
            <div>
              <h2>Reports Dashboard</h2>
              <p>{`Welcome back${profile?.name ? `, ${profile.name}` : ''}. Here's your reporting activity today.`}</p>
            </div>
            <div className="reports-actions">
              <button className="report-outline-button" type="button">Export Report</button>
              <button className="report-primary-button" type="button">+ New Report</button>
            </div>
          </div>

          {error ? <div className="dashboard-error" role="alert">{error}</div> : null}

          <section className="reports-metrics-grid" aria-label="Reports dashboard metrics">
            {metrics.map((metric) => (
              <article className="report-metric-card" key={metric.label}>
                <span className={`report-metric-icon ${metric.tone} ${metric.icon}`} aria-hidden="true" />
                <span className={metric.tone === 'orange' || metric.tone === 'red' ? 'report-trend down' : 'report-trend'}>^</span>
                <strong>{metric.value}</strong>
                <p>{metric.label}</p>
              </article>
            ))}
          </section>

          <section className="reports-card">
            <div className="reports-section-heading">
              <h3>Recent Reports</h3>
              <button type="button">View all -&gt;</button>
            </div>
            <div className="reports-table">
              <div className="reports-table-row reports-table-head">
                <span>Report</span>
                <span>Department</span>
                <span>Status</span>
                <span>Size / Value</span>
                <span>Generated</span>
              </div>
              {reports.map((item) => (
                <div className="reports-table-row" key={item.id}>
                  <span>
                    <strong>{item.name || item.title || 'Untitled report'}</strong>
                    <small>{item.report_type || item.type || 'Compliance report'}</small>
                  </span>
                  <span>{item.department || item.owner || item.generated_by || '-'}</span>
                  <span>{item.status ? <em>{item.status}</em> : '-'}</span>
                  <span><strong>{item.file_size || formatCurrency(reportAmount(item))}</strong></span>
                  <span>{formatDate(reportDate(item))}</span>
                </div>
              ))}
            </div>
            {reportsStatus === 'loading' ? <p className="reports-empty-message">Loading reports...</p> : null}
            {reportsStatus === 'success' && reports.length === 0 ? (
              <p className="reports-empty-message">No reports have been generated yet.</p>
            ) : null}
          </section>

          <section className="reports-status-card">
            <h3>Status Breakdown</h3>
            <div className="reports-status-list">
              {statusBreakdown.map((item) => (
                <div className="reports-status-row" key={item.label}>
                  <div className="reports-status-meta">
                    <span>{item.label}</span>
                    <strong>{item.value}</strong>
                  </div>
                  <div className="reports-status-track">
                    <span style={{ backgroundColor: item.color, width: item.width }} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </PageContainer>
      </div>
    </div>
  )
}
