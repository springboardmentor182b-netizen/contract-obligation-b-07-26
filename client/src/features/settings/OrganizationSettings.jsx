import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

const TIMEZONES = ['UTC', 'Asia/Kolkata', 'America/New_York', 'Europe/London', 'Asia/Singapore'];
const CURRENCIES = ['USD', 'INR', 'EUR', 'GBP'];

/**
 * @param {object} organization - { name, timezone, defaultCurrency }
 * @param {(payload) => Promise<void>} onSave
 * @param {boolean} saving
 */
export default function OrganizationSettings({ organization, onSave, saving }) {
  const [form, setForm] = useState({ name: '', timezone: TIMEZONES[0], defaultCurrency: CURRENCIES[0] });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (organization) setForm(organization);
  }, [organization]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    try {
      await onSave(form);
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Failed to save organization settings.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 max-w-lg">
      <div>
        <h3 className="text-base font-semibold text-slate-900">Organization</h3>
        <p className="text-xs text-slate-400 mt-0.5">Administrator-only settings for your whole team</p>
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700">Organization name</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className="w-full mt-1 px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700">Timezone</label>
        <select
          value={form.timezone}
          onChange={(e) => setForm((f) => ({ ...f, timezone: e.target.value }))}
          className="w-full mt-1 px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {TIMEZONES.map((tz) => (
            <option key={tz} value={tz}>
              {tz}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="text-sm font-medium text-slate-700">Default currency</label>
        <select
          value={form.defaultCurrency}
          onChange={(e) => setForm((f) => ({ ...f, defaultCurrency: e.target.value }))}
          className="w-full mt-1 px-3 py-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {CURRENCIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {error && <p className="text-xs text-red-600">{error}</p>}
      {success && <p className="text-xs text-emerald-600">Organization settings updated.</p>}

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
