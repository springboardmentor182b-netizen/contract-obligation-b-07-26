const features = [
  {
    title: "Renewal Tracking",
    description: "Track all contract renewals",
    status: "Active",
    color: "bg-blue-500",
  },
  {
    title: "Expiry Monitoring",
    description: "Monitor upcoming expiry dates",
    status: "Enabled",
    color: "bg-green-500",
  },
  {
    title: "Auto Reminders",
    description: "Schedule renewal notifications",
    status: "Running",
    color: "bg-orange-500",
  },
  {
    title: "Approval Workflow",
    description: "Manage renewal approvals",
    status: "Available",
    color: "bg-purple-500",
  },
];

const FeaturesCard = () => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-gray-900">
          Renewal Features
        </h2>

        <p className="text-sm text-gray-500">
          Available renewal management features
        </p>
      </div>

      <div className="space-y-4">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="flex items-center justify-between rounded-lg border border-gray-100 p-3 hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-white ${feature.color}`}
              >
                {feature.title.charAt(0)}
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  {feature.title}
                </h3>

                <p className="text-xs text-gray-500">
                  {feature.description}
                </p>
              </div>
            </div>

            <span className="text-sm font-medium text-green-600">
              {feature.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesCard;