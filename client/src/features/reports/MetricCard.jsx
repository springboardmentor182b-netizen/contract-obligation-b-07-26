import React from 'react';

/**
 * One of the four top stat cards (Generated Reports, Scheduled Reports, etc.)
 *
 * @param {string} label - small uppercase label, e.g. "GENERATED REPORTS"
 * @param {string|number} value - the big number
 * @param {string} [footnote] - small text below the value, e.g. "+9 this month"
 * @param {'up'|'down'|'neutral'} [trend] - colors the footnote green/red/gray
 * @param {React.ReactNode} icon - icon element (e.g. from lucide-react)
 * @param {string} [iconBg] - tailwind bg class for the icon chip
 */
export default function MetricCard({ label, value, footnote, trend = 'neutral', icon, iconBg = 'bg-blue-50' }) {
  const trendColor = trend === 'up' ? 'text-emerald-600' : trend === 'down' ? 'text-red-600' : 'text-slate-400';

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between">
        <p className="text-xs font-medium tracking-wide text-slate-400 uppercase">{label}</p>
        <span className={`w-9 h-9 rounded-lg flex items-center justify-center ${iconBg}`}>{icon}</span>
      </div>
      <p className="text-3xl font-semibold text-slate-900 leading-none">{value}</p>
      {footnote && <p className={`text-xs font-medium ${trendColor}`}>{footnote}</p>}
    </div>
  );
}
