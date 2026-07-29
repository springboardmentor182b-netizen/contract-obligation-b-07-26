import React from 'react';

const STYLES = {
  upcoming: 'bg-blue-50 text-blue-700',
  renewed: 'bg-emerald-50 text-emerald-700',
  expired: 'bg-red-50 text-red-700',
  cancelled: 'bg-slate-100 text-slate-500',
};

const DOTS = {
  upcoming: 'bg-blue-500',
  renewed: 'bg-emerald-500',
  expired: 'bg-red-500',
  cancelled: 'bg-slate-400',
};

const LABELS = { upcoming: 'Upcoming', renewed: 'Renewed', expired: 'Expired', cancelled: 'Cancelled' };

export default function RenewalStatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full ${STYLES[status] || STYLES.cancelled}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${DOTS[status] || DOTS.cancelled}`} />
      {LABELS[status] || status}
    </span>
  );
}
