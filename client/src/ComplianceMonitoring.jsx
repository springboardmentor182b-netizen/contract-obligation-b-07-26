import React, { useState, useEffect } from "react";

export default function ComplianceDashboard() {
  const [dashboardData, setDashboardData] = useState({
    total_contracts: 0,
    active_contracts: 0,
    pending_obligations: 0,
    upcoming_renewals: 0,
    unread_notifications: 0,
  });

  const [contracts, setContracts] = useState([]);

  // Load dashboard summary
  useEffect(() => {
    fetch("http://127.0.0.1:8000/dashboard")
      .then((response) => response.json())
      .then((data) => {
        setDashboardData(data);
      })
      .catch((error) => console.error("Dashboard Error:", error));
  }, []);

  // Load contracts
  useEffect(() => {
    fetch("http://127.0.0.1:8000/contracts")
      .then((response) => response.json())
      .then((data) => {
        setContracts(data);
      })
      .catch((error) => console.error("Contracts Error:", error));
  }, []);

  return (
    <div className="container-fluid p-0">
      <div className="row g-0">
        
        {/* Left Sidebar */}
        <div className="col-2 sidebar min-vh-100">
          <div className="p-4 border-bottom">
            <h5 className="text-white mb-0">🛡 ContractIQ</h5>
            <small className="text-white-50">Enterprise Suite</small>
          </div>

          <div className="p-3">
            <small className="menu-heading">MAIN MENU</small>

            <ul className="nav flex-column mt-2">
              <li className="nav-item">
                <a className="nav-link sidebar-link" href="#">▦ Dashboard</a>
              </li>
              <li className="nav-item">
                <a className="nav-link sidebar-link" href="#">▤ Contracts</a>
              </li>
              <li className="nav-item">
                <a className="nav-link sidebar-link" href="#">▱ Repository</a>
              </li>
              <li className="nav-item">
                <a className="nav-link sidebar-link" href="#">▣ Obligations</a>
              </li>
              <li className="nav-item">
                <a className="nav-link sidebar-link" href="#">↻ Renewals</a>
              </li>
              <li className="nav-item">
                <a className="nav-link sidebar-link active-menu" href="#">♢ Compliance</a>
              </li>
              <li className="nav-item">
                <a className="nav-link sidebar-link" href="#">▥ Reports</a>
              </li>
              <li className="nav-item">
                <a className="nav-link sidebar-link" href="#">♧ Notifications</a>
              </li>
              <li className="nav-item">
                <a className="nav-link sidebar-link" href="#">♙ Users</a>
              </li>
              <li className="nav-item">
                <a className="nav-link sidebar-link" href="#">⌁ Audit & Logs</a>
              </li>
              <li className="nav-item">
                <a className="nav-link sidebar-link" href="#">⚙ Settings</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Side Content */}
        <div className="col-10 main-content">
          
          {/* Top Navbar */}
          <nav className="navbar bg-white border-bottom px-4 py-3">
            <div>
              <span className="text-secondary">ContractIQ</span>
              <span className="mx-2">›</span>
              <span className="text-secondary">Compliance</span>
              <span className="mx-2">›</span>
              <strong>Monitoring</strong>
            </div>

            <div className="d-flex align-items-center ms-auto">
              <input
                className="form-control me-3"
                type="search"
                placeholder="Search..."
              />
              <button className="btn btn-light border me-3">♧</button>

              <div className="d-flex align-items-center">
                <div className="admin-icon me-2">AT</div>
                <div>
                  <strong>Alexandra T.</strong>
                  <small className="d-block text-secondary">System Admin</small>
                </div>
              </div>
            </div>
          </nav>

          {/* Compliance Monitoring Content */}
          <div className="p-4">
            
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <div>
                <h3 className="fw-bold mb-1">Compliance Monitoring</h3>
                <p className="text-secondary mb-0">
                  Real-time compliance tracking, risk scoring, and regulatory audit management
                </p>
              </div>

              <button className="btn btn-primary px-4 py-2">
                Generate Report
              </button>
            </div>

            {/* Compliance Cards */}
            <div className="row g-3">
              <div className="col-3">
                <div className="dashboard-card p-4">
                  <div className="d-flex justify-content-between">
                    <div>
                      <small className="card-label">TOTAL CONTRACTS</small>
                      <h1 className="card-number mb-1">
                        {dashboardData.total_contracts}
                      </h1>
                      <small className="text-success">
                        Total contracts in database
                      </small>
                    </div>
                    <div className="icon-box icon-success">♢</div>
                  </div>
                </div>
              </div>

              <div className="col-3">
                <div className="dashboard-card p-4">
                  <div className="d-flex justify-content-between">
                    <div>
                      <small className="card-label">ACTIVE CONTRACTS</small>
                      <h1 className="card-number mb-1">
                        {dashboardData.active_contracts}
                      </h1>
                      <small className="text-success">Currently active</small>
                    </div>
                    <div className="icon-box icon-danger">⚠</div>
                  </div>
                </div>
              </div>

              <div className="col-3">
                <div className="dashboard-card p-4">
                  <div className="d-flex justify-content-between">
                    <div>
                      <small className="card-label">PENDING OBLIGATIONS</small>
                      <h1 className="card-number mb-1">
                        {dashboardData.pending_obligations}
                      </h1>
                      <small className="text-secondary">
                        Waiting for completion
                      </small>
                    </div>
                    <div className="icon-box icon-warning">◷</div>
                  </div>
                </div>
              </div>

              <div className="col-3">
                <div className="dashboard-card p-4">
                  <div className="d-flex justify-content-between">
                    <div>
                      <small className="card-label">UPCOMING RENEWALS</small>
                      <h1 className="card-number mb-1">
                        {dashboardData.upcoming_renewals}
                      </h1>
                      <small className="text-primary">Renewal reminders</small>
                    </div>
                    <div className="icon-box icon-primary">✓</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Compliance Score Trend And Risk Distribution */}
            <div className="row g-3 mt-3">
              {/* Compliance Score Trend */}
              <div className="col-7">
                <div className="chart-card">
                  <div className="p-3 border-bottom">
                    <h5 className="fw-bold mb-1">Compliance Score Trend</h5>
                    <small className="text-secondary">Overall score over time — 2026</small>
                  </div>

                  <div className="trend-chart p-4">
                    <div className="chart-line">
                      <span className="chart-point point-1"></span>
                      <span className="chart-point point-2"></span>
                      <span className="chart-point point-3"></span>
                      <span className="chart-point point-4"></span>
                      <span className="chart-point point-5"></span>
                      <span className="chart-point point-6"></span>
                      <span className="chart-point point-7"></span>
                    </div>

                    <div className="d-flex justify-content-between mt-4 text-secondary">
                      <small>Jan</small>
                      <small>Feb</small>
                      <small>Mar</small>
                      <small>Apr</small>
                      <small>May</small>
                      <small>Jun</small>
                      <small>Jul</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Risk Distribution */}
              <div className="col-5">
                <div className="chart-card">
                  <div className="p-3 border-bottom">
                    <h5 className="fw-bold mb-1">Risk Distribution</h5>
                    <small className="text-secondary">Contracts by risk level</small>
                  </div>

                  <div className="p-4">
                    <div className="risk-circle mx-auto mb-3"></div>

                    <div className="d-flex justify-content-between">
                      <div>
                        <p className="mb-1 text-secondary">
                          <span className="text-success">●</span> Low Risk
                        </p>
                        <p className="mb-1 text-secondary">
                          <span className="text-warning">●</span> Medium Risk
                        </p>
                        <p className="mb-0 text-secondary">
                          <span className="text-danger">●</span> High Risk
                        </p>
                      </div>

                      <div className="text-end">
                        <p className="mb-1 fw-bold">142</p>
                        <p className="mb-1 fw-bold">56</p>
                        <p className="mb-0 fw-bold">20</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Compliance Register */}
            <div className="compliance-register mt-3">
              <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
                <h5 className="fw-bold mb-0">Compliance Register</h5>
                <button className="btn btn-light border px-3">↓ Export</button>
              </div>

              <div className="table-responsive">
                <table className="table compliance-table mb-0">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>TITLE</th>
                      <th>TYPE</th>
                      <th>DEPARTMENT</th>
                      <th>STATUS</th>
                      <th>START DATE</th>
                      <th>END DATE</th>
                    </tr>
                  </thead>
                  <tbody>
                    {contracts.map((contract) => (
                      <tr key={contract.id}>
                        <td>{contract.id}</td>
                        <td className="fw-semibold">{contract.title}</td>
                        <td>{contract.contract_type}</td>
                        <td>{contract.department}</td>
                        <td>{contract.status}</td>
                        <td>{contract.start_date}</td>
                        <td>{contract.end_date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}