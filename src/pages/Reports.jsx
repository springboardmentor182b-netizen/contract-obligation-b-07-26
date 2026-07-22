import React from 'react';
import { FileText, CalendarDays, Download, Clock, Search, Bell } from 'lucide-react';
import MetricCard from '../features/reports/MetricCard';
import MonthlyActivityChart from '../features/reports/MonthlyActivityChart';
import QuickExportPanel from '../features/reports/QuickExportPanel';
import ReportLibrary from '../features/reports/ReportLibrary';
import { useReportsDashboard } from '../hooks/useReportsDashboard';

/**
 * NOTE: this fills the previously-empty `pages/Reports.jsx` placeholder.
 * It assumes Navbar/Sidebar are rendered by a parent Layout (the way
 * Dashboard.jsx / Home.jsx etc. presumably do too) — this component is
 * only the page's own content, not the app shell.
 */

function DashboardSkeleton() {
  return (
    <div className="p-8 animate-pulse space-y-6">
      <div className="h-8 w-64 bg-slate-200 rounded" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-28 bg-slate-200 rounded-xl" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 h-72 bg-slate-200 rounded-xl" />
        <div className="h-72 bg-slate-200 rounded-xl" />
      </div>
    </div>
  );
}

function DashboardError({ message, onRetry }) {
  return (
    <div className="p-8 flex flex-col items-center justify-center text-center gap-3 h-full">
      <p className="text-sm font-medium text-slate-800">Couldn't load the dashboard</p>
      <p className="text-xs text-slate-500 max-w-sm">{message}</p>
      <button
        onClick={onRetry}
        className="text-sm font-medium text-white bg-slate-900 rounded-lg px-4 py-2 hover:bg-slate-800"
      >
        Try again
      </button>
    </div>
  );
}

export default function Reports() {
  const year = new Date().getFullYear();
  const { summary, activity, library, loading, error, refetch } = useReportsDashboard(year);

  return (
    <div className="flex-1 flex flex-col overflow-y-auto bg-slate-50">
      {/* Top bar — remove this if Navbar.jsx already renders a shared header */}
      <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-slate-200">
        <nav className="text-sm text-slate-400">
          ContractIQ <span className="mx-1">›</span> Reports <span className="mx-1">›</span>
          <span className="text-slate-700 font-medium"> Management</span>
        </nav>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-8 pr-3 py-1.5 text-sm border border-slate-200 rounded-lg w-56 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="relative w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200">
            <Bell size={15} className="text-slate-500" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full" />
          </button>
        </div>
      </header>

      {loading && <DashboardSkeleton />}
      {!loading && error && <DashboardError message={error} onRetry={refetch} />}

      {!loading && !error && (
        <main className="p-8 space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900">Reports Dashboard</h1>
              <p className="text-sm text-slate-400 mt-1">
                Generate, schedule, and export compliance and contract reports on-demand
              </p>
            </div>
            <div className="flex gap-2">
              <button className="text-sm font-medium text-slate-700 border border-slate-200 rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-slate-50">
                <CalendarDays size={15} /> Schedule Report
              </button>
              <button className="text-sm font-medium text-white bg-blue-600 rounded-lg px-4 py-2 flex items-center gap-2 hover:bg-blue-700">
                + New Report
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              label="Generated Reports"
              value={summary.generatedReports}
              footnote={`↗ +${summary.generatedDelta} this month`}
              trend="up"
              icon={<FileText size={16} className="text-blue-600" />}
              iconBg="bg-blue-50"
            />
            <MetricCard
              label="Scheduled Reports"
              value={summary.scheduledReports}
              footnote={`Next ${summary.scheduledWindowDays} days`}
              icon={<CalendarDays size={16} className="text-violet-600" />}
              iconBg="bg-violet-50"
            />
            <MetricCard
              label="Downloads"
              value={summary.downloads}
              footnote={`↗ +${summary.downloadsDelta} this month`}
              trend="up"
              icon={<Download size={16} className="text-emerald-600" />}
              iconBg="bg-emerald-50"
            />
            <MetricCard
              label="Pending Reports"
              value={summary.pendingReports}
              footnote="Awaiting generation"
              icon={<Clock size={16} className="text-amber-600" />}
              iconBg="bg-amber-50"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <MonthlyActivityChart months={activity.months} year={activity.year} />
            <QuickExportPanel />
          </div>

          <ReportLibrary items={library.items} onFilterClick={() => {}} />
        </main>
      )}
    </div>
  );
}
