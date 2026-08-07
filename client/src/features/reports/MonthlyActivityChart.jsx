import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const generated = payload.find((p) => p.dataKey === 'generated')?.value ?? 0;
  const scheduled = payload.find((p) => p.dataKey === 'scheduled')?.value ?? 0;

  return (
    <div className="bg-slate-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg">
      <p className="font-medium mb-1">{label}</p>
      <p>
        Generated: <span className="font-semibold text-indigo-300">{generated}</span>
      </p>
      <p>
        Scheduled: <span className="font-semibold text-indigo-300">{scheduled}</span>
      </p>
    </div>
  );
}

/**
 * @param {Array<{ month: string, generated: number, scheduled: number }>} months
 * @param {number} year
 */
export default function MonthlyActivityChart({ months = [], year }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 lg:col-span-2">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-900">Monthly Report Activity</h3>
        <p className="text-xs text-slate-400">Generated vs scheduled — {year}</p>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={months} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid vertical={false} stroke="#EEF1F5" />
            <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(99,102,241,0.06)' }} />
            <Bar dataKey="generated" fill="#6D5DF6" radius={[4, 4, 0, 0]} maxBarSize={36} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
