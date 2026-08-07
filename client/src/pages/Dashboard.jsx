import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (!userData || !token) {
      navigate('/login');
      return;
    }

    setUser(JSON.parse(userData));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="dashboard-page">
      {/* LEFT PANEL - Dark Side (Same as Login) */}
      <div className="left-panel">
        <div className="logo">
          <div className="logo-icon">C</div>
          <span className="logo-text">ContractIQ</span>
        </div>

        <h1 className="title">Contract Obligation<br />Management Platform</h1>
        <p className="subtitle">Oversee, categorize, and track-based threats for your entire contract lifecycle.</p>

        <div className="features">
          <div className="feature-item">
            <span className="icon">📋</span>
            <span>Contract lifecycle management</span>
          </div>
          <div className="feature-item">
            <span className="icon">✓</span>
            <span>Compliance monitoring & reporting</span>
          </div>
          <div className="feature-item">
            <span className="icon">⚠️</span>
            <span>Obligation tracking & alerts</span>
          </div>
          <div className="feature-item">
            <span className="icon">📊</span>
            <span>Real-time analytics & insights</span>
          </div>
          <div className="feature-item">
            <span className="icon">🔒</span>
            <span>JWT-secured authentication</span>
          </div>
          <div className="feature-item">
            <span className="icon">👥</span>
            <span>Role-based access control</span>
          </div>
        </div>

        <div className="demo-roles">
          <h3>ACCESS ROLES</h3>
          <div className="role-badges">
            <span className="role-badge">Administrator</span>
            <span className="role-badge">Legal Manager</span>
            <span className="role-badge">Compliance Officer</span>
            <span className="role-badge">Contract Manager</span>
            <span className="role-badge">Department Head</span>
            <span className="role-badge">Employee</span>
          </div>
        </div>

        <div className="footer">
          <p>© Secured by JWT · Authentication · Help</p>
        </div>
      </div>

      {/* RIGHT PANEL - White Side */}
      <div className="right-panel">
        <div className="dashboard-container">
          {/* Header with Logout */}
          <div className="dashboard-header">
            <div>
              <h2 className="dashboard-title">Dashboard</h2>
              <p className="dashboard-subtitle">Welcome to your ContractIQ workspace</p>
            </div>
            <button onClick={handleLogout} className="logout-button">Sign out</button>
          </div>

          {/* Security Badges */}
          <div className="security-badges">
            <div className="badge badge-green">
              <span className="badge-icon">🔐</span>
              <span>JWT Secured</span>
            </div>
            <div className="badge badge-blue">
              <span className="badge-icon">🔒</span>
              <span>256-bit HTTPS encryption</span>
            </div>
          </div>

          {/* User Information Card */}
          <div className="info-card">
            <h3>Account Details</h3>
            <div className="info-grid">
              <div className="info-item">
                <label>First Name</label>
                <span>{user.firstName}</span>
              </div>
              <div className="info-item">
                <label>Last Name</label>
                <span>{user.lastName}</span>
              </div>
              <div className="info-item">
                <label>Work Email</label>
                <span>{user.email}</span>
              </div>
              <div className="info-item">
                <label>Role</label>
                <span className="role-badge-small">{user.role}</span>
              </div>
              {user.department && (
                <div className="info-item">
                  <label>Department</label>
                  <span>{user.department}</span>
                </div>
              )}
            </div>
          </div>

          {/* Statistics Section */}
          <div className="stats-section">
            <h3>Statistics</h3>
            <div className="stats-grid">
              <div className="stat-box">
                <div className="stat-icon">📋</div>
                <div className="stat-content">
                  <p className="stat-label">Active Contracts</p>
                  <h2 className="stat-value">24</h2>
                </div>
              </div>
              <div className="stat-box">
                <div className="stat-icon">⏳</div>
                <div className="stat-content">
                  <p className="stat-label">Pending Obligations</p>
                  <h2 className="stat-value">8</h2>
                </div>
              </div>
              <div className="stat-box">
                <div className="stat-icon">⚠️</div>
                <div className="stat-content">
                  <p className="stat-label">Expiring Soon</p>
                  <h2 className="stat-value">3</h2>
                </div>
              </div>
              <div className="stat-box">
                <div className="stat-icon">✓</div>
                <div className="stat-content">
                  <p className="stat-label">Completed</p>
                  <h2 className="stat-value">156</h2>
                </div>
              </div>
            </div>
          </div>

          {/* Actions Section */}
          <div className="actions-section">
            <h3>Quick Actions</h3>
            <div className="action-buttons">
              <button className="action-btn-primary">
                <span className="action-icon">📄</span>
                <span>View All Contracts</span>
              </button>
              <button className="action-btn-primary">
                <span className="action-icon">📊</span>
                <span>Manage Obligations</span>
              </button>
              <button className="action-btn-primary">
                <span className="action-icon">📈</span>
                <span>Analytics Dashboard</span>
              </button>
              <button className="action-btn-primary">
                <span className="action-icon">⚙️</span>
                <span>Settings</span>
              </button>
            </div>
          </div>

          {/* Footer */}
          <p className="terms">
            By using ContractIQ, you agree to our terms of service and privacy policy.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
