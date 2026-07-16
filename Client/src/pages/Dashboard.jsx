import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";
import RecentContracts from "../components/RecentContracts";
import ComplianceLevels from "../components/ComplianceLevels";
import ContractsByDepartment from "../components/ContractsByDepartment";
import RecentActivity from "../components/RecentActivity";
import ContractStatus from "../components/ContractStatus";
import UpcomingRenewals from "../components/UpcomingRenewals";
import ContractGrowth from "../components/ContractGrowth";
import ComplianceSummary from "../components/ComplianceSummary";
import Footer from "../components/Footer";
import {
  FiUpload,
  FiPlus,
  FiClipboard,
  FiDownload,
} from "react-icons/fi";
import { useEffect, useState } from "react";
import { getDashboardSummary } from "../api/dashboardApi";

function Dashboard() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    async function fetchSummary() {
      try {
        const data = await getDashboardSummary();
        console.log(JSON.stringify(data, null, 2));
        setSummary(data);
      } catch (error) {
        console.error("Error fetching dashboard summary:", error);
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
              Welcome back, Jennifer. Here is your compliance snapshot for today.
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
            value="31"
            percent="+5%"
          />

          <DashboardCard
            title="Upcoming Renewals"
            value={summary ? summary.expiring_soon : "..."}
            percent="-2%"
          />

          <DashboardCard
            title="Pending Obligations"
            value="43"
            percent="+10%"
          />

          <DashboardCard
            title="Compliance Rate"
            value="91.4%"
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