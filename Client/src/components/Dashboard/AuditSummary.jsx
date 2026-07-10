import React from "react";
import { auditSummary } from "../../Data/dashboardData";

const cardStyle = {
  flex: 1,
  background: "#fff",
  borderRadius: "12px",
  padding: "20px",
  textAlign: "center",
  boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
};

const AuditSummary = () => {
  return (
    <div style={{ marginTop: "40px" }}>
      <h2 style={{ marginBottom: "20px" }}>Audit Summary</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "20px",
        }}
      >
        <div style={cardStyle}>
          <h1>{auditSummary.total}</h1>
          <p>Total Audits</p>
        </div>

        <div style={cardStyle}>
          <h1 style={{ color: "#16a34a" }}>
            {auditSummary.completed}
          </h1>
          <p>Completed</p>
        </div>

        <div style={cardStyle}>
          <h1 style={{ color: "#f59e0b" }}>
            {auditSummary.inProgress}
          </h1>
          <p>In Progress</p>
        </div>

        <div style={cardStyle}>
          <h1 style={{ color: "#dc2626" }}>
            {auditSummary.failed}
          </h1>
          <p>Failed</p>
        </div>
      </div>
    </div>
  );
};

export default AuditSummary;