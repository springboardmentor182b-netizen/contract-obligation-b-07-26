const stats = [
  { title: "Total", value: 12, badge: "+3" },
  { title: "Pending", value: 3, badge: "4 New" },
  { title: "Progress", value: 4, badge: "Active" },
  { title: "Completed", value: 2, badge: "+2" },
  { title: "Overdue", value: 2, badge: "Urgent" },
  { title: "Risk", value: 1, badge: "Watch" },
  { title: "Due", value: 0, badge: "7 Days" },
  { title: "Compliance", value: "17%", badge: "+1.2%" },
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