import React from "react";
import {
  ShieldCheck,
  AlertTriangle,
  FileText,
  Info,
  BarChart3,
  FileCheck2,
} from "lucide-react";

const ICONS = [ShieldCheck, AlertTriangle, FileText, Info, BarChart3, FileCheck2];

const TAG_STYLES = {
  up: "bg-[#E7F6EF] text-[#12805C]",
  warn: "bg-[#FFF4E5] text-[#B54708]",
  danger: "bg-[#F1EBFF] text-[#5925DC]",
  neutral: "bg-[#F1F5F9] text-[#475467]",
};

const DEFAULT_KPIS = [
  { label: "Overall Compliance", value: "94%", tag: "+2.5%", tagTone: "up" },
  { label: "At Risk Obligations", value: "12", tag: "Attention", tagTone: "warn" },
  { label: "Active Contracts", value: "184", tag: "Total", tagTone: "neutral" },
  { label: "Critical Alerts", value: "3", tag: "Urgent", tagTone: "danger" },
  { label: "Audits Completed", value: "28", tag: "+4", tagTone: "up" },
  { label: "Pending Reviews", value: "7", tag: "Pending", tagTone: "warn" },
];

function KpiCard({ icon: Icon, label, value, tag, tagTone }) {
  return (
    <div className="rounded-2xl border border-[#ECE7DE] bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${TAG_STYLES[tagTone] ?? TAG_STYLES.neutral}`}>
          {tag}
        </span>
        {Icon && <Icon size={18} className="text-[#98A2B3]" />}
      </div>
      <div className="mt-4 text-3xl font-semibold text-[#1F2937]">{value}</div>
      <div className="mt-1 text-sm text-[#6B7280]">{label}</div>
    </div>
  );
}

// Fixed: Defaults to DEFAULT_KPIS if kpis is undefined or null
export default function KpiStrip({ kpis = DEFAULT_KPIS }) {
  const items = kpis ?? DEFAULT_KPIS;

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-6">
      {items.map((kpi, i) => (
        <KpiCard key={kpi.label || i} icon={ICONS[i % ICONS.length]} {...kpi} />
      ))}
    </div>
  );
}