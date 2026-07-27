import DashboardLayout from "../layouts/DashboardLayout";

import DashboardCard from "../components/DashboardCard/DashboardCard";
import dashboardCardData from "../components/DashboardCard/dashboardCardData";

import RegistrationChart from "../components/charts/RegistrationChart";
import RoleDistribution from "../components/charts/RoleDistribution";

import UserTable from "../components/UserManagement/UserTable";

import { FaPlus } from "react-icons/fa";

const UserManagement = () => {
  return (
    <DashboardLayout>
      {/* Page Header */}

      <div className="flex items-start justify-between mb-10">
        <div>
          <h1 className="text-4xl font-bold text-gray-900">
            User Authentication & Role Management
          </h1>

          <p className="mt-2 text-gray-500 text-lg">
            Manage system users, roles and access permissions
          </p>
        </div>

        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-sm font-medium transition">
          <FaPlus />
          Add User
        </button>
      </div>

      {/* Statistics Cards */}

      <div className="grid grid-cols-4 gap-6 mb-8">
        {dashboardCardData.map((card) => (
          <DashboardCard key={card.title} {...card} />
        ))}
      </div>

      {/* Charts */}

      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="col-span-2">
          <RegistrationChart />
        </div>

        <RoleDistribution />
      </div>

      {/* Table */}

      <UserTable />
    </DashboardLayout>
  );
};

export default UserManagement;