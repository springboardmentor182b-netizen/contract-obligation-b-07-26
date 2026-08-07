import React from 'react';

const STATUS_STYLES = {
  ready: 'bg-emerald-50 text-emerald-700',
  processing: 'bg-amber-50 text-amber-700',
  failed: 'bg-red-50 text-red-700',
};

/**
 * @param {Array<{ id, name, type, createdAt, status }>} items
 * @param {() => void} onFilterClick
 */
export default function ReportLibrary({ items = [], onFilterClick }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-slate-900">Report Library</h3>
        <button
          onClick={onFilterClick}
          className="text-sm font-medium text-slate-600 border border-slate-200 rounded-lg px-3 py-1.5 hover:bg-slate-50"
        >
          Filter
        </button>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-slate-400 py-6 text-center">No reports yet — generate one to see it here.</p>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-xs uppercase tracking-wide text-slate-400 border-b border-slate-100">
              <th className="py-2 font-medium">Report</th>
              <th className="py-2 font-medium">Type</th>
              <th className="py-2 font-medium">Created</th>
              <th className="py-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {items.map((r) => (
              <tr key={r.id} className="border-b border-slate-50 last:border-0">
                <td className="py-3 font-medium text-slate-800">{r.name}</td>
                <td className="py-3 text-slate-500">{r.type}</td>
                <td className="py-3 text-slate-500">{new Date(r.createdAt).toLocaleDateString()}</td>
                <td className="py-3">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${STATUS_STYLES[r.status] || 'bg-slate-100 text-slate-600'}`}>
                    {r.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
