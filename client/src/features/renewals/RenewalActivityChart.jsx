import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-slate-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg">
      <p className="font-medium mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ color: p.fill }}>
          {p.name}: <span className="font-semibold">{p.value}</span>
        </p>
      ))}
    </div>
  );
}

/**
 * @param {Array<{ month, renewed, expired, upcoming }>} months
 * @param {number} year
 */
export default function RenewalActivityChart({ months = [], year }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 lg:col-span-2">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-900">Renewal Activity Trend</h3>
        <p className="text-xs text-slate-400">Monthly outcomes — {year}</p>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={months} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="#EEF1F5" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99,102,241,0.06)' }} />
            <Bar dataKey="upcoming" name="Upcoming" fill="#3B82F6" radius={[3, 3, 0, 0]} maxBarSize={14} />
            <Bar dataKey="renewed" name="Renewed" fill="#22C55E" radius={[3, 3, 0, 0]} maxBarSize={14} />
            <Bar dataKey="expired" name="Expired" fill="#EF4444" radius={[3, 3, 0, 0]} maxBarSize={14} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
