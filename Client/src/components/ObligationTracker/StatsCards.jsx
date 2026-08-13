import {
  ClipboardList,
  Clock3,
  LoaderCircle,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  CalendarDays,
  BarChart3,
} from "lucide-react";

const StatsCards = ({ stats }) => {
  const cards = [
    {
      title: "Total",
      value: stats.total,
      badge: "+3",
      icon: ClipboardList,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Pending",
      value: stats.pending,
      badge: "New",
      icon: Clock3,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Progress",
      value: stats.progress,
      badge: "Active",
      icon: LoaderCircle,
      color: "bg-indigo-100 text-indigo-600",
    },
    {
      title: "Completed",
      value: stats.completed,
      badge: "+2",
      icon: CheckCircle2,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Overdue",
      value: stats.overdue,
      badge: "Urgent",
      icon: AlertTriangle,
      color: "bg-red-100 text-red-600",
    },
    {
      title: "Risk",
      value: stats.risk,
      badge: "Watch",
      icon: ShieldAlert,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Due",
      value: stats.due,
      badge: "7 Days",
      icon: CalendarDays,
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Compliance",
      value: `${stats.compliance}%`,
      badge: "+1.2%",
      icon: BarChart3,
      color: "bg-emerald-100 text-emerald-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-3">
      {cards.map((item, index) => {
        const Icon = item.icon;

        return (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm hover:shadow-md transition-all duration-200"
          >
            {/* Top */}
            <div className="flex items-center justify-between">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${item.color}`}
              >
                <Icon size={16} />
              </div>

              <span className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">
                {item.badge}
              </span>
            </div>

            {/* Value */}
            <h2 className="text-2xl font-bold text-gray-800 mt-3">
              {item.value}
            </h2>

            {/* Title */}
            <p className="text-xs text-gray-500 mt-1">
              {item.title}
            </p>

            {/* Compliance Progress */}
            {item.title === "Compliance" && (
              <div className="mt-3 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${stats.compliance}%` }}
                ></div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;