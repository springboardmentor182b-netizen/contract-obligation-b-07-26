import { AlertTriangle, FileText, Info, CheckCircle2 } from "lucide-react";

const CARD_CONFIG = [
  {
    key: "openRisks",
    icon: AlertTriangle,
    label: "Open Risks",
    caption: "Requires immediate review",
    badge: (val) => (val > 0 ? `${val} Active` : "Clear"),
    badgeClass: (val) => (val > 0 ? "bg-rose-50 text-rose-600" : "bg-emerald-50 text-emerald-600"),
  },
  {
    key: "auditFindings",
    icon: FileText,
    label: "Audit Findings",
    caption: "Reported in last 30 days",
    badge: () => "Recent",
    badgeClass: () => "bg-slate-100 text-slate-600",
  },
  {
    key: "missedObligations",
    icon: Info,
    label: "Missed Obligations",
    caption: "Past obligation deadline",
    badge: (val) => (val > 0 ? "Action Req" : "None"),
    badgeClass: (val) => (val > 0 ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"),
  },
  {
    key: "compliantDepts",
    icon: CheckCircle2,
    label: "Compliant Depts",
    caption: "≥80% completion score",
    badge: () => "Passed",
    badgeClass: () => "bg-emerald-50 text-emerald-600",
  },
];

export default function QuickStatsGrid({ quickStats }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {CARD_CONFIG.map(({ key, icon: Icon, label, caption, badge, badgeClass }) => {
        const value = quickStats[key] ?? 0;
        return (
          <div
            key={key}
            className="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                <Icon size={16} />
              </span>
              <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${badgeClass(value)}`}>
                {badge(value)}
              </span>
            </div>
            <div className="mt-2">
              <div className="text-2xl font-extrabold text-slate-900">{value}</div>
              <div className="text-xs font-semibold text-slate-600">{label}</div>
              <div className="mt-0.5 text-[11px] text-slate-400">{caption}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}