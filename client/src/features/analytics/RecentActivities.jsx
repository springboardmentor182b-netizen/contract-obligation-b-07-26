import React from 'react';
import { FileText, CheckCircle2, AlertTriangle, RefreshCw, ShieldCheck } from 'lucide-react';

const ICONS = {
  contract_uploaded: { icon: FileText, bg: 'bg-blue-50', color: 'text-blue-600' },
  obligation_completed: { icon: CheckCircle2, bg: 'bg-emerald-50', color: 'text-emerald-600' },
  compliance_risk: { icon: AlertTriangle, bg: 'bg-red-50', color: 'text-red-600' },
  renewal_reminder: { icon: RefreshCw, bg: 'bg-amber-50', color: 'text-amber-600' },
  security_audit: { icon: ShieldCheck, bg: 'bg-violet-50', color: 'text-violet-600' },
};

function timeAgo(timestamp) {
  const diffMs = Date.now() - new Date(timestamp).getTime();
  const mins = Math.floor(diffMs / 60000);
  if (mins < 60) return `${mins} min`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr${hrs > 1 ? 's' : ''}`;
  const days = Math.floor(hrs / 24);
  return days === 1 ? 'Yesterday' : `${days} days ago`;
}

export default function RecentActivities({ items = [], onViewAll }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base font-semibold text-slate-900">Recent Activities</h3>
        <button onClick={onViewAll} className="text-sm font-medium text-blue-600 hover:underline">
          View all
        </button>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-slate-400 py-6 text-center">No recent activity.</p>
      ) : (
        <div className="divide-y divide-slate-50">
          {items.map((item) => {
            const cfg = ICONS[item.type] || ICONS.contract_uploaded;
            const Icon = cfg.icon;
            return (
              <div key={item.id} className="flex items-center gap-3 py-3">
                <span className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${cfg.bg}`}>
                  <Icon size={16} className={cfg.color} />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-800 truncate">{item.title}</p>
                  <p className="text-xs text-slate-400 truncate">{item.subtitle}</p>
                </div>
                <span className="text-xs text-slate-400 whitespace-nowrap">{timeAgo(item.timestamp)}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
