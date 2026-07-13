const stats = [
  { title: "Total Renewals", value: 25, badge: "+4" },
  { title: "Upcoming", value: 8, badge: "Next 30 Days" },
  { title: "In Progress", value: 5, badge: "Active" },
  { title: "Renewed", value: 10, badge: "+2" },
  { title: "Expired", value: 2, badge: "Action" },
  { title: "Cancelled", value: 1, badge: "Closed" },
  { title: "Due Soon", value: 4, badge: "7 Days" },
  { title: "Renewal Rate", value: "92%", badge: "+3%" },
];

const StatsCards = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-4">
      {stats.map((item, index) => (
        <div
          key={index}
          className="bg-white border rounded-xl p-4 shadow-sm"
        >
          <div className="flex justify-between">
            <div className="w-8 h-8 rounded-full bg-gray-100"></div>

            <span className="text-xs bg-gray-100 rounded-full px-2 py-1">
              {item.badge}
            </span>
          </div>

          <h2 className="text-3xl font-bold mt-4">
            {item.value}
          </h2>

          <p className="text-sm text-gray-500">
            {item.title}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;