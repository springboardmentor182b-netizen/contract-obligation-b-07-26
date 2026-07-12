const categories = [
  {
    name: "Vendor Agreements",
    completed: 18,
    total: 20,
    color: "bg-green-500",
  },
  {
    name: "Employment",
    completed: 9,
    total: 12,
    color: "bg-blue-500",
  },
  {
    name: "Service Contracts",
    completed: 11,
    total: 15,
    color: "bg-yellow-500",
  },
  {
    name: "NDA",
    completed: 14,
    total: 14,
    color: "bg-purple-500",
  },
  {
    name: "Lease Agreements",
    completed: 4,
    total: 8,
    color: "bg-red-500",
  },
];

const ComplianceCard = () => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

      <div className="mb-5">
        <h2 className="text-lg font-semibold text-gray-900">
          Compliance by Category
        </h2>

        <p className="text-sm text-gray-500">
          Completion status across contract categories
        </p>
      </div>

      <div className="space-y-5">
        {categories.map((item) => {
          const percentage = Math.round(
            (item.completed / item.total) * 100
          );

          return (
            <div key={item.name}>

              <div className="mb-2 flex items-center justify-between">

                <span className="text-sm font-medium">
                  {item.name}
                </span>

                <span className="text-sm text-gray-500">
                  {percentage}%
                </span>

              </div>

              <div className="h-2 rounded-full bg-gray-200">

                <div
                  className={`${item.color} h-2 rounded-full`}
                  style={{ width: `${percentage}%` }}
                />

              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};

export default ComplianceCard;