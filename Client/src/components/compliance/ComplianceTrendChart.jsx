import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { TrendingUp, Calendar } from "lucide-react";

export default function ComplianceTrendChart({ trend }) {
  const chartData =
    trend && trend.length > 0
      ? trend
      : [
          { month: "Jan", score: 80 },
          { month: "Feb", score: 82 },
          { month: "Mar", score: 77 },
          { month: "Apr", score: 84 },
          { month: "May", score: 85 },
          { month: "Jun", score: 83 },
          { month: "Jul", score: 88 },
          { month: "Aug", score: 86 },
          { month: "Sep", score: 89 },
          { month: "Oct", score: 88 },
          { month: "Nov", score: 91 },
          { month: "Dec", score: 90 },
        ];

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900">Compliance Score Trend</h3>
          <p className="text-xs text-slate-500">
            Monthly compliance score across all contracts — 2026
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
            <TrendingUp size={13} />
            +11 pts YTD
          </span>
          <span className="flex items-center gap-1 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
            <Calendar size={13} />
            2026
          </span>
        </div>
      </div>

      <div className="mt-6 h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="scoreGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 11, fill: "#94A3B8" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[60, 100]}
              ticks={[70, 78, 86, 100]}
              tick={{ fontSize: 11, fill: "#94A3B8" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0F172A",
                color: "#FFFFFF",
                borderRadius: "12px",
                border: "none",
                fontSize: "12px",
              }}
            />
            <Area
              type="monotone"
              dataKey="score"
              stroke="#10B981"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#scoreGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}