const team = [
  {
    name: "James Park",
    role: "Legal Manager",
    tasks: 12,
    overdue: 1,
    color: "bg-blue-500",
  },
  {
    name: "Sarah Chen",
    role: "Compliance Officer",
    tasks: 8,
    overdue: 0,
    color: "bg-green-500",
  },
  {
    name: "Marcus Reid",
    role: "Contract Manager",
    tasks: 10,
    overdue: 2,
    color: "bg-orange-500",
  },
  {
    name: "Dana Kim",
    role: "Finance Lead",
    tasks: 6,
    overdue: 0,
    color: "bg-purple-500",
  },
];

const ResponsibilityCard = () => {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">

      <div className="mb-5">
        <h2 className="text-lg font-semibold text-gray-900">
          Responsibility Assignments
        </h2>

        <p className="text-sm text-gray-500">
          Obligation workload by assignee
        </p>
      </div>

      <div className="space-y-4">
        {team.map((member) => (
          <div
            key={member.name}
            className="flex items-center justify-between rounded-lg border border-gray-100 p-3 hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">

              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-white ${member.color}`}
              >
                {member.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  {member.name}
                </h3>

                <p className="text-xs text-gray-500">
                  {member.role}
                </p>
              </div>

            </div>

            <div className="text-right">

              <p className="text-sm font-semibold">
                {member.tasks} Tasks
              </p>

              <p
                className={`text-xs ${
                  member.overdue
                    ? "text-red-500"
                    : "text-green-600"
                }`}
              >
                {member.overdue}
                {member.overdue === 1
                  ? " Overdue"
                  : member.overdue === 0
                  ? " On Track"
                  : " Overdue"}
              </p>

            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default ResponsibilityCard;