import { TrendingUp, TrendingDown } from "lucide-react";


export default function StatCard({
  icon: Icon,
  iconBg,
  iconColor,
  value,
  label,
  sublabel,
  trend,
  trendLabel,
}) {
  const isUp = trend >= 0;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-lg"
          style={{ backgroundColor: iconBg }}
        >
          <Icon size={18} style={{ color: iconColor }} />
        </div>
        {(trend !== undefined || trendLabel) && (
          <span
            className={`flex items-center gap-1 text-xs font-medium ${
              isUp ? "text-emerald-600" : "text-red-500"
            }`}
          >
            {isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
            {trendLabel ?? `${isUp ? "+" : ""}${trend}%`}
          </span>
        )}
      </div>

      <div className="text-2xl font-semibold text-slate-900">{value}</div>
      <div className="mt-0.5 text-sm font-medium text-slate-700">{label}</div>
      {sublabel && <div className="mt-0.5 text-xs text-slate-400">{sublabel}</div>}
    </div>
  );
}