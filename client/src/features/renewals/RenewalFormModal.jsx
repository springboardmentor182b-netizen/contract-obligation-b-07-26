import React, { useEffect, useState } from 'react';
import { Loader2, X } from 'lucide-react';

const STATUSES = ['upcoming', 'renewed', 'expired', 'cancelled'];
const STATUS_LABELS = { upcoming: 'Upcoming', renewed: 'Renewed', expired: 'Expired', cancelled: 'Cancelled' };

const EMPTY_FORM = {
  contractName: '',
  counterparty: '',
  expiryDate: '',
  value: '',
  noticePeriodDays: 30,
  status: 'upcoming',
};

/**
 * @param {boolean} open
 * @param {object|null} renewal - pass an existing row to edit/renew, or null to create
 * @param {(payload) => Promise<void>} onCreate - called when renewal is null
 * @param {(id, payload) => Promise<void>} onUpdate - called when editing an existing row
 * @param {() => void} onClose
 */
export default function RenewalFormModal({ open, renewal, onCreate, onUpdate, onClose }) {
  const isEditing = !!renewal;
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (open) {
      setForm(
        renewal
          ? {
              contractName: renewal.contractName,
              counterparty: renewal.counterparty,
              expiryDate: renewal.expiryDate?.slice(0, 10) || '',
              value: renewal.value ?? '',
              noticePeriodDays: renewal.noticePeriodDays ?? 30,
              status: renewal.status,
            }
          : EMPTY_FORM
      );
      setError(null);
    }
  }, [open, renewal]);

  if (!open) return null;

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!form.contractName || !form.counterparty || !form.expiryDate) {
      setError('Fill in contract name, counterparty, and expiry date.');
      return;
    }

    setSubmitting(true);
    try {
      const payload = { ...form, value: Number(form.value) || 0, noticePeriodDays: Number(form.noticePeriodDays) || 0 };
      if (isEditing) {
        await onUpdate(renewal.id, payload);
      } else {
        await onCreate(payload);
      }
      onClose();
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-slate-900">{isEditing ? 'Edit renewal' : 'Renew contract'}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700">Contract name</label>
            <input
              type="text"
              value={form.contractName}
              onChange={(e) => update('contractName', e.target.value)}
              className="w-full mt-1 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Counterparty</label>
            <input
              type="text"
              value={form.counterparty}
              onChange={(e) => update('counterparty', e.target.value)}
              className="w-full mt-1 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-sm font-medium text-slate-700">Expiry date</label>
              <input
                type="date"
                value={form.expiryDate}
                onChange={(e) => update('expiryDate', e.target.value)}
                className="w-full mt-1 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700">Notice period (days)</label>
              <input
                type="number"
                min="0"
                value={form.noticePeriodDays}
                onChange={(e) => update('noticePeriodDays', e.target.value)}
                className="w-full mt-1 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Contract value ($)</label>
            <input
              type="number"
              min="0"
              value={form.value}
              onChange={(e) => update('value', e.target.value)}
              className="w-full mt-1 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {isEditing && (
            <div>
              <label className="text-sm font-medium text-slate-700">Status</label>
              <select
                value={form.status}
                onChange={(e) => update('status', e.target.value)}
                className="w-full mt-1 px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {STATUS_LABELS[s]}
                  </option>
                ))}
              </select>
            </div>
          )}

          {error && <p className="text-xs text-red-600">{error}</p>}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="text-sm font-medium text-slate-600 border border-slate-200 rounded-lg px-4 py-2 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60 rounded-lg px-4 py-2"
            >
              {submitting && <Loader2 size={14} className="animate-spin" />}
              {isEditing ? 'Save changes' : 'Add renewal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
