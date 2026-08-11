import React from 'react';

const RANGES = ['7D', '1M', '3M', 'YTD'];

export default function TimeRangeToggle({ value, onChange }) {
  return (
    <div className="flex gap-1">
      {RANGES.map((r) => (
        <button
          key={r}
          onClick={() => onChange(r)}
          className={`text-sm font-medium px-3 py-1.5 rounded-lg border ${
            value === r ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
          }`}
        >
          {r}
        </button>
      ))}
    </div>
  );
}
