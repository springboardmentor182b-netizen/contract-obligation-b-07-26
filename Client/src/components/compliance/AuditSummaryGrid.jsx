import { CheckCircle2, AlertTriangle, FileText, Clock } from "lucide-react";

/**
 * summary: the real object from GET /api/compliance/audit-summary
 * { auditsCompleted, findingsRaised, resolvedFindings, openFindings }
 */
export default function AuditSummaryGrid({ summary }) {
  const items = [
    { icon: CheckCircle2, label: "Audits Completed", value: summary.auditsCompleted, tone: "up" },
    { icon: AlertTriangle, label: "Findings Raised", value: summary.findingsRaised, tone: "warn" },
    { icon: FileText, label: "Resolved Findings", value: summary.resolvedFindings, tone: "neutral" },
    { icon: Clock, label: "Open Findings", value: summary.openFindings, tone: "danger" },
  ];

  const TONE = {
    up: "text-[#22C55E] bg-[#E7F6EF]",
    warn: "text-[#F59E0B] bg-[#FFF4E5]",
    neutral: "text-[#3B82F6] bg-[#EAF1FA]",
    danger: "text-[#EF4444] bg-[#FEECEB]",
  };

  return (
    <div className="rounded-2xl border border-[#ECE7DE] bg-white p-6 shadow-sm">
      <h3 className="text-base font-semibold text-[#1F2937]">Audit Summary</h3>

      <div className="mt-4 grid grid-cols-2 gap-4">
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <span className={`flex h-9 w-9 items-center justify-center rounded-full ${TONE[item.tone]}`}>
              <item.icon size={16} />
            </span>
            <div>
              <p className="text-lg font-semibold text-[#1F2937]">{item.value}</p>
              <p className="text-xs text-[#6B7280]">{item.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
