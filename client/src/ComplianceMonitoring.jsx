import { useEffect, useState } from "react";

// Added our smart variable right here!
const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL || process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

export default function ComplianceMonitoring() {
  const [dashboardData, setDashboardData] = useState({
    compliance_score: 0,
    high_risk: 0,
    pending_reviews: 0,
    compliant: 0,
  });

  const [contracts] = useState([]);

  useEffect(() => {
    // Replaced the hardcoded URL with our variable
    fetch(`${API_BASE_URL}/dashboard`)
        .then((res) => res.json())
        .then((data) => setDashboardData(data))
        .catch((err) => console.error(err));
  }, []);

  return (
    <div style={{ padding: '32px', boxSizing: 'border-box', width: '100%' }}>
      
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

      <div className="row g-3">
          <div className="col-3">
              <div className="dashboard-card p-4">
                  <small className="card-label">COMPLIANCE SCORE</small>
                  <h1 className="card-number mb-1">{dashboardData.compliance_score}%</h1>
              </div>
          </div>
          <div className="col-3">
              <div className="dashboard-card p-4">
                  <small className="card-label">HIGH RISK CONTRACTS</small>
                  <h1 className="card-number mb-1">{dashboardData.high_risk}</h1>
              </div>
          </div>
          <div className="col-3">
              <div className="dashboard-card p-4">
                  <small className="card-label">PENDING REVIEWS</small>
                  <h1 className="card-number mb-1">{dashboardData.pending_reviews}</h1>
              </div>
          </div>
          <div className="col-3">
              <div className="dashboard-card p-4">
                  <small className="card-label">COMPLIANT</small>
                  <h1 className="card-number mb-1">{dashboardData.compliant}</h1>
              </div>
          </div>
      </div>

      <div className="row g-3 mt-3">
          <div className="col-7">
              <div className="chart-card p-3">
                  <h5 className="fw-bold mb-1">Compliance Score Trend</h5>
                  <small className="text-secondary">Overall score over time</small>
                  <div className="trend-chart p-4 mt-3" style={{ borderBottom: '3px solid #16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span className="text-secondary">Awaiting trend data...</span>
                  </div>
              </div>
          </div>

          <div className="col-5">
              <div className="chart-card p-3 text-center">
                  <h5 className="fw-bold mb-1 text-start">Risk Distribution</h5>
                  <div className="risk-circle mx-auto mt-4 mb-3"></div>
                  <div className="d-flex justify-content-between px-4">
                      <div className="text-start">
                          <p className="mb-1 text-secondary"><span className="text-success">●</span> Low Risk</p>
                          <p className="mb-1 text-secondary"><span className="text-warning">●</span> Medium Risk</p>
                          <p className="mb-0 text-secondary"><span className="text-danger">●</span> High Risk</p>
                      </div>
                      <div className="text-end">
                          <p className="mb-1 fw-bold">0</p>
                          <p className="mb-1 fw-bold">0</p>
                          <p className="mb-0 fw-bold">0</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>

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
                          <th>CONTRACT</th>
                          <th>RISK LEVEL</th>
                          <th>STATUS</th>
                          <th>SCORE</th>
                          <th>ACTIONS</th>
                      </tr>
                  </thead>
                  <tbody>
                      {contracts.length > 0 ? (
                          contracts.map((contract) => (
                              <tr key={contract.id}>
                                  
                              </tr>
                          ))
                      ) : (
                          <tr>
                              <td colSpan="6" className="text-center py-4 text-secondary">
                                  No compliance records found.
                              </td>
                          </tr>
                      )}
                  </tbody>
              </table>
          </div>
      </div>
    </div>
  );
}