import React from 'react';

const COLOR_CLASSES = {
  blue: 'bg-blue-600',
  green: 'bg-emerald-500',
  purple: 'bg-violet-600',
  teal: 'bg-teal-500',
  orange: 'bg-amber-500',
};

/** @param {Array<{ label, valuePercent, color }>} items */
export default function PerformanceMetrics({ items = [] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-900">Performance Metrics</h3>
        <p className="text-xs text-slate-400">Key operational KPIs</p>
      </div>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.label}>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-slate-700">{item.label}</span>
              <span className="font-semibold text-slate-900">{item.valuePercent}%</span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${COLOR_CLASSES[item.color] || 'bg-blue-600'}`}
                style={{ width: `${item.valuePercent}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
