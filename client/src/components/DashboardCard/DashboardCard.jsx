const colorMap = {
  blue: {
    bg: "bg-blue-100",
    icon: "text-blue-600",
  },
  green: {
    bg: "bg-green-100",
    icon: "text-green-600",
  },
  purple: {
    bg: "bg-purple-100",
    icon: "text-purple-600",
  },
  red: {
    bg: "bg-red-100",
    icon: "text-red-600",
  },
};

const DashboardCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  color,
}) => {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
            {title}
          </p>

          <h2 className="mt-4 text-4xl font-bold text-slate-900">
            {value}
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            {subtitle}
          </p>
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${colorMap[color].bg}`}
        >
          <Icon
            className={`${colorMap[color].icon}`}
            size={26}
          />
        </div>
      </div>

      <div className="mt-6 h-1 rounded-full bg-slate-100 overflow-hidden">
        <div
          className={`h-full rounded-full ${
            color === "blue"
              ? "bg-blue-500 w-[88%]"
              : color === "green"
              ? "bg-green-500 w-[76%]"
              : color === "purple"
              ? "bg-purple-500 w-[63%]"
              : "bg-red-500 w-[32%]"
          }`}
        />
      </div>
    </div>
  );
};

export default DashboardCard;