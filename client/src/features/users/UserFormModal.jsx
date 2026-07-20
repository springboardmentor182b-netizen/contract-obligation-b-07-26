import React, { useEffect, useState } from 'react';
import { Loader2, X } from 'lucide-react';

const ROLES = [
  'Employee',
  'Department Head',
  'Contract Manager',
  'Compliance Officer',
  'Legal Manager',
  'Administrator',
];

const EMPTY_FORM = { name: '', email: '', role: ROLES[0], department: '', password: '' };

/**
 * @param {boolean} open
 * @param {object|null} user - pass an existing user to edit, or null to create
 * @param {(payload: object) => Promise<void>} onSubmit
 * @param {() => void} onClose
 */
export default function UserFormModal({ open, user, onSubmit, onClose }) {
  const isEditing = !!user;
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (open) {
      setForm(
        user
          ? { name: user.name, email: user.email, role: user.role, department: user.department || '', password: '' }
          : EMPTY_FORM
      );
      setError(null);
    }
  }, [open, user]);

  if (!open) return null;

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!form.name || !form.email || (!isEditing && !form.password)) {
      setError('Fill in all required fields.');
      return;
    }

    setSubmitting(true);
    try {
      const payload = isEditing
        ? { name: form.name, email: form.email, role: form.role, department: form.department }
        : { ...form };
      await onSubmit(payload);
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
          <h3 className="text-base font-semibold text-slate-900">{isEditing ? 'Edit user' : 'Add user'}</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700">Full name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => update('name', e.target.value)}
              className="w-full mt-1 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => update('email', e.target.value)}
              className="w-full mt-1 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Department</label>
            <input
              type="text"
              value={form.department}
              onChange={(e) => update('department', e.target.value)}
              className="w-full mt-1 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">Role</label>
            <select
              value={form.role}
              onChange={(e) => update('role', e.target.value)}
              className="w-full mt-1 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              {ROLES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>

          {!isEditing && (
            <div>
              <label className="text-sm font-medium text-slate-700">Temporary password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => update('password', e.target.value)}
                className="w-full mt-1 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
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
              {isEditing ? 'Save changes' : 'Add user'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
