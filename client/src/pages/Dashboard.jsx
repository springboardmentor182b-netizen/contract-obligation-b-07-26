import React from 'react';
import { Search, Bell } from 'lucide-react';
import { useAnalyticsDashboard } from '../hooks/useAnalyticsDashboard';
import OverviewCards from '../features/analytics/OverviewCards';
import TimeRangeToggle from '../features/analytics/TimeRangeToggle';
import GrowthTrendChart from '../features/analytics/GrowthTrendChart';
import PerformanceMetrics from '../features/analytics/PerformanceMetrics';
import DepartmentPerformanceChart from '../features/analytics/DepartmentPerformanceChart';
import RecentActivities from '../features/analytics/RecentActivities';

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

export default function Dashboard() {
  const { overview, trend, metrics, departments, activities, range, setRange, loading, error, refetch } = useAnalyticsDashboard();

  return (
    <div className="flex-1 flex flex-col overflow-y-auto bg-slate-50">
      <main className="p-8 space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Analytics Overview</h1>
            <p className="text-sm text-slate-400 mt-1">Business intelligence, performance metrics, and contract portfolio insights</p>
          </div>
          <TimeRangeToggle value={range} onChange={setRange} />
        </div>

        {loading && <DashboardSkeleton />}

        {!loading && error && (
          <div className="text-center py-10">
            <p className="text-sm text-slate-600 mb-3">{error}</p>
            <button onClick={refetch} className="text-sm font-medium text-white bg-slate-900 rounded-lg px-4 py-2 hover:bg-slate-800">
              Try again
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            <OverviewCards overview={overview} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <GrowthTrendChart points={trend.points} />
              <PerformanceMetrics items={metrics.items} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <DepartmentPerformanceChart departments={departments.departments} />
              <RecentActivities items={activities.items} />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
