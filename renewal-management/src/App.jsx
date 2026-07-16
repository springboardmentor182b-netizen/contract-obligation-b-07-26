import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [contracts, setContracts] = useState([]);

useEffect(() => {
  fetch("http://localhost:5000/contracts")
    .then((res) => res.json())
    .then((data) => setContracts(data));
}, []);
  return (
    <div className="container">
      <div className="sidebar">
        <h2>ContractIQ</h2>

        <p>🏠 Dashboard</p>
        <p>📄 Contracts</p>
        <p>📁 Repository</p>
        <p>🔄 Renewal</p>
        <p>✅ Compliance</p>
        <p>📊 Reports</p>
        <p>👤 Users</p>
        <p>⚙️ Settings</p>
      </div>

      <div className="main">
        <div className="topbar">
          <input type="text" placeholder="Search" />
          <button>Export Report</button>
        </div>

        <h1>Renewal Dashboard</h1>
        <p>Manage all contract renewal schedules.</p>

        <div className="cards">
          <div className="card">
            <h2>3</h2>
            <p>Upcoming</p>
          </div>

          <div className="card">
            <h2>1</h2>
            <p>In Progress</p>
          </div>

          <div className="card">
            <h2>1</h2>
            <p>Expired</p>
          </div>

          <div className="card">
            <h2>4</h2>
            <p>Renewed</p>
          </div>
        </div>
        <div className="contract-card">
          <div className="contract-left">
            <h3>Annual HR Consulting Retainer</h3>
            <p style={{ color: "#2563eb", fontSize: "12px", margin: "0" }}>
              180 Days • Upcoming
            </p>
            <p>180 Days Remaining</p>
          </div>

          <div className="contract-right">
            <p>Due: Dec 31, 2025</p>
            <p>Value: $96,000</p>
            <button>Initiate Renewal</button>
          </div>
        </div>

        <div className="progress-bar">
          <div className="progress" style={{ width: "70%" }}></div>
        </div>
        <div className="contract-card">
  <div className="contract-left">
    <h3>Manufacturing Supply Agreement</h3>
    <p style={{ color: "#f59e0b", fontSize: "12px", margin: "0" }}>
      87 Days • Expiring
    </p>
    <p>87 Days Remaining</p>
  </div>

  <div className="contract-right">
    <p>Due: Sep 30, 2025</p>
    <p>Value: $780,000</p>
    <button>Initiate Renewal</button>
  </div>
</div>

<div className="progress-bar">
  <div className="progress orange" style={{ width: "50%" }}></div>
</div>
<div className="contract-card">
  <div className="contract-left">
    <p style={{ color: "#f59e0b", fontSize: "12px", margin: "0" }}>
      88 Days • Upcoming
    </p>
    <h3>Vendor Distribution Agreement</h3>
    <p>88 Days Remaining</p>
  </div>

  <div className="contract-right">
    <p>Due: Sep 30, 2025</p>
    <p>Value: $780,000</p>
    <button>Initiate Renewal</button>
  </div>
</div>

<div className="progress-bar">
  <div className="progress orange" style={{ width: "50%" }}></div>
</div>
<div className="contract-card">
  <div className="contract-left">
    <h3>Maintenance Service Agreement</h3>
    <p style={{ color: "#ef4444", fontSize: "12px", margin: "0" }}>
      165 Days • Expired
    </p>
    <p>165 Days Remaining</p>
  </div>

  <div className="contract-right">
    <p>Due: Mar 31, 2024</p>
    <p>Value: $250,000</p>
    <button>Initiate Renewal</button>
  </div>
</div>

<div className="progress-bar">
  <div
    className="progress"
    style={{ width: "90%", background: "#ef4444" }}
  ></div>
</div>
<div className="contract-card">
  <div className="contract-left">
    <h3>Warehouse Lease</h3>
    <p style={{ color: "#ef4444", fontSize: "12px", margin: "0" }}>
      165 Days • Expired
    </p>
    <p>165 Days Remaining</p>
  </div>

  <div className="contract-right">
    <p>Due: Dec 31, 2024</p>
    <p>Value: $280,000</p>
    <button>Initiate Renewal</button>
  </div>
</div>

<div className="progress-bar">
  <div
    className="progress"
    style={{ width: "95%", background: "#ef4444" }}
  ></div>
</div>

      </div>
    </div>
  );
}

export default App;