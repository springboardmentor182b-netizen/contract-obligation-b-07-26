import { useEffect, useState } from "react";
import {
  Plus,
  FileText,
  CheckCircle2,
  RefreshCw,
  Clock,
  ShieldCheck,
  XCircle,
  Eye,
  CheckCircle,
  FilePlus,
} from "lucide-react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import PageLayout from "../layout/PageLayout";
import StatCard from "../components/StatCard";
import { getDashboardSummary } from "../services/dashboardService";

const ACTIVITY_ICONS = {
  overdue: { Icon: XCircle, color: "#ef4444", bg: "#fee2e2" },
  renewal: { Icon: RefreshCw, color: "#f59e0b", bg: "#fef3c7" },
  review: { Icon: Eye, color: "#3b82f6", bg: "#dbeafe" },
  completed: { Icon: CheckCircle, color: "#10b981", bg: "#d1fae5" },
  created: { Icon: FilePlus, color: "#64748b", bg: "#f1f5f9" },
};

const PRIORITY_STYLES = {
  Critical: "bg-red-50 text-red-600 border border-red-200",
  High: "bg-amber-50 text-amber-700 border border-amber-200",
  Medium: "bg-blue-50 text-blue-600 border border-blue-200",
};

const STATUS_STYLES = {
  "In Progress": "bg-amber-50 text-amber-700",
  Pending: "bg-blue-50 text-blue-600",
  Overdue: "bg-red-50 text-red-500",
};

export default function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    getDashboardSummary().then(setData);
  }, []);

  if (!data) {
    return (
      <PageLayout breadcrumbItems={[{ label: "ContractIQ", to: "/" }, { label: "Dashboard" }]}>
        <div className="flex h-64 items-center justify-center text-sm text-slate-400">
          Loading dashboard…
        </div>
      </PageLayout>
    );
  }

  const { stats, contractVolume, complianceStatus, renewalsTrend, recentActivity, upcomingDeadlines } = data;

  return (
    <PageLayout
      breadcrumbItems={[{ label: "ContractIQ", to: "/" }, { label: "Dashboard" }]}
      primaryAction={{ label: "New Contract", icon: Plus, onClick: () => {} }}
      notificationCount={3}
    >
      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-5">
        <StatCard
          icon={FileText}
          iconBg="#dbeafe"
          iconColor="#2563eb"
          value={stats.totalContracts.value}
          label="Total Contracts"
          sublabel="All categories"
          trend={stats.totalContracts.trend}
        />
        <StatCard
          icon={CheckCircle2}
          iconBg="#d1fae5"
          iconColor="#059669"
          value={stats.activeContracts.value}
          label="Active Contracts"
          sublabel={`↑ ${stats.activeContracts.newThisMonth} this month`}
          trend={stats.activeContracts.trend}
        />
        <StatCard
          icon={RefreshCw}
          iconBg="#fef3c7"
          iconColor="#d97706"
          value={stats.upcomingRenewals.value}
          label="Upcoming Renewals"
          sublabel="Next 180 days"
          trendLabel={`${stats.upcomingRenewals.urgent} urgent`}
          trend={-1}
        />
        <StatCard
          icon={Clock}
          iconBg="#fee2e2"
          iconColor="#dc2626"
          value={stats.pendingObligations.value}
          label="Pending Obligations"
          sublabel={`${stats.pendingObligations.highPriority} high priority`}
          trendLabel={`${stats.pendingObligations.newCount} new`}
          trend={-1}
        />
        <StatCard
          icon={ShieldCheck}
          iconBg="#cffafe"
          iconColor="#0891b2"
          value={`${stats.complianceScore.value}%`}
          label="Compliance Score"
          sublabel="Above 85% target"
          trend={stats.complianceScore.trend}
        />
      </div>

      {/* Contract volume + compliance donut */}
      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-6 xl:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-900">Contract Volume</h3>
              <p className="text-xs text-slate-400">Jan – Jul 2025</p>
            </div>
            <Legend items={[
              { label: "Active", color: "#3b82f6" },
              { label: "New", color: "#10b981" },
              { label: "Expired", color: "#ef4444" },
            ]} />
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={contractVolume}>
              <CartesianGrid vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
              <Tooltip cursor={{ fill: "#f8fafc" }} />
              <Bar dataKey="active" fill="#3b82f6" radius={[3, 3, 0, 0]} />
              <Bar dataKey="new" fill="#10b981" radius={[3, 3, 0, 0]} />
              <Bar dataKey="expired" fill="#ef4444" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <h3 className="font-semibold text-slate-900">Compliance Status</h3>
          <p className="mb-4 text-xs text-slate-400">All {stats.totalContracts.value} contracts</p>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={complianceStatus}
                dataKey="value"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={2}
              >
                {complianceStatus.map((entry) => (
                  <Cell key={entry.label} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <ul className="mt-2 space-y-2">
            {complianceStatus.map((item) => (
              <li key={item.label} className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-slate-600">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  {item.label}
                </span>
                <span className="font-medium text-slate-900">{item.value}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Renewals trend + recent activity */}
      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-6 xl:col-span-2">
          <h3 className="font-semibold text-slate-900">Renewals Trend</h3>
          <p className="mb-4 text-xs text-slate-400">Monthly renewal activity 2025</p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={renewalsTrend}>
              <CartesianGrid vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#f59e0b" strokeWidth={2} dot={{ r: 3, fill: "#f59e0b" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold text-slate-900">Recent Activity</h3>
            <button className="text-xs font-medium text-blue-600 hover:underline">View all</button>
          </div>
          <ul className="space-y-4">
            {recentActivity.map((item) => {
              const { Icon, color, bg } = ACTIVITY_ICONS[item.type] ?? ACTIVITY_ICONS.created;
              return (
                <li key={item.id} className="flex items-start gap-3">
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: bg }}
                  >
                    <Icon size={14} style={{ color }} />
                  </span>
                  <div className="min-w-0">
                    <p className="truncate text-sm text-slate-700">{item.text}</p>
                    <p className="text-xs text-slate-400">{item.timeAgo}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Upcoming deadlines table */}
      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-slate-900">Upcoming Deadlines</h3>
            <p className="text-xs text-slate-400">Next 90 days</p>
          </div>
          <button className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50">
            Export
          </button>
        </div>

        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400">
              <th className="pb-3 font-medium">Contract</th>
              <th className="pb-3 font-medium">Obligation</th>
              <th className="pb-3 font-medium">Due Date</th>
              <th className="pb-3 font-medium">Assignee</th>
              <th className="pb-3 font-medium">Priority</th>
              <th className="pb-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {upcomingDeadlines.map((row) => (
              <tr key={row.contractId} className="border-b border-slate-50 last:border-0">
                <td className="py-3 font-medium text-blue-600">{row.contractId}</td>
                <td className="py-3 text-slate-700">{row.obligation}</td>
                <td className="py-3 text-slate-400">{row.dueDate}</td>
                <td className="py-3">
                  <span className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-[10px] font-semibold text-blue-700">
                      {row.assignee.initials}
                    </span>
                    <span className="text-slate-700">{row.assignee.name}</span>
                  </span>
                </td>
                <td className="py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${PRIORITY_STYLES[row.priority]}`}>
                    {row.priority}
                  </span>
                </td>
                <td className="py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${STATUS_STYLES[row.status]}`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageLayout>
  );
}

function Legend({ items }) {
  return (
    <div className="flex items-center gap-4 text-xs text-slate-500">
      {items.map((item) => (
        <span key={item.label} className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: item.color }} />
          {item.label}
        </span>
      ))}
    </div>
  );
}