import React from 'react';

const ROLE_COLORS = {
  Administrator: 'bg-red-50 text-red-700',
  'Legal Manager': 'bg-violet-50 text-violet-700',
  'Compliance Officer': 'bg-blue-50 text-blue-700',
  'Contract Manager': 'bg-emerald-50 text-emerald-700',
  'Department Head': 'bg-amber-50 text-amber-700',
  Employee: 'bg-slate-100 text-slate-600',
};

export default function RoleBadge({ role }) {
  const classes = ROLE_COLORS[role] || 'bg-slate-100 text-slate-600';
  return <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${classes}`}>{role}</span>;
}
