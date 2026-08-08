import { useEffect, useMemo, useState } from 'react'

import Navbar from '../layout/Navbar'
import PageContainer from '../layout/PageContainer'
import Sidebar from '../layout/Sidebar'
import { getDashboard, getProfile } from '../features/dashboard/services/dashboardApi'
import { createReport, deleteReport, exportReports, getReports } from '../api/reportApi'
import './Reports.css'

const emptyReport = {
  name: '',
  report_type: 'Compliance report',
  department: '',
  status: 'Generated',
  value: '',
  due_date: '',
}

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
  const [showAll, setShowAll] = useState(false)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [reportForm, setReportForm] = useState(emptyReport)
  const [isSaving, setIsSaving] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(
    () => localStorage.getItem('contractiq_sidebar_collapsed') === 'true',
  )

  useEffect(() => {
    let active = true

    async function loadReportsDashboard() {
      setReportsStatus('loading')
      setError('')

      try {
        const [dashboardResult, profileResult, reportsData] = await Promise.all([
          getDashboard(),
          getProfile(),
          getReports(),
        ])

        if (!active) return

        setDashboard(dashboardResult)
        setProfile(profileResult)
        setReports(Array.isArray(reportsData) ? reportsData : [])
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
  const visibleReports = showAll ? reports : reports.slice(0, 5)

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

  async function refreshReports() {
    setReportsStatus('loading')
    setError('')
    try {
      const data = await getReports()
      setReports(Array.isArray(data) ? data : [])
      setReportsStatus('success')
    } catch (requestError) {
      setReportsStatus('error')
      setError(requestError.response?.data?.detail || requestError.message || 'Unable to load reports.')
    }
  }

  async function handleCreateReport(event) {
    event.preventDefault()
    setIsSaving(true)
    setError('')
    try {
      const createdReport = await createReport({
        ...reportForm,
        value: Number(reportForm.value || 0),
        due_date: reportForm.due_date || null,
      })
      setReports((currentReports) => [createdReport, ...currentReports])
      setReportForm(emptyReport)
      setShowCreateForm(false)
      setReportsStatus('success')
    } catch (requestError) {
      setError(requestError.response?.data?.detail || requestError.message || 'Unable to create the report.')
    } finally {
      setIsSaving(false)
    }
  }

  async function handleDeleteReport(id) {
    if (!window.confirm('Delete this report? This cannot be undone.')) return
    setError('')
    try {
      await deleteReport(id)
      setReports((currentReports) => currentReports.filter((report) => report.id !== id))
    } catch (requestError) {
      setError(requestError.response?.data?.detail || requestError.message || 'Unable to delete the report.')
    }
  }

  async function handleExportReports() {
    setIsExporting(true)
    setError('')
    try {
      const reportFile = await exportReports()
      const url = window.URL.createObjectURL(reportFile)
      const link = document.createElement('a')
      link.href = url
      link.download = 'contractiq-reports.csv'
      document.body.appendChild(link)
      link.click()
      link.remove()
      window.URL.revokeObjectURL(url)
    } catch (requestError) {
      setError(requestError.response?.data?.detail || requestError.message || 'Unable to export reports.')
    } finally {
      setIsExporting(false)
    }
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
              <button className="report-outline-button" type="button" onClick={handleExportReports} disabled={isExporting}>
                {isExporting ? 'Exporting...' : 'Export CSV'}
              </button>
              <button className="report-primary-button" type="button" onClick={() => setShowCreateForm(true)}>+ New Report</button>
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
              <button type="button" onClick={() => setShowAll((currentValue) => !currentValue)}>
                {showAll ? 'Show recent' : 'View all'} -&gt;
              </button>
            </div>
            <div className="reports-table">
              <div className="reports-table-row reports-table-head">
                <span>Report</span>
                <span>Department</span>
                <span>Status</span>
                <span>Size / Value</span>
                <span>Generated</span>
                <span>Action</span>
              </div>
              {visibleReports.map((item) => (
                <div className="reports-table-row" key={item.id}>
                  <span>
                    <strong>{item.name || item.title || 'Untitled report'}</strong>
                    <small>{item.report_type || item.type || 'Compliance report'}</small>
                  </span>
                  <span>{item.department || item.owner || item.generated_by || '-'}</span>
                  <span>{item.status ? <em>{item.status}</em> : '-'}</span>
                  <span><strong>{item.file_size || formatCurrency(reportAmount(item))}</strong></span>
                  <span>{formatDate(reportDate(item))}</span>
                  <span><button className="report-delete-button" type="button" onClick={() => handleDeleteReport(item.id)}>Delete</button></span>
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

          {showCreateForm ? (
            <div className="report-modal-backdrop" role="presentation" onMouseDown={() => !isSaving && setShowCreateForm(false)}>
              <form className="report-modal" onSubmit={handleCreateReport} onMouseDown={(event) => event.stopPropagation()}>
                <div className="report-modal-heading">
                  <div><h3>New Report</h3><p>Create a report record for your dashboard.</p></div>
                  <button type="button" className="report-close-button" onClick={() => setShowCreateForm(false)} aria-label="Close">×</button>
                </div>
                <label>Report name<input required value={reportForm.name} onChange={(event) => setReportForm({ ...reportForm, name: event.target.value })} placeholder="Quarterly compliance report" /></label>
                <div className="report-form-grid">
                  <label>Report type<input required value={reportForm.report_type} onChange={(event) => setReportForm({ ...reportForm, report_type: event.target.value })} /></label>
                  <label>Department<input value={reportForm.department} onChange={(event) => setReportForm({ ...reportForm, department: event.target.value })} placeholder="Legal" /></label>
                  <label>Status<select value={reportForm.status} onChange={(event) => setReportForm({ ...reportForm, status: event.target.value })}><option>Generated</option><option>Under Review</option><option>Draft</option><option>Expired</option><option>Terminated</option></select></label>
                  <label>Value<input type="number" min="0" value={reportForm.value} onChange={(event) => setReportForm({ ...reportForm, value: event.target.value })} placeholder="0" /></label>
                  <label>Due date<input type="date" value={reportForm.due_date} onChange={(event) => setReportForm({ ...reportForm, due_date: event.target.value })} /></label>
                </div>
                <div className="report-modal-actions"><button type="button" className="report-outline-button" onClick={() => setShowCreateForm(false)} disabled={isSaving}>Cancel</button><button className="report-primary-button" disabled={isSaving}>{isSaving ? 'Creating...' : 'Create Report'}</button></div>
              </form>
            </div>
          ) : null}
        </PageContainer>
      </div>
    </div>
  )
}
