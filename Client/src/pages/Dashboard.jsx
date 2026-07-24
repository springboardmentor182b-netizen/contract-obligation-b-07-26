import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";
import ContractGrowth from "../components/ContractGrowth";
import ContractStatus from "../components/ContractStatus";
import ContractsByDepartment from "../components/ContractsByDepartment";
import ComplianceLevels from "../components/ComplianceLevels";
import RecentContracts from "../components/RecentContracts";
import RecentActivity from "../components/RecentActivity";
import UpcomingRenewals from "../components/UpcomingRenewals";
import ComplianceSummary from "../components/ComplianceSummary";
import Footer from "../components/Footer";

import {
  FiUpload,
  FiPlus,
  FiClipboard,
  FiDownload,
} from "react-icons/fi";

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
        console.error(error);
      }
    }

    fetchSummary();
  }, []);

  return (
    <div className="dashboard">
      <Sidebar />

      <main className="main-content">
        <Navbar />

        <div className="dashboard-header">
          <div>
            <h1>Dashboard Overview</h1>
            <p>
              Welcome back, Jennifer. Here is your compliance snapshot for
              today.
            </p>
          </div>

          <div className="header-actions">
            <button className="action-btn">
              <FiUpload />
            </button>

            <button className="action-btn">
              <FiPlus />
            </button>

            <button className="action-btn">
              <FiClipboard />
            </button>

            <button className="action-btn download">
              <FiDownload />
            </button>
          </div>
        </div>

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

        <div className="dashboard-grid">
          <div className="left-column">
            <ContractGrowth />

            <ContractStatus />

            <ContractsByDepartment />

            <ComplianceLevels />

            <RecentContracts />

            <RecentActivity />

            <UpcomingRenewals />

            <ComplianceSummary />

            <Footer />
          </div>

          <div className="right-column"></div>
        </div>

        <div className="help-button">
          ?
          <span className="help-tooltip">Help & Resources</span>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;