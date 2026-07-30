import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

/**
 * @param {object} profile - { name, email, department, role }
 * @param {(payload) => Promise<void>} onSave
 * @param {boolean} saving
 */
export default function ProfileSection({ profile, onSave, saving }) {
  const [form, setForm] = useState({ name: '', email: '', department: '' });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (profile) {
      setForm({ name: profile.name, email: profile.email, department: profile.department || '' });
    }
  }, [profile]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    try {
      await onSave(form);
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Failed to save profile.');
    }
  }

  if (!profile) return null;

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 max-w-lg">
      <div>
        <h3 className="text-base font-semibold text-slate-900">Profile</h3>
        <p className="text-xs text-slate-400 mt-0.5">Your personal information</p>
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700">Full name</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className="w-full mt-1 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700">Email</label>
        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          className="w-full mt-1 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700">Department</label>
        <input
          type="text"
          value={form.department}
          onChange={(e) => setForm((f) => ({ ...f, department: e.target.value }))}
          className="w-full mt-1 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700">Role</label>
        <input
          type="text"
          value={profile.role}
          disabled
          className="w-full mt-1 px-3 py-2 text-sm border border-slate-200 rounded-lg bg-slate-50 text-slate-400"
        />
        <p className="text-xs text-slate-400 mt-1">Only an Administrator can change your role.</p>
      </div>

      {error && <p className="text-xs text-red-600">{error}</p>}
      {success && <p className="text-xs text-emerald-600">Profile updated.</p>}

      <button
        type="submit"
        disabled={saving}
        className="flex items-center gap-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60 rounded-lg px-4 py-2"
      >
        {saving && <Loader2 size={14} className="animate-spin" />}
        Save changes
      </button>
    </form>
  );
}
