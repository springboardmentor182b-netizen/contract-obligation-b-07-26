import { CheckCircle2, AlertTriangle, FileText, Clock } from "lucide-react";

const ICONS = [CheckCircle2, AlertTriangle, FileText, Clock];

const TONE = {
  up: "text-[#22C55E] bg-[#E7F6EF]",
  warn: "text-[#F59E0B] bg-[#FFF4E5]",
  neutral: "text-[#3B82F6] bg-[#EAF1FA]",
  danger: "text-[#EF4444] bg-[#FEECEB]",
};

export default function AuditSummaryGrid({ items }) {
  return (
    <div className="rounded-2xl border border-[#ECE7DE] bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-semibold text-[#1F2937]">Audit Summary</h3>
        <button className="text-sm font-medium text-[#D4AF37] hover:underline">
          Details &rsaquo;
        </button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        {items.map((item, i) => {
          const Icon = ICONS[i % ICONS.length];
          return (
            <div key={item.label} className="flex items-center gap-3">
              <span className={`flex h-9 w-9 items-center justify-center rounded-full ${TONE[item.tone]}`}>
                <Icon size={16} />
              </span>
              <div>
                <p className="text-lg font-semibold text-[#1F2937]">{item.value}</p>
                <p className="text-xs text-[#6B7280]">{item.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
