import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="home-page">
      <div className="home-hero">
        <div className="home-copy">
          <p className="page-breadcrumb">Contract Renewal Platform</p>
          <h1>Streamline renewals, compliance, and contract lifecycle visibility</h1>
          <p className="page-subtitle">
            One place to monitor contract status, upcoming renewal deadlines, obligation milestones, and portfolio performance.
          </p>
          <div className="home-actions">
            <Link to="/dashboard" className="btn-primary">
              Open Renewal Dashboard
            </Link>
            <a href="#overview" className="btn-secondary">
              See the layout
            </a>
          </div>
        </div>
        <div className="home-hero-panel">
          <div className="home-stat-card">
            <p className="stat-label">Active contracts</p>
            <p className="stat-value">244</p>
            <p className="stat-note">+12 this month</p>
          </div>
          <div className="home-stat-card">
            <p className="stat-label">Renewals due</p>
            <p className="stat-value">23</p>
            <p className="stat-note">Next 30 days</p>
          </div>
          <div className="home-stat-card">
            <p className="stat-label">Compliance score</p>
            <p className="stat-value">94.2%</p>
            <p className="stat-note">Healthy portfolio</p>
          </div>
        </div>
      </div>

      <section id="overview" className="home-overview">
        <div className="feature-card">
          <h2>Renewal Intelligence</h2>
          <p>
            Track all contract renewal windows with alerts, approval workflows, and risk flags so nothing slips through the cracks.
          </p>
        </div>
        <div className="feature-card">
          <h2>Obligation Management</h2>
          <p>
            Centralize obligations, due dates, and compliance tasks with context-rich status updates and ownership assignments.
          </p>
        </div>
        <div className="feature-card">
          <h2>Portfolio Visibility</h2>
          <p>
            Understand contract exposure by category, vendor, and region with simple charts designed for legal and finance stakeholders.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Home
