import React, { useEffect, useMemo, useState } from 'react'

import Navbar from '../layout/Navbar'
import PageContainer from '../layout/PageContainer'
import Sidebar from '../layout/Sidebar'
import { getDashboard, getProfile } from '../features/dashboard/services/dashboardApi'
import apiClient from '../utils/axios'

const metricConfig = [
  { label: 'Total Contracts', tone: 'blue', icon: 'doc', getValue: () => 0 },
  { label: 'Active', tone: 'green', icon: 'check', getValue: () => 0 },
  { label: 'Expiring 30D', tone: 'orange', icon: 'alert', getValue: () => 0 },
  { label: 'Total Value', tone: 'purple', icon: 'money', getValue: () => 0 },
  { label: 'Compliance', tone: 'teal', icon: 'shield', getValue: () => 0 },
  { label: 'Pending Review', tone: 'red', icon: 'clock', getValue: () => 0 },
]

const statusBreakdownConfig = [
  { label: 'Active', color: '#10b981', keys: ['active'] },
  { label: 'Under Review', color: '#f59e0b', keys: ['under review', 'review'] },
  { label: 'Draft', color: '#cbd5e1', keys: ['draft'] },
  { label: 'Approved', color: '#2563eb', keys: ['approved', 'generated'] },
  { label: 'Expired', color: '#fb7185', keys: ['expired'] },
  { label: 'Terminated', color: '#e11d48', keys: ['terminated'] },
]

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
    return () => { active = false }
  }, [])

  const metrics = useMemo(
    () => metricConfig.map((metric) => ({ ...metric, value: metric.getValue(reports) })),
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

  function toggleSidebar() {
    setSidebarCollapsed((currentValue) => {
      const nextValue = !currentValue
      localStorage.setItem('contractiq_sidebar_collapsed', String(nextValue))
      return nextValue
    })
  }

  return React.createElement('div', { className: 'app-shell' },
    React.createElement(Sidebar, {
      profile,
      stats: dashboard?.stats,
      collapsed: sidebarCollapsed,
      onToggle: toggleSidebar,
    }),
    React.createElement('div', { className: 'app-main' },
      React.createElement(Navbar, { profile, section: 'Reports' }),
      React.createElement(PageContainer, null,
        React.createElement('div', { className: 'dashboard-title-row' },
          React.createElement('div', null,
            React.createElement('h2', null, 'Reports Dashboard'),
            React.createElement('p', null, `Welcome back${profile?.name ? `, ${profile.name}` : ''}. Here's your reporting activity today.`),
          ),
          React.createElement('div', { className: 'dashboard-actions' },
            React.createElement('button', { className: 'export-button', type: 'button' }, 'Export Report'),
            React.createElement('button', { className: 'new-contract-button', type: 'button' }, '+ New Report'),
          ),
        ),
        error ? React.createElement('div', { className: 'dashboard-error', role: 'alert' }, error) : null,
        React.createElement('section', { className: 'metrics-grid', 'aria-label': 'Reports dashboard metrics' },
          metrics.map((metric) => React.createElement('article', { className: 'metric-card', key: metric.label },
            React.createElement('span', { className: `metric-icon ${metric.tone} ${metric.icon}`, 'aria-hidden': 'true' }),
            React.createElement('span', { className: metric.tone === 'orange' || metric.tone === 'red' ? 'trend down' : 'trend' }, '^'),
            React.createElement('strong', null, metric.value),
            React.createElement('p', null, metric.label),
          )),
        ),
        React.createElement('section', { className: 'recent-card' },
          React.createElement('div', { className: 'section-heading' },
            React.createElement('h3', null, 'Recent Reports'),
            React.createElement('button', { type: 'button' }, 'View all ->'),
          ),
          React.createElement('div', { className: 'contracts-table' },
            React.createElement('div', { className: 'table-row table-head' },
              React.createElement('span', null, 'Report'),
              React.createElement('span', null, 'Type'),
              React.createElement('span', null, 'Status'),
              React.createElement('span', null, 'Value'),
              React.createElement('span', null, 'Due Date'),
            ),
            reports.map((item) => React.createElement('div', { className: 'table-row', key: item.id },
              React.createElement('span', null,
                React.createElement('strong', null, item.name || item.title || ''),
                React.createElement('small', null, item.owner || item.generated_by || ''),
              ),
              React.createElement('span', null, item.report_type || item.type ? React.createElement('mark', null, item.report_type || item.type) : ''),
              React.createElement('span', null, item.status ? React.createElement('em', null, item.status) : ''),
              React.createElement('span', null, React.createElement('strong', null, item.value || item.amount || '')),
              React.createElement('span', null, item.due_date || item.dueDate || ''),
            )),
          ),
          reportsStatus === 'loading' ? React.createElement('p', { className: 'empty-table-message' }, 'Loading reports...') : null,
          reportsStatus === 'success' && reports.length === 0 ? React.createElement('p', { className: 'empty-table-message' }, '') : null,
        ),
        React.createElement('section', { className: 'status-breakdown-card' },
          React.createElement('h3', null, 'Status Breakdown'),
          React.createElement('div', { className: 'status-breakdown-list' },
            statusBreakdown.map((item) => React.createElement('div', { className: 'status-breakdown-row', key: item.label },
              React.createElement('div', { className: 'status-breakdown-meta' },
                React.createElement('span', null, item.label),
                React.createElement('strong', null, item.value),
              ),
              React.createElement('div', { className: 'status-track' },
                React.createElement('span', { style: { backgroundColor: item.color, width: item.width } }),
              ),
            )),
          ),
        ),
      ),
    ),
  )
}
