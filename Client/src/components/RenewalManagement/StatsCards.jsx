import {
  FileText,
  CheckCircle,
  Clock,
  AlertTriangle,
} from "lucide-react";

const StatsCards = ({ renewals = [] }) => {
  const totalRenewals = renewals.length;

  const completedRenewals = renewals.filter(
    (item) =>
      item.renewal_status?.toLowerCase() === "completed"
  ).length;

  const pendingRenewals = renewals.filter(
    (item) =>
      item.renewal_status?.toLowerCase() === "pending"
  ).length;

  const overdueRenewals = renewals.filter((item) => {
    if (!item.renewal_date) return false;

    return (
      new Date(item.renewal_date) < new Date() &&
      item.renewal_status?.toLowerCase() !== "completed"
    );
  }).length;

  const cards = [
    {
      title: "Total Renewals",
      value: totalRenewals,
      icon: FileText,
      bg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "Completed",
      value: completedRenewals,
      icon: CheckCircle,
      bg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "Pending",
      value: pendingRenewals,
      icon: Clock,
      bg: "bg-yellow-100",
      iconColor: "text-yellow-600",
    },
    {
      title: "Overdue",
      value: overdueRenewals,
      icon: AlertTriangle,
      bg: "bg-red-100",
      iconColor: "text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <div
            key={card.title}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {card.title}
                </p>

                <h2 className="mt-3 text-4xl font-bold text-gray-800">
                  {card.value}
                </h2>
              </div>

              <div
                className={`${card.bg} flex h-14 w-14 items-center justify-center rounded-2xl`}
              >
                <Icon
                  className={`h-7 w-7 ${card.iconColor}`}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;