import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import DashboardCard from "../components/DashboardCard";
import RecentContracts from "../components/RecentContracts";
import ComplianceLevels from "../components/ComplianceLevels";
import "../styles/dashboard.css";
import ContractsByDepartment from "../components/ContractsByDepartment";
import RecentActivity from "../components/RecentActivity";
import UpcomingRenewals from"../components/UpcomingRenewals";

function Dashboard() {
  return (
    <div className="dashboard">

      <Sidebar />

      <main className="main-content">

        <Navbar />

        <div className="dashboard-header">
          <h1>Dashboard Overview</h1>
          <p>Welcome back, Jennifer. Here is your compliance snapshot for today.</p>
        </div>

        <div className="cards">

          <DashboardCard
            title="Total Contracts"
            value="214"
            percent="+12%"
          />

          <DashboardCard
            title="Active Contracts"
            value="179"
            percent="+8%"
          />

          <DashboardCard
            title="Under Review"
            value="31"
            percent="+5%"
          />

          <DashboardCard
            title="Upcoming Renewals"
            value="18"
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

            <div className="card-placeholder">
              <h2>Contract Growth</h2>
              <p>Graph will be added here.</p>
            </div>
            <ComplianceLevels/>
            {/*<ContractsByDepartment/>*/}
            <RecentContracts />
            <RecentActivity/>
            <UpcomingRenewals/>

          </div>

          <div className="right-column">

          

            
            

          </div>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;const Dashboard = () => {
  return (
    <>
      <h1 className="text-5xl font-bold text-[#1F2937]">
        Dashboard Overview
      </h1>

      <p className="mt-3 text-lg text-gray-500">
        Welcome back, Jennifer.
        Here's your compliance snapshot for today.
      </p>
    </>
  );
};

export default Dashboard;