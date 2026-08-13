const ComplianceCard = ({ obligations }) => {
  const contracts = {};

  obligations.forEach((item) => {
    if (!contracts[item.contract]) {
      contracts[item.contract] = {
        contract: item.contract,
        total: 0,
        completed: 0,
      };
    }

    contracts[item.contract].total++;

    if (item.status === "Completed") {
      contracts[item.contract].completed++;
    }
  });

  const data = Object.values(contracts).map((item) => ({
    ...item,
    percent: Math.round(
      (item.completed / item.total) * 100
    ),
  }));

  const colors = [
    "bg-green-500",
    "bg-blue-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-red-500",
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <h2 className="text-2xl font-semibold">
        Compliance by Category
      </h2>

      <p className="text-gray-500 mb-6">
        Completion status across contracts
      </p>

      <div className="space-y-5">
        {data.map((item, index) => (
          <div key={item.contract}>
            <div className="flex justify-between mb-2">
              <span>{item.contract}</span>

              <span>{item.percent}%</span>
            </div>

            <div className="h-2 rounded-full bg-gray-200 overflow-hidden">
              <div
                className={`h-full ${
                  colors[index % colors.length]
                }`}
                style={{
                  width: `${item.percent}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComplianceCard;