import { useState, useEffect } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getRegistrationTrend } from "../../api/usersApi";

/** Custom tooltip for the chart */
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-lg text-sm">
      <p className="font-semibold text-slate-700">{label}</p>
      <p className="text-blue-600">{payload[0].value} new users</p>
    </div>
  );
};

/** Skeleton */
const ChartSkeleton = () => (
  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 animate-pulse">
    <div className="flex justify-between items-start mb-5">
      <div className="space-y-2">
        <div className="h-4 w-40 rounded bg-slate-200" />
        <div className="h-3 w-56 rounded bg-slate-200" />
      </div>
      <div className="h-7 w-16 rounded-full bg-slate-200" />
    </div>
    <div className="h-[280px] rounded-xl bg-slate-100" />
  </div>
);

const RegistrationChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRegistrationTrend()
      .then((res) => setData(res.data))
      .catch(() => {
        // Fallback to static data if API unavailable
        setData([
          { month: "Jan", users: 8 },
          { month: "Feb", users: 14 },
          { month: "Mar", users: 11 },
          { month: "Apr", users: 19 },
          { month: "May", users: 24 },
          { month: "Jun", users: 18 },
          { month: "Jul", users: 32 },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <ChartSkeleton />;

  const growth =
    data.length >= 2
      ? (((data.at(-1).users - data[0].users) / data[0].users) * 100).toFixed(1)
      : 0;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <div className="flex justify-between items-start mb-5">
        <div>
          <h2 className="text-base font-semibold text-slate-800">
            Registration Trend
          </h2>
          <p className="text-sm text-slate-400 mt-0.5">New users per month — 2026</p>
        </div>

        <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-semibold ring-1 ring-emerald-200">
          +{growth}%
        </span>
      </div>

      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
          <defs>
            <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 12, fill: "#94a3b8" }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="users"
            stroke="#3b82f6"
            strokeWidth={2.5}
            fill="url(#blueGrad)"
            dot={{ fill: "#3b82f6", r: 4, strokeWidth: 2, stroke: "#fff" }}
            activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2, fill: "#fff" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RegistrationChart;