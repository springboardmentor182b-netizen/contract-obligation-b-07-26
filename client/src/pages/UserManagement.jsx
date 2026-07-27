import { useState, useEffect } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import DashboardCard, { DashboardCardSkeleton } from "../components/DashboardCard/DashboardCard";
import RegistrationChart from "../components/charts/RegistrationChart";
import RoleDistribution from "../components/charts/RoleDistribution";
import UserTable from "../components/table/UserTable";
import { getUserStats } from "../api/usersApi";

import {
  FaUsers,
  FaUserCheck,
  FaUserPlus,
  FaUserSlash,
  FaPlus,
} from "react-icons/fa";

// ── Stat card config (maps API fields → card props) ──────────
const buildCards = (stats) => [
  {
    title: "Total Users",
    value: stats.total_users.toLocaleString(),
    subtitle: `+${stats.new_vs_last_month} vs last month`,
    icon: FaUsers,
    color: "blue",
    progress: 88,
  },
  {
    title: "Active Users",
    value: stats.active_users.toLocaleString(),
    subtitle: `${stats.active_percentage}% of total`,
    icon: FaUserCheck,
    color: "green",
    progress: stats.active_percentage,
  },
  {
    title: "New Registrations",
    value: stats.new_registrations.toLocaleString(),
    subtitle: `+${stats.new_vs_last_month} vs last month`,
    icon: FaUserPlus,
    color: "purple",
    progress: 63,
  },
  {
    title: "Blocked Users",
    value: stats.blocked_users.toLocaleString(),
    subtitle: `${stats.blocked_percentage}% of total`,
    icon: FaUserSlash,
    color: "red",
    progress: stats.blocked_percentage,
  },
];

const UserManagement = () => {
  const [stats,        setStats]        = useState(null);
  const [statsLoading, setStatsLoading] = useState(true);

  useEffect(() => {
    getUserStats()
      .then((res) => setStats(res.data))
      .catch(() => {
        // Fallback stats if API is not running
        setStats({
          total_users: 247,
          active_users: 198,
          new_registrations: 31,
          blocked_users: 18,
          active_percentage: 80.2,
          blocked_percentage: 7.3,
          new_vs_last_month: 4,
        });
      })
      .finally(() => setStatsLoading(false));
  }, []);

  const cards = stats ? buildCards(stats) : [];

  return (
    <DashboardLayout>
      {/* ── Page header ─────────────────────────────── */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            User Authentication &amp; Role Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage system users, roles and access permissions
          </p>
        </div>

        <button
          id="add-user-btn"
          className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition-all hover:bg-blue-700 hover:shadow-md hover:shadow-blue-600/30 active:scale-95"
        >
          <FaPlus size={12} />
          Add User
        </button>
      </div>

      {/* ── Stat cards ──────────────────────────────── */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {statsLoading
          ? Array.from({ length: 4 }).map((_, i) => (
              <DashboardCardSkeleton key={i} />
            ))
          : cards.map((card) => (
              <DashboardCard key={card.title} {...card} />
            ))}
      </div>

      {/* ── Charts row ──────────────────────────────── */}
      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Registration trend – spans 2 columns */}
        <div className="xl:col-span-2">
          <RegistrationChart />
        </div>

        {/* Role distribution – 1 column */}
        <RoleDistribution />
      </div>

      {/* ── User table ──────────────────────────────── */}
      <UserTable />
    </DashboardLayout>
  );
};

export default UserManagement;