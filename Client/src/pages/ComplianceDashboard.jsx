import React, { useEffect, useState } from "react";
import "../assets/dashboard.css";

import api from "../api";


import PageContainer from "../layouts/PageContainer";
import KpiCard from "../components/Dashboard/KpiCard";
import DepartmentChart from "../components/Dashboard/DepartmentChart";
import RiskTrendChart from "../components/Dashboard/RiskTrendChart";
import AuditSummary from "../components/Dashboard/AuditSummary";
import AuditTable from "../components/Dashboard/AuditTable";
import RiskIndicators from "../components/Dashboard/RiskIndicators";

import { metrics } from "../Data/dashboardData";

const ComplianceDashboard = () => {
  const [metrics, setMetrics] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const response = await api.get("/api/dashboard/metrics");

      setMetrics([
        {
          id: 1,
          title: "Overall Compliance",
          value: response.data.overallCompliance + "%",
          trend: "+1.8%",
          color: "#16a34a",
        },
        {
          id: 2,
          title: "Missed Deadlines",
          value: response.data.missedDeadlines,
          trend: "Current",
          color: "#dc2626",
        },
        {
          id: 3,
          title: "Risk Flags",
          value: response.data.riskFlags,
          trend: "Current",
          color: "#f59e0b",
        },
        {
          id: 4,
          title: "Audits Completed",
          value: response.data.auditsCompleted,
          trend: "Current",
          color: "#2563eb",
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <PageContainer>
      <div className="dashboard-content">

        <h1 className="dashboard-title">
          Compliance Dashboard
        </h1>

        <p className="dashboard-subtitle">
          Monitor compliance performance across departments.
        </p>

        {/* KPI Cards */}
        <div className="kpi-grid">
          {metrics.map((item) => (
            <KpiCard
              key={item.id}
              title={item.title}
              value={item.value}
              trend={item.trend}
              color={item.color}
            />
          ))}
        </div>

        {/* Charts */}
        <div className="chart-grid">
          <DepartmentChart />
          <RiskTrendChart />
        </div>

        {/* Audit Summary */}
        <AuditSummary />

        {/* Audit Table */}
        <AuditTable />

        {/* Risk Indicators */}
        <RiskIndicators />

      </div>
    </PageContainer>
  );
};

export default ComplianceDashboard;