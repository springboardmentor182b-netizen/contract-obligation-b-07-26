import React, { useEffect, useState } from 'react';
import { Loader2, X, Plus, Trash2 } from 'lucide-react';

/**
 * @param {boolean} open
 * @param {number[]} thresholds - e.g. [14, 60, 90]
 * @param {(thresholds: number[]) => Promise<void>} onSave
 * @param {() => void} onClose
 */
export default function SetRemindersModal({ open, thresholds, onSave, onClose }) {
  const [values, setValues] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (open) {
      setValues(thresholds && thresholds.length ? [...thresholds] : [14, 60, 90]);
      setError(null);
    }
  }, [open, thresholds]);

  if (!open) return null;

  function updateValue(index, value) {
    setValues((v) => v.map((x, i) => (i === index ? Number(value) : x)));
  }

  function addThreshold() {
    setValues((v) => [...v, 30]);
  }

  function removeThreshold(index) {
    setValues((v) => v.filter((_, i) => i !== index));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    const cleaned = values.filter((v) => v > 0);
    if (cleaned.length === 0) {
      setError('Add at least one reminder threshold.');
      return;
    }

    setSubmitting(true);
    try {
      await onSave([...new Set(cleaned)].sort((a, b) => a - b));
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to save reminder settings.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-semibold text-slate-900">Set reminders</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={18} />
          </button>
        </div>

        <p className="text-sm text-slate-500 mb-4">
          Get notified this many days before a contract expires. Applies to every tracked renewal.
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          {values.map((v, i) => (
            <div key={i} className="flex items-center gap-2">
              <input
                type="number"
                min="1"
                value={v}
                onChange={(e) => updateValue(i, e.target.value)}
                className="flex-1 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-slate-400">days before</span>
              <button
                type="button"
                onClick={() => removeThreshold(i)}
                className="w-8 h-8 flex items-center justify-center rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={addThreshold}
            className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:underline"
          >
            <Plus size={14} /> Add another threshold
          </button>

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
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
