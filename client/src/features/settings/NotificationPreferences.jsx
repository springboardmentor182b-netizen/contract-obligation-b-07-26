import React, { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

function Toggle({ checked, onChange, label, description }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
      <div>
        <p className="text-sm font-medium text-slate-800">{label}</p>
        {description && <p className="text-xs text-slate-400 mt-0.5">{description}</p>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`w-10 h-6 rounded-full flex items-center px-0.5 transition ${
          checked ? 'bg-blue-600 justify-end' : 'bg-slate-200 justify-start'
        }`}
      >
        <span className="w-5 h-5 bg-white rounded-full shadow" />
      </button>
    </div>
  );
}

/**
 * @param {object} preferences - see settingsApi.getNotificationPreferences() shape
 * @param {(payload) => Promise<void>} onSave
 * @param {boolean} saving
 */
export default function NotificationPreferences({ preferences, onSave, saving }) {
  const [form, setForm] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (preferences) setForm(preferences);
  }, [preferences]);

  if (!form) return null;

  function toggle(field) {
    setForm((f) => ({ ...f, [field]: !f[field] }));
  }

  async function handleSave() {
    setError(null);
    setSuccess(false);
    try {
      await onSave(form);
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Failed to save notification preferences.');
    }
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6 max-w-lg">
      <div className="mb-2">
        <h3 className="text-base font-semibold text-slate-900">Notifications</h3>
        <p className="text-xs text-slate-400 mt-0.5">Choose how and when you're notified</p>
      </div>

      <div>
        <Toggle
          checked={form.emailEnabled}
          onChange={() => toggle('emailEnabled')}
          label="Email notifications"
          description="Receive updates via email"
        />
        <Toggle
          checked={form.smsEnabled}
          onChange={() => toggle('smsEnabled')}
          label="SMS notifications"
          description="Receive urgent alerts via text message"
        />
        <Toggle
          checked={form.inAppEnabled}
          onChange={() => toggle('inAppEnabled')}
          label="In-app notifications"
          description="Show notifications inside ContractIQ"
        />
        <Toggle
          checked={form.renewalReminders}
          onChange={() => toggle('renewalReminders')}
          label="Renewal reminders"
        />
        <Toggle
          checked={form.obligationAlerts}
          onChange={() => toggle('obligationAlerts')}
          label="Obligation due alerts"
        />
        <Toggle
          checked={form.complianceAlerts}
          onChange={() => toggle('complianceAlerts')}
          label="Compliance alerts"
        />
        <Toggle
          checked={form.approvalAlerts}
          onChange={() => toggle('approvalAlerts')}
          label="Contract approval alerts"
        />
      </div>

      {error && <p className="text-xs text-red-600 mt-3">{error}</p>}
      {success && <p className="text-xs text-emerald-600 mt-3">Preferences saved.</p>}

      <button
        onClick={handleSave}
        disabled={saving}
        className="flex items-center gap-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-60 rounded-lg px-4 py-2 mt-4"
      >
        {saving && <Loader2 size={14} className="animate-spin" />}
        Save preferences
      </button>
    </div>
  );
}
