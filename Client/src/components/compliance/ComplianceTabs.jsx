import {
  ShieldCheck,
  AlertTriangle,
  FileText,
  BarChart3,
  Clock,
  History,
  FolderDown,
} from "lucide-react";

// Icon mapping for tabs
const TAB_ICONS = {
  "Compliance Overview": ShieldCheck,
  "Risk Indicators": AlertTriangle,
  "Audit Summary": FileText,
  "Dept Performance": BarChart3,
  "Missed Obligations": Clock,
  "Compliance History": History,
  "Compliance Docs": FolderDown,
};

export default function ComplianceTabs({ tabs, active, onChange }) {
  return (
    // Outer card container with my-8 for distinct spacing above and below
    <div className="my-8 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
      {/* Increased gap between tabs to gap-4 */}
      <div className="flex flex-wrap items-center gap-4 overflow-x-auto px-1 py-1">
        {tabs.map((tab) => {
          const isActive = active === tab;
          const Icon = TAB_ICONS[tab];

          return (
            <button
              key={tab}
              onClick={() => onChange(tab)}
              className={`flex items-center gap-3 rounded-xl px-5 py-3 text-sm font-bold tracking-wide transition-all whitespace-nowrap ${
                isActive
                  ? "bg-slate-900 text-white shadow-md shadow-slate-900/10 scale-[1.02]"
                  : "bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80"
              }`}
            >
              {Icon && (
                <Icon
                  size={18}
                  className={isActive ? "text-emerald-400" : "text-slate-500"}
                />
              )}
              <span>{tab}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}