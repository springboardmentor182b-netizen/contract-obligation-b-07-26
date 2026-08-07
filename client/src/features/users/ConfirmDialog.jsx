import React from 'react';

/**
 * @param {boolean} open
 * @param {string} title
 * @param {string} message
 * @param {string} [confirmLabel]
 * @param {'default'|'danger'} [tone]
 * @param {() => void} onConfirm
 * @param {() => void} onCancel
 */
export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  tone = 'default',
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-6">
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        <p className="text-sm text-slate-500 mt-2">{message}</p>
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onCancel}
            className="text-sm font-medium text-slate-600 border border-slate-200 rounded-lg px-4 py-2 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`text-sm font-medium text-white rounded-lg px-4 py-2 ${
              tone === 'danger' ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
