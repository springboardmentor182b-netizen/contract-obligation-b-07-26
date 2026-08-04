import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-slate-900 text-white text-xs rounded-lg px-3 py-2 shadow-lg">
      <p className="font-medium mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ color: p.stroke }}>
          {p.name}: <span className="font-semibold">{p.value}</span>
        </p>
      ))}
    </div>
  );
}

/** @param {Array<{ period, contracts, obligations }>} points */
export default function GrowthTrendChart({ points = [] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 lg:col-span-2">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-900">Contract Growth & Obligations</h3>
        <p className="text-xs text-slate-400">Monthly trend</p>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={points} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <defs>
              <linearGradient id="obligationsFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F59E0B" stopOpacity={0.15} />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="#EEF1F5" />
            <XAxis dataKey="period" tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
            <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12, fill: '#94A3B8' }} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="obligations" name="Obligations" stroke="#F59E0B" fill="url(#obligationsFill)" strokeWidth={2} />
            <Area type="monotone" dataKey="contracts" name="Contracts" stroke="#3B82F6" fill="transparent" strokeWidth={2} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
