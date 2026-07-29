import { useEffect, useState } from "react";
import {
  FaDownload,
  FaPlus,
  FaRegCopy,
  FaArrowUpFromBracket,
} from "react-icons/fa6";
import ComplianceSummary from "../components/ComplianceSummary";
import ContractGrowth from "../components/ContractGrowth";
import ContractStatus from "../components/ContractStatus";
import DashboardCard from "../components/DashboardCard";
import RecentContracts from "../components/RecentContracts";
import ComplianceLevels from "../components/ComplianceLevels";
import ContractsByDepartment from "../components/ContractsByDepartment";
import RecentActivity from "../components/RecentActivity";
import UpcomingRenewals from "../components/UpcomingRenewals";
import { getDashboardSummary } from "../api/dashboardApi";

import "../styles/dashboard.css";

function Dashboard() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    async function fetchSummary() {
      try {
        const data = await getDashboardSummary();
        setSummary(data);
      } catch (error) {
        console.error("Error fetching dashboard summary:", error);
      }
    }

    fetchSummary();
  }, []);

  return (
    <div className="dashboard-page">
      {/* Header */}
      <div className="dashboard-header">
        <div className="dashboard-title">
          <h1>Dashboard Overview</h1>
          <p>
            Welcome back, Jennifer. Here is your compliance snapshot for today.
          </p>
        </div>

        <div className="header-actions">
          <button className="action-btn">
            <FaArrowUpFromBracket />
          </button>

          <button className="action-btn">
            <FaPlus />
          </button>

          <button className="action-btn">
            <FaRegCopy />
          </button>

          <button className="action-btn download">
            <FaDownload />
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="cards">
        <DashboardCard
          title="Total Contracts"
          value={summary ? summary.total_contracts : "..."}
          percent="+12%"
        />

        <DashboardCard
          title="Active Contracts"
          value={summary ? summary.active_contracts : "..."}
          percent="+8%"
        />

        <DashboardCard
          title="Under Review"
          value={summary ? summary.under_review : "..."}
          percent="+5%"
        />

        <DashboardCard
          title="Upcoming Renewals"
          value={summary ? summary.expiring_soon : "..."}
          percent="-2%"
        />

        <DashboardCard
          title="Pending Obligations"
          value={summary ? summary.pending_obligations : "..."}
          percent="+10%"
        />

        <DashboardCard
          title="Compliance Rate"
          value={summary ? `${summary.compliance_rate}%` : "..."}
          percent="+2%"
        />
      </div>

      {/* Dashboard Content */}
      <div className="dashboard-grid">
        <div className="left-column">

          <ContractGrowth/>

          <ContractsByDepartment/>

          <ContractStatus/>

          <ComplianceLevels />

          <RecentContracts />

          <RecentActivity />

          <UpcomingRenewals />

          <ComplianceSummary/>
        </div>

        <div className="right-column">
          
        </div>
      </div>
    </div>
  );
}

export default Dashboard;