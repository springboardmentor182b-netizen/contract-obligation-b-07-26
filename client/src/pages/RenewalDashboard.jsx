function RenewalDashboard({ renewals = [], searchQuery = '', onExport, onAdd }) {
  const q = (searchQuery || '').toLowerCase()
  const list = renewals.filter(r => r.name.toLowerCase().includes(q) || r.department.toLowerCase().includes(q))

  return (
    <div className="renewal-dashboard">
      <section className="dashboard-hero">
        <div className="dashboard-header">
          <div className="header-copy">
            <p className="page-breadcrumb">Renewal Dashboard</p>
            <h1>Legal Manager Dashboard</h1>
            <p className="page-subtitle">
              Monitor contract renewals, obligations, compliance, and upcoming deadlines in one place.
            </p>
          </div>
          <div className="header-actions">
            <button className="btn-secondary" onClick={() => onExport && onExport()}>Export</button>
            <button className="btn-primary" onClick={() => onAdd && onAdd()}>+ Add Renewal</button>
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
      </section>

      <section className="panel-card" style={{ padding: 0 }}>
        <div style={{ padding: 18, borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontWeight: 700 }}>Upcoming Renewals — Priority View</div>
          <a href="#" style={{ color: 'var(--primary)' }}>Full tracking table →</a>
        </div>
        <div style={{ padding: 0 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ textAlign: 'left', color: 'var(--muted)', fontSize: 13 }}>
                <th style={{ padding: '14px 18px' }}>Contract name</th>
                <th style={{ padding: '14px 18px' }}>Department</th>
                <th style={{ padding: '14px 18px' }}>Renewal date</th>
                <th style={{ padding: '14px 18px' }}>Days remaining</th>
                <th style={{ padding: '14px 18px' }}>Status</th>
                <th style={{ padding: '14px 18px' }}>Priority</th>
              </tr>
            </thead>
            <tbody>
              {list.map(item => (
                <tr key={item.id} style={{ borderTop: '1px solid var(--border)', background: 'white' }}>
                  <td style={{ padding: '14px 18px' }}>{item.name}</td>
                  <td style={{ padding: '14px 18px', color: 'var(--muted)' }}>{item.department}</td>
                  <td style={{ padding: '14px 18px' }}>{item.renewalDate}</td>
                  <td style={{ padding: '14px 18px', color: item.daysRemaining < 0 ? 'var(--danger)' : 'var(--success)' }}>{item.daysRemaining < 0 ? `${Math.abs(item.daysRemaining)}d overdue` : `${item.daysRemaining}d remaining`}</td>
                  <td style={{ padding: '14px 18px' }}><span style={{ padding: '6px 10px', borderRadius: 8, background: '#fff5f5', color: '#bf1650', border: '1px solid #fde2e2' }}>{item.status}</span></td>
                  <td style={{ padding: '14px 18px' }}><span style={{ padding: '6px 10px', borderRadius: 8, background: '#f3f4f6', color: '#0f172a' }}>{item.priority}</span></td>
                </tr>
              ))}
              {list.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ padding: 24, color: 'var(--muted)' }}>No renewals match your search</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="dashboard-main">
        <div className="main-panel panel-card">
          <div className="panel-header">
            <div>
              <h2>Contract activity</h2>
              <p>Renewal pipeline versus obligations</p>
            </div>
            <select>
              <option>Last 6 months</option>
              <option>Last 3 months</option>
            </select>
          </div>
          <div className="chart-area">
            <div className="chart-bars" aria-label="Bar chart showing contract activity">
              {[72, 84, 65, 92, 88, 97].map((value, index) => (
                <div className="bar-column" key={index}>
                  <div className="bar-fill" style={{ height: `${value}%` }} />
                  <span>{['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'][index]}</span>
                </div>
              ))}
            </div>
            <div className="chart-summary">
              <div>
                <span className="summary-label">Renewal success</span>
                <strong>86%</strong>
              </div>
              <div>
                <span className="summary-label">At risk</span>
                <strong>9 contracts</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="side-panel panel-card">
          <div className="panel-header">
            <div>
              <h2>Portfolio by type</h2>
              <p>Strategic mix across the portfolio</p>
            </div>
          </div>
          <div className="ring-chart" aria-label="Donut chart summary">
            <div className="ring-center">74%</div>
          </div>
          <div className="portfolio-list">
            <div className="portfolio-item"><span className="dot blue"></span>Vendor <span>38%</span></div>
            <div className="portfolio-item"><span className="dot green"></span>Employment <span>22%</span></div>
            <div className="portfolio-item"><span className="dot orange"></span>Lease <span>14%</span></div>
            <div className="portfolio-item"><span className="dot purple"></span>Software <span>12%</span></div>
          </div>
        </div>
      </section>

      <section className="dashboard-footer-grid">
        <div className="footer-panel panel-card">
          <div className="panel-header">
            <div>
              <h2>Recent activity</h2>
              <p>Latest workflow updates</p>
            </div>
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

        <div className="footer-panel panel-card">
          <div className="panel-header">
            <div>
              <h2>Upcoming deadlines</h2>
              <p>Items requiring attention this week</p>
            </div>
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
      </section>
    </div>
  )
}

export default RenewalDashboard
