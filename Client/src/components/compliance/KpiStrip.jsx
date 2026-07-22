import {
  ShieldCheck,
  AlertTriangle,
  FileText,
  Info,
  BarChart3,
  FileCheck2,
} from "lucide-react";

// Modern pill badge color themes matching the Figma dark/emerald design
const TAG_STYLES = {
  up: "bg-emerald-50 text-emerald-600 border border-emerald-200/50",
  warn: "bg-amber-50 text-amber-600 border border-amber-200/50",
  danger: "bg-rose-50 text-rose-600 border border-rose-200/50",
  neutral: "bg-slate-100 text-slate-600 border border-slate-200/50",
};

const ICON_BADGE_STYLES = {
  up: "bg-emerald-100/70 text-emerald-600",
  warn: "bg-amber-100/70 text-amber-600",
  danger: "bg-rose-100/70 text-rose-600",
  neutral: "bg-slate-100 text-slate-600",
};

function scoreTier(score = 0) {
  if (score >= 85) return { label: "Excellent", tone: "up" };
  if (score >= 65) return { label: "Good", tone: "warn" };
  return { label: "Needs Attention", tone: "danger" };
}

function KpiCard({ icon: Icon, label, value, tag, tagTone }) {
  return (
    <div className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all hover:shadow-md hover:border-slate-300">
      {/* Top Header Row */}
      <div className="flex items-center justify-between gap-2">
        <span
          className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${
            ICON_BADGE_STYLES[tagTone] ?? ICON_BADGE_STYLES.neutral
          }`}
        >
          <Icon size={16} />
        </span>
        <span
          className={`whitespace-nowrap rounded-full px-2.5 py-0.5 text-[10px] font-bold leading-normal ${
            TAG_STYLES[tagTone] ?? TAG_STYLES.neutral
          }`}
        >
          {tag}
        </span>
      </div>

      {/* Metric Content */}
      <div className="mt-3">
        <div className="text-2xl font-extrabold tracking-tight text-slate-900">
          {value}
        </div>
        <div className="mt-0.5 text-xs font-semibold text-slate-500 truncate">
          {label}
        </div>
      </div>
    </div>
  );
}

/**
 * kpis: real object returned by GET /api/compliance/overview -> kpis
 * { complianceScore, openRisks, auditFindings, missedObligations, deptAvgScore, reportsReady }
 */
export default function KpiStrip({ kpis = {} }) {
  const complianceScore = kpis.complianceScore ?? 0;
  const deptAvgScore = kpis.deptAvgScore ?? 0;

  const complianceTier = scoreTier(complianceScore);
  const deptTier = scoreTier(deptAvgScore);

  const cards = [
    {
      icon: ShieldCheck,
      label: "Compliance Score",
      value: `${complianceScore}%`,
      tag: complianceTier.label,
      tagTone: complianceTier.tone,
    },
    {
      icon: AlertTriangle,
      label: "Open Risks",
      value: kpis.openRisks ?? 0,
      tag: (kpis.openRisks ?? 0) > 0 ? "Action needed" : "Clear",
      tagTone: (kpis.openRisks ?? 0) > 0 ? "warn" : "up",
    },
    {
      icon: FileText,
      label: "Audit Findings",
      value: kpis.auditFindings ?? 0,
      tag: "Last 30 days",
      tagTone: "neutral",
    },
    {
      icon: Info,
      label: "Missed Obligations",
      value: kpis.missedObligations ?? 0,
      tag: (kpis.missedObligations ?? 0) > 0 ? "Urgent" : "None",
      tagTone: (kpis.missedObligations ?? 0) > 0 ? "danger" : "up",
    },
    {
      icon: BarChart3,
      label: "Dept Avg Score",
      value: `${deptAvgScore}%`,
      tag: deptTier.label,
      tagTone: deptTier.tone,
    },
    {
      icon: FileCheck2,
      label: "Reports Ready",
      value: kpis.reportsReady ?? 0,
      tag: "Last 30 days",
      tagTone: "neutral",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
      {cards.map((kpi) => (
        <KpiCard key={kpi.label} {...kpi} />
      ))}
    </div>
  );
}