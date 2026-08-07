import React from 'react';
import { Eye, Pencil, Trash2 } from 'lucide-react';
import RenewalStatusBadge from './RenewalStatusBadge';

/**
 * @param {Array} items
 * @param {(item) => void} onView
 * @param {(item) => void} onEdit
 * @param {(item) => void} onDelete
 */
export default function RenewalPipelineTable({ items, onView, onEdit, onDelete }) {
  if (items.length === 0) {
    return <p className="text-sm text-slate-400 py-10 text-center">No renewals match your filters.</p>;
  }

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="text-left text-xs uppercase tracking-wide text-slate-400 border-b border-slate-100">
          <th className="py-2 font-medium">ID</th>
          <th className="py-2 font-medium">Contract</th>
          <th className="py-2 font-medium">Counterparty</th>
          <th className="py-2 font-medium">Expiry Date</th>
          <th className="py-2 font-medium">Value</th>
          <th className="py-2 font-medium">Status</th>
          <th className="py-2 font-medium">Notice Period</th>
          <th className="py-2 font-medium text-right">Actions</th>
        </tr>
      </thead>
      <tbody>
        {items.map((r) => (
          <tr key={r.id} className="border-b border-slate-50 last:border-0">
            <td className="py-3 font-medium text-blue-600">{r.displayId}</td>
            <td className="py-3 font-medium text-slate-800">{r.contractName}</td>
            <td className="py-3 text-slate-500">{r.counterparty}</td>
            <td className="py-3 text-slate-500">
              {new Date(r.expiryDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
            </td>
            <td className="py-3 text-slate-700">${Number(r.value).toLocaleString()}</td>
            <td className="py-3">
              <RenewalStatusBadge status={r.status} />
            </td>
            <td className="py-3 text-slate-500">
              {r.status === 'renewed' ? 'Done' : r.status === 'expired' ? '—' : `${r.noticePeriodDays} days`}
            </td>
            <td className="py-3">
              <div className="flex justify-end gap-1">
                <button
                  onClick={() => onView(r)}
                  className="w-7 h-7 flex items-center justify-center rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50"
                  title="View"
                >
                  <Eye size={14} />
                </button>
                <button
                  onClick={() => onEdit(r)}
                  className="w-7 h-7 flex items-center justify-center rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                  title="Edit"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => onDelete(r)}
                  className="w-7 h-7 flex items-center justify-center rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50"
                  title="Delete"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
