import { AlertTriangle, FileText, Info, CheckCircle2 } from "lucide-react";

const ICONS = [AlertTriangle, FileText, Info, CheckCircle2];

const ICON_TONE = {
  up: "text-[#22C55E] bg-[#E7F6EF]",
  warn: "text-[#F59E0B] bg-[#FFF4E5]",
  danger: "text-[#8B5CF6] bg-[#F1EBFF]",
  neutral: "text-[#22C55E] bg-[#E7F6EF]",
};

export default function QuickStatsGrid({ stats }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((stat, i) => {
        const Icon = ICONS[i % ICONS.length];
        return (
          <div
            key={stat.label}
            className="rounded-2xl border border-[#ECE7DE] bg-white p-5 shadow-sm"
          >
            <div className={`flex h-9 w-9 items-center justify-center rounded-full ${ICON_TONE[stat.tone]}`}>
              <Icon size={16} />
            </div>
            <div className="mt-3 text-2xl font-semibold text-[#1F2937]">
              {stat.value}
            </div>
            <div className="text-sm text-[#6B7280]">{stat.label}</div>
            <div className="mt-1 text-xs text-[#98A2B3]">{stat.caption}</div>
          </div>
        );
      })}
    </div>
  );
}
