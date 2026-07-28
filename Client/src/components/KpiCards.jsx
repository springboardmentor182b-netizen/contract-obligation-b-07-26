import React from "react";
import { CheckCircle2, AlertTriangle, XCircle, FileStack } from "lucide-react";

function Card({ icon: Icon, label, value, tone, sublabel }) {
  return (
    <div className="rounded-card border border-border bg-surface p-5 shadow-card">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-ink-soft">{label}</span>
        {Icon && <Icon className={`h-4 w-4 ${tone}`} strokeWidth={2} />}
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="font-display text-3xl font-semibold text-ink">
          {value}
        </span>
        {sublabel && (
          <span className="font-mono text-xs text-ink-faint">{sublabel}</span>
        )}
      </div>
    </div>
  );
}

export default function KpiCards({ summary }) {
  // Safe fallbacks while data is loading or if summary is undefined
  const total = summary?.totalContracts ?? 0;
  const compliant = summary?.compliant ?? 0;
  const atRisk = summary?.atRisk ?? 0;
  const expired = summary?.expired ?? 0;

  // Calculate percentages safely (avoiding divide-by-zero NaN)
  const compliantPct = total > 0 ? Math.round((compliant / total) * 100) : 0;
  const atRiskPct = total > 0 ? Math.round((atRisk / total) * 100) : 0;
  const expiredPct = total > 0 ? Math.round((expired / total) * 100) : 0;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <Card
        icon={FileStack}
        label="Total Contracts"
        value={total}
        tone="text-brand"
      />
      <Card
        icon={CheckCircle2}
        label="Compliant"
        value={compliant}
        sublabel={`${compliantPct}%`}
        tone="text-status-compliant"
      />
      <Card
        icon={AlertTriangle}
        label="At Risk"
        value={atRisk}
        sublabel={`${atRiskPct}%`}
        tone="text-status-risk"
      />
      <Card
        icon={XCircle}
        label="Expired"
        value={expired}
        sublabel={`${expiredPct}%`}
        tone="text-status-expired"
      />
    </div>
  );
}