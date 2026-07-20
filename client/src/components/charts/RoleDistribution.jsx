import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { getRoleDistribution } from "../../api/usersApi";

const FALLBACK = [
  { name: "Admin",   value: 3,  color: "#2563EB" },
  { name: "Manager", value: 8,  color: "#8B5CF6" },
  { name: "Editor",  value: 11, color: "#22C55E" },
  { name: "Viewer",  value: 9,  color: "#F59E0B" },
];

const CustomTooltip = ({ active, payload }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-lg text-sm">
      <p className="font-semibold text-slate-700">{payload[0].name}</p>
      <p style={{ color: payload[0].payload.color }}>{payload[0].value} users</p>
    </div>
  );
};

/** Skeleton */
const Skeleton = () => (
  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 animate-pulse">
    <div className="h-4 w-40 rounded bg-slate-200 mb-1.5" />
    <div className="h-3 w-28 rounded bg-slate-200 mb-6" />
    <div className="flex justify-center mb-4">
      <div className="h-44 w-44 rounded-full bg-slate-100" />
    </div>
    {[1, 2, 3, 4].map((i) => (
      <div key={i} className="flex justify-between mt-2">
        <div className="h-3 w-24 rounded bg-slate-100" />
        <div className="h-3 w-8 rounded bg-slate-100" />
      </div>
    ))}
  </div>
);

const RoleDistribution = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRoleDistribution()
      .then((res) => setData(res.data))
      .catch(() => setData(FALLBACK))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Skeleton />;

  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
      <h2 className="text-base font-semibold text-slate-800">
        Role Distribution
      </h2>
      <p className="text-sm text-slate-400 mt-0.5 mb-4">
        Users by assigned role
      </p>

      {/* Donut with center label */}
      <div className="relative">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              innerRadius={58}
              outerRadius={88}
              paddingAngle={3}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              {data.map((entry, idx) => (
                <Cell key={idx} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center total */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-slate-900">{total}</span>
          <span className="text-xs text-slate-400">Total</span>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 space-y-2.5">
        {data.map((role) => {
          const pct = total > 0 ? ((role.value / total) * 100).toFixed(0) : 0;
          return (
            <div key={role.name} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full shrink-0"
                  style={{ background: role.color }}
                />
                <span className="text-sm text-slate-600">{role.name}</span>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-1.5 w-20 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${pct}%`, background: role.color }}
                  />
                </div>
                <span className="w-6 text-right text-sm font-semibold text-slate-700">
                  {role.value}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RoleDistribution;