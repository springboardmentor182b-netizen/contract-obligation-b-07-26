import React from 'react';
import { FileText, ClipboardList, ShieldCheck, RefreshCw } from 'lucide-react';

function Card({ label, value, delta, deltaTone, footnote, icon, iconBg }) {
  const toneClass = deltaTone === 'up' ? 'text-emerald-600' : deltaTone === 'down' ? 'text-red-600' : 'text-slate-400';
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-5 flex flex-col gap-2">
      <div className="flex items-start justify-between">
        <p className="text-xs font-medium tracking-wide text-slate-400 uppercase">{label}</p>
        <span className={`w-9 h-9 rounded-lg flex items-center justify-center ${iconBg}`}>{icon}</span>
      </div>
      <p className="text-3xl font-semibold text-slate-900 leading-none">{value}</p>
      {delta != null ? (
        <p className={`text-xs font-medium ${toneClass}`}>
          {deltaTone === 'up' ? '↗' : deltaTone === 'down' ? '↘' : ''} {delta}
        </p>
      ) : (
        <p className="text-xs text-slate-400">{footnote}</p>
      )}
    </div>
  );
}

export default function OverviewCards({ overview }) {
  if (!overview) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card
        label="Active Contracts"
        value={overview.activeContracts}
        delta={`+${overview.activeContractsDelta} this quarter`}
        deltaTone="up"
        icon={<FileText size={16} className="text-blue-600" />}
        iconBg="bg-blue-50"
      />
      <Card
        label="Pending Obligations"
        value={overview.pendingObligations}
        delta={`${overview.pendingObligationsDelta} vs last month`}
        deltaTone={overview.pendingObligationsDelta < 0 ? 'down' : 'neutral'}
        icon={<ClipboardList size={16} className="text-amber-600" />}
        iconBg="bg-amber-50"
      />
      <Card
        label="Compliance Rate"
        value={`${overview.complianceRate}%`}
        delta={`+${overview.complianceRateDeltaPts} pts MoM`}
        deltaTone="up"
        icon={<ShieldCheck size={16} className="text-emerald-600" />}
        iconBg="bg-emerald-50"
      />
      <Card
        label="Upcoming Renewals"
        value={overview.upcomingRenewals}
        footnote={`Next ${overview.upcomingRenewalsWindowDays} days`}
        icon={<RefreshCw size={16} className="text-violet-600" />}
        iconBg="bg-violet-50"
      />
    </div>
  );
}
