import { FaArrowUp, FaArrowDown } from "react-icons/fa";

const colorMap = {
  blue: {
    bg: "bg-blue-50",
    icon: "text-blue-600",
    bar: "bg-blue-500",
    trend: "text-blue-600",
    ring: "ring-blue-100",
  },
  green: {
    bg: "bg-emerald-50",
    icon: "text-emerald-600",
    bar: "bg-emerald-500",
    trend: "text-emerald-600",
    ring: "ring-emerald-100",
  },
  purple: {
    bg: "bg-violet-50",
    icon: "text-violet-600",
    bar: "bg-violet-500",
    trend: "text-violet-600",
    ring: "ring-violet-100",
  },
  red: {
    bg: "bg-rose-50",
    icon: "text-rose-600",
    bar: "bg-rose-500",
    trend: "text-rose-600",
    ring: "ring-rose-100",
  },
};

/** Skeleton placeholder while loading */
export const DashboardCardSkeleton = () => (
  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm animate-pulse">
    <div className="flex items-start justify-between">
      <div className="space-y-3 flex-1">
        <div className="h-3 w-28 rounded bg-slate-200" />
        <div className="h-9 w-20 rounded bg-slate-200" />
        <div className="h-3 w-36 rounded bg-slate-200" />
      </div>
      <div className="h-14 w-14 rounded-2xl bg-slate-200" />
    </div>
    <div className="mt-6 h-1.5 rounded-full bg-slate-200" />
  </div>
);

/**
 * DashboardCard
 * Props:
 *   title    – card label (uppercase)
 *   value    – big number/stat
 *   subtitle – secondary info text
 *   icon     – React icon component
 *   color    – "blue" | "green" | "purple" | "red"
 *   progress – 0-100 bar fill percentage (optional)
 *   trend    – "up" | "down" (optional, drives trend icon)
 */
const DashboardCard = ({ title, value, subtitle, icon: Icon, color, progress = 75 }) => {
  const c = colorMap[color] ?? colorMap.blue;

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/80">
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1 pr-4">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
            {title}
          </p>

          <h2 className="mt-3 text-3xl font-bold text-slate-900">
            {value}
          </h2>

          <p className="mt-1.5 text-sm text-slate-500 truncate">
            {subtitle}
          </p>
        </div>

        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${c.bg} ring-4 ${c.ring}`}
        >
          <Icon className={c.icon} size={22} />
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-5 h-1.5 rounded-full bg-slate-100 overflow-hidden">
        <div
          className={`h-full rounded-full ${c.bar} transition-all duration-700`}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    </div>
  );
};

export default DashboardCard;