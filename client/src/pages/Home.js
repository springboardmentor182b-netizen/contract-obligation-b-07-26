import React, { useEffect, useState } from 'react'

import ComplianceChart from '../components/Dashboard/ComplianceChart'
import ContractVolumeChart from '../components/Dashboard/ContractVolumeChart'
import RecentActivity from '../components/Dashboard/RecentActivity'
import RenewalTrend from '../components/Dashboard/RenewalTrend'
import StatCards from '../components/Dashboard/StatCards'
import UpcomingDeadlines from '../components/Dashboard/UpcomingDeadlines'
import Navbar from '../layout/Navbar'
import PageContainer from '../layout/PageContainer'
import Sidebar from '../layout/Sidebar'
import { getDashboard, getProfile } from '../features/dashboard/services/dashboardApi'

export default function Home() {
  const [dashboard, setDashboard] = useState(null)
  const [profile, setProfile] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    async function loadDashboard() {
      try {
        const [dashboardData, profileData] = await Promise.all([getDashboard(), getProfile()])
        if (active) {
          setDashboard(dashboardData)
          setProfile(profileData)
        }
      } catch (requestError) {
        if (active) setError(requestError.message || 'Unable to load dashboard data.')
      }
    }
    loadDashboard()
    return () => { active = false }
  }, [])

  return React.createElement('div', { className: 'app-shell' },
    React.createElement(Sidebar, { profile, stats: dashboard?.stats }),
    React.createElement('div', { className: 'app-main' },
      React.createElement(Navbar, { profile }),
      React.createElement(PageContainer, null,
        error ? React.createElement('div', { className: 'dashboard-error', role: 'alert' }, error) : null,
        !dashboard && !error ? React.createElement('div', { className: 'loading-state' }, 'Loading dashboard…') : null,
        dashboard ? React.createElement(React.Fragment, null,
          React.createElement(StatCards, { stats: dashboard.stats }),
          React.createElement('section', { className: 'dashboard-grid overview-grid' }, React.createElement(ContractVolumeChart, { data: dashboard.contracts }), React.createElement(ComplianceChart, { data: dashboard.compliance })),
          React.createElement('section', { className: 'dashboard-grid insight-grid' }, React.createElement(RenewalTrend, { data: dashboard.renewals }), React.createElement(RecentActivity, { activities: dashboard.activities })),
          React.createElement(UpcomingDeadlines, { deadlines: dashboard.deadlines }),
        ) : null,
      ),
    ),
  )
}
