const ResponsibilityCard = ({ obligations }) => {
  const owners = {};

  obligations.forEach((item) => {
    if (!owners[item.owner]) {
      owners[item.owner] = {
        owner: item.owner,
        total: 0,
        overdue: 0,
      };
    }

    owners[item.owner].total++;

    if (item.status === "Pending") {
      owners[item.owner].overdue++;
    }
  });

  const data = Object.values(owners);

  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-orange-500",
    "bg-purple-500",
    "bg-pink-500",
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border p-5">
      <h1 className="text-2xl font-semibold">
        Responsibility Assignments
      </h1>

      <p className="text-gray-500 mb-4">
        Obligation workload by assignee
      </p>

      <div className="space-y-3">
        {data.map((item, index) => (
          <div
            key={item.owner}
            className="flex items-center justify-between border rounded-xl p-3"
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                  colors[index % colors.length]
                }`}
              >
                {item.owner.substring(0, 2).toUpperCase()}
              </div>

              <div>
                <h3 className="text-sm font-semibold">{item.owner}</h3>

                <p className="text-sm text-gray-500">
                  Contract Owner
                </p>
              </div>
            </div>

            <div className="text-right">
              <h3 className="text-sm font-semibold">
                {item.total} Tasks
              </h3>

              <p
                className={
                  item.overdue > 0
                    ? "text-red-500 text-sm"
                    : "text-green-600 text-sm"
                }
              >
                {item.overdue > 0
                  ? `${item.overdue} Pending`
                  : "All Completed"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResponsibilityCard;