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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(
    () => localStorage.getItem('contractiq_sidebar_collapsed') === 'true',
  )

  useEffect(() => {
    let active = true
    async function loadDashboard() {
      try {
        const dashboardData = await getDashboard()
        if (active) setDashboard(dashboardData)
      } catch (requestError) {
        if (active) setError(requestError.message || 'Unable to load dashboard data.')
      }

      try {
        const profileData = await getProfile()
        if (active) setProfile(profileData)
      } catch {
        // Keep the dashboard available when the profile endpoint is unavailable.
      }
    }
    loadDashboard()
    return () => { active = false }
  }, [])

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
        <Navbar profile={profile} unreadCount={dashboard?.unread_notifications || 0} />
        <PageContainer>
          {error ? <div className="dashboard-error" role="alert">{error}</div> : null}
          {!dashboard && !error ? <div className="loading-state">Loading dashboard...</div> : null}
          {dashboard ? (
            <>
              <StatCards stats={dashboard.stats} />
              <section className="dashboard-grid overview-grid">
                <ContractVolumeChart data={dashboard.contracts} />
                <ComplianceChart data={dashboard.compliance} />
              </section>
              <section className="dashboard-grid insight-grid">
                <RenewalTrend data={dashboard.renewals} />
                <RecentActivity activities={dashboard.activities} />
              </section>
              <UpcomingDeadlines deadlines={dashboard.deadlines} />
            </>
          ) : null}
        </PageContainer>
      </div>
    </div>
  )
}
