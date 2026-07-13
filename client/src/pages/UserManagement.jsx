import DashboardLayout from "../layouts/DashboardLayout";

import DashboardCard from "../components/DashboardCard/DashboardCard";
import dashboardCardData from "../components/DashboardCard/dashboardCardData";

import RegistrationChart from "../components/charts/RegistrationChart";
import RoleDistribution from "../components/charts/RoleDistribution";

import UserTable from "../components/table/UserTable";

const UserManagement = () => {
  return (
    <DashboardLayout>
      {/* Cards */}
      <div className="grid grid-cols-4 gap-6">
        {dashboardCardData.map((card) => (
          <DashboardCard key={card.title} {...card} />
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-3 gap-6 mt-8">
        <div className="col-span-2">
          <RegistrationChart />
        </div>

        <RoleDistribution />
      </div>

      {/* User Table */}
      <UserTable />
    </DashboardLayout>
  );
};

export default UserManagement;