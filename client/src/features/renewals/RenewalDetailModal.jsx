import React from 'react';
import { X } from 'lucide-react';
import RenewalStatusBadge from './RenewalStatusBadge';

export default function RenewalDetailModal({ open, renewal, onClose }) {
  if (!open || !renewal) return null;

  const rows = [
    ['ID', renewal.displayId],
    ['Contract', renewal.contractName],
    ['Counterparty', renewal.counterparty],
    ['Expiry date', new Date(renewal.expiryDate).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })],
    ['Value', `$${Number(renewal.value).toLocaleString()}`],
    ['Notice period', renewal.status === 'renewed' ? 'Done' : renewal.status === 'expired' ? '—' : `${renewal.noticePeriodDays} days`],
  ];

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-slate-900">Renewal details</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={18} />
          </button>
        </div>

        <div className="mb-4">
          <RenewalStatusBadge status={renewal.status} />
        </div>

        <dl className="space-y-3">
          {rows.map(([label, value]) => (
            <div key={label} className="flex justify-between text-sm">
              <dt className="text-slate-400">{label}</dt>
              <dd className="text-slate-800 font-medium text-right">{value}</dd>
            </div>
          ))}
        </dl>

        <button
          onClick={onClose}
          className="w-full mt-6 text-sm font-medium text-slate-600 border border-slate-200 rounded-lg px-4 py-2 hover:bg-slate-50"
        >
          Close
        </button>
      </div>
    </div>
  );
}
