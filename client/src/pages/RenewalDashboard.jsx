function RenewalDashboard() {
  return (
    <div className="renewal-dashboard">
      <div className="dashboard-hero">
        <div className="dashboard-header">
          <div className="header-copy">
            <p className="page-breadcrumb">Renewal Dashboard</p>
            <h1>Legal Manager Dashboard</h1>
            <p className="page-subtitle">
              Monitor contract renewals, obligations, compliance, and upcoming deadlines in one place.
            </p>
          </div>
          <div className="header-actions">
            <button className="btn-secondary">Export</button>
            <button className="btn-primary">Add Renewal</button>
          </div>
        </div>

        <div className="cards-grid">
          <div className="stat-card">
            <div className="stat-icon">📄</div>
            <p className="stat-label">Active Contracts</p>
            <p className="stat-value">244</p>
            <p className="stat-note">+12 this month</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⏳</div>
            <p className="stat-label">Upcoming Renewals</p>
            <p className="stat-value">23</p>
            <p className="stat-note">Next 30 days</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⚠️</div>
            <p className="stat-label">Pending Obligations</p>
            <p className="stat-value">40</p>
            <p className="stat-note">+3 since yesterday</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🛡️</div>
            <p className="stat-label">Compliance Score</p>
            <p className="stat-value">94.2%</p>
            <p className="stat-note">+1.8% vs last qtr</p>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🚨</div>
            <p className="stat-label">Expiring This Week</p>
            <p className="stat-value">8</p>
            <p className="stat-note">Action required</p>
          </div>
        </div>
      </div>

      <div className="dashboard-main">
        <div className="main-panel">
          <div className="panel-header">
            <h2>Contract Activity — H1 2024</h2>
            <select>
              <option>Last 6 months</option>
              <option>Last 3 months</option>
            </select>
          </div>
          <div className="chart-placeholder">Chart placeholder</div>
        </div>

        <div className="side-panel">
          <div className="panel-header">
            <h2>Portfolio By Type</h2>
          </div>
          <div className="donut-placeholder">Donut chart placeholder</div>
          <div className="portfolio-list">
            <div className="portfolio-item"><span className="dot blue"></span>Vendor <span>38%</span></div>
            <div className="portfolio-item"><span className="dot green"></span>Employment <span>22%</span></div>
            <div className="portfolio-item"><span className="dot orange"></span>Lease <span>14%</span></div>
            <div className="portfolio-item"><span className="dot purple"></span>Software <span>12%</span></div>
            <div className="portfolio-item"><span className="dot red"></span>NDA <span>8%</span></div>
            <div className="portfolio-item"><span className="dot gray"></span>Other <span>6%</span></div>
          </div>
        </div>
      </div>

      <div className="dashboard-footer-grid">
        <div className="footer-panel">
          <div className="panel-header">
            <h2>Recent Activity</h2>
            <a href="#">View all</a>
          </div>
          <div className="activity-item">
            <strong>Sarah Chen</strong> created new contract <span>Mutual NDA - TechVenture Group</span>
            <div className="activity-time">10 min ago</div>
          </div>
          <div className="activity-item">
            <strong>David Park</strong> updated compliance status on <span>Office Lease - Metro Plaza</span>
            <div className="activity-time">1 hour ago</div>
          </div>
          <div className="activity-item">
            <strong>Emily Crawford</strong> signed contract <span>Vendor SLA - CloudHosting Services</span>
            <div className="activity-time">3 hours ago</div>
          </div>
        </div>

        <div className="footer-panel">
          <div className="panel-header">
            <h2>Upcoming Deadlines</h2>
            <a href="#">View all</a>
          </div>
          <div className="deadline-item">
            <div>
              <strong>Q2 Compliance Report Submission</strong>
              <div className="deadline-meta">Sarah Chen · Due 2024-06-30</div>
            </div>
            <span className="status in-progress">In Progress</span>
          </div>
          <div className="deadline-item">
            <div>
              <strong>Annual Insurance Certificate Renewal</strong>
              <div className="deadline-meta">Lisa Torres · Due 2024-05-15</div>
            </div>
            <span className="status overdue">Overdue</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RenewalDashboard
