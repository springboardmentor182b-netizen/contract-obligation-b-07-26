import React, { useState } from 'react';
import { exportReport } from '../../services/reportsApi';

const EXPORT_OPTIONS = [
  { type: 'compliance', label: 'Export Compliance Report', format: 'PDF', color: 'bg-blue-600 hover:bg-blue-700' },
  { type: 'contract-summary', label: 'Export Contract Summary', format: 'Excel', color: 'bg-emerald-600 hover:bg-emerald-700' },
  { type: 'obligation', label: 'Export Obligation Report', format: 'PDF', color: 'bg-violet-600 hover:bg-violet-700' },
  { type: 'user-activity', label: 'Export User Activity Log', format: 'Excel', color: 'bg-amber-500 hover:bg-amber-600' },
  { type: 'audit-trail', label: 'Export Audit Trail', format: 'PDF', color: 'bg-slate-700 hover:bg-slate-800' },
];

export default function QuickExportPanel() {
  const [pendingType, setPendingType] = useState(null);
  const [error, setError] = useState(null);

  async function handleExport(type) {
    setPendingType(type);
    setError(null);
    try {
      const { downloadUrl } = await exportReport(type);
      window.open(downloadUrl, '_blank', 'noopener');
    } catch (err) {
      setError(err.message || 'Export failed. Try again.');
    } finally {
      setPendingType(null);
    }
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <div className="mb-4">
        <h3 className="text-base font-semibold text-slate-900">Quick Export</h3>
        <p className="text-xs text-slate-400">One-click report generation</p>
      </div>

      <div className="flex flex-col gap-2">
        {EXPORT_OPTIONS.map((opt) => (
          <button
            key={opt.type}
            onClick={() => handleExport(opt.type)}
            disabled={pendingType === opt.type}
            className={`flex items-center justify-between text-white text-sm font-medium rounded-lg px-4 py-2.5 transition disabled:opacity-60 ${opt.color}`}
          >
            <span>{pendingType === opt.type ? 'Exporting…' : opt.label}</span>
            <span className="text-xs bg-white/20 rounded px-1.5 py-0.5">{opt.format}</span>
          </button>
        ))}
      </div>

      {error && <p className="mt-3 text-xs text-red-600">{error}</p>}
    </div>
  );
}
