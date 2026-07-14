import './Dashboard.scss'

function Dashboard() {
  const stats = {
    totalContracts: 150,
    activeContracts: 120,
    expiringSoon: 15,
    pendingApprovals: 8
  }

  const recentActivities = [
    { id: 1, contract: 'CON-001', action: 'Created', user: 'John Doe', date: '2024-07-13' },
    { id: 2, contract: 'CON-002', action: 'Updated', user: 'Jane Smith', date: '2024-07-13' },
    { id: 3, contract: 'CON-003', action: 'Approved', user: 'Bob Johnson', date: '2024-07-12' },
    { id: 4, contract: 'CON-004', action: 'Archived', user: 'Alice Brown', date: '2024-07-12' }
  ]

  const upcomingRenewals = [
    { id: 1, contract: 'CON-005', title: 'Service Agreement', renewalDate: '2024-07-20', daysLeft: 7 },
    { id: 2, contract: 'CON-006', title: 'Vendor Contract', renewalDate: '2024-07-25', daysLeft: 12 },
    { id: 3, contract: 'CON-007', title: 'Lease Agreement', renewalDate: '2024-08-01', daysLeft: 19 }
  ]

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📄</div>
          <div className="stat-info">
            <div className="stat-value">{stats.totalContracts}</div>
            <div className="stat-label">Total Contracts</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <div className="stat-value">{stats.activeContracts}</div>
            <div className="stat-label">Active Contracts</div>
          </div>
        </div>

        <div className="stat-card warning">
          <div className="stat-icon">⚠️</div>
          <div className="stat-info">
            <div className="stat-value">{stats.expiringSoon}</div>
            <div className="stat-label">Expiring Soon</div>
          </div>
        </div>

        <div className="stat-card info">
          <div className="stat-icon">📋</div>
          <div className="stat-info">
            <div className="stat-value">{stats.pendingApprovals}</div>
            <div className="stat-label">Pending Approvals</div>
          </div>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="panel">
          <h2>Recent Activities</h2>
          <div className="activity-list">
            {recentActivities.map(activity => (
              <div key={activity.id} className="activity-item">
                <div className="activity-info">
                  <div className="activity-contract">{activity.contract}</div>
                  <div className="activity-action">{activity.action}</div>
                </div>
                <div className="activity-meta">
                  <div className="activity-user">{activity.user}</div>
                  <div className="activity-date">{activity.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <h2>Upcoming Renewals</h2>
          <div className="renewal-list">
            {upcomingRenewals.map(renewal => (
              <div key={renewal.id} className="renewal-item">
                <div className="renewal-info">
                  <div className="renewal-contract">{renewal.contract}</div>
                  <div className="renewal-title">{renewal.title}</div>
                </div>
                <div className="renewal-meta">
                  <div className="renewal-date">{renewal.renewalDate}</div>
                  <div className="renewal-days">{renewal.daysLeft} days left</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
