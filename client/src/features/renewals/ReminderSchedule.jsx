import React from 'react';

const URGENCY_STYLES = {
  critical: { bar: 'bg-red-500', badge: 'bg-red-50 text-red-700', label: 'Critical' },
  soon: { bar: 'bg-amber-400', badge: 'bg-amber-50 text-amber-700', label: 'Soon' },
  upcoming: { bar: 'bg-blue-500', badge: 'bg-blue-50 text-blue-700', label: 'Upcoming' },
  planned: { bar: 'bg-emerald-500', badge: 'bg-emerald-50 text-emerald-700', label: 'Planned' },
};

/** @param {Array<{ id, contractName, expiresInDays, urgency }>} items */
export default function ReminderSchedule({ items = [] }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <div className="mb-3">
        <h3 className="text-base font-semibold text-slate-900">Reminder Schedule</h3>
        <p className="text-xs text-slate-400">Automated renewal alerts</p>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-slate-400 py-6 text-center">No upcoming reminders.</p>
      ) : (
        <div className="divide-y divide-slate-50">
          {items.map((item) => {
            const style = URGENCY_STYLES[item.urgency] || URGENCY_STYLES.planned;
            return (
              <div key={item.id} className="flex items-center gap-3 py-3">
                <span className={`w-1 self-stretch rounded-full ${style.bar}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{item.contractName}</p>
                  <p className="text-xs text-slate-400">Expires in {item.expiresInDays} days</p>
                </div>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${style.badge}`}>
                  {style.label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
