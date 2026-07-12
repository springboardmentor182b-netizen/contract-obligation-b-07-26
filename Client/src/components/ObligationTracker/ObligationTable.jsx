const obligations = [
  {
    id: "OBL-001",
    obligation: "Submit Monthly Compliance Report",
    contract: "Vendor Agreement",
    owner: "James Park",
    dueDate: "15 Jul 2026",
    priority: "High",
    status: "Pending",
  },
  {
    id: "OBL-002",
    obligation: "Review Insurance Certificate",
    contract: "Insurance Policy",
    owner: "Sarah Chen",
    dueDate: "18 Jul 2026",
    priority: "Medium",
    status: "In Progress",
  },
  {
    id: "OBL-003",
    obligation: "Renew NDA Agreement",
    contract: "NDA",
    owner: "Marcus Reid",
    dueDate: "22 Jul 2026",
    priority: "High",
    status: "Completed",
  },
  {
    id: "OBL-004",
    obligation: "Update Vendor Documents",
    contract: "Service Contract",
    owner: "Dana Kim",
    dueDate: "28 Jul 2026",
    priority: "Low",
    status: "Pending",
  },
];

const getBadge = (value, type) => {
  const styles = {
    priority: {
      High: "bg-red-100 text-red-700",
      Medium: "bg-yellow-100 text-yellow-700",
      Low: "bg-green-100 text-green-700",
    },
    status: {
      Pending: "bg-orange-100 text-orange-700",
      "In Progress": "bg-blue-100 text-blue-700",
      Completed: "bg-green-100 text-green-700",
    },
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${styles[type][value]}`}
    >
      {value}
    </span>
  );
};

const ObligationTable = () => {
  return (
    <div className="mt-6 rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 px-5 py-4">
        <h2 className="text-lg font-semibold">
          Obligations
        </h2>
      </div>

      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="px-5 py-3 text-left">ID</th>
            <th className="px-5 py-3 text-left">Obligation</th>
            <th className="px-5 py-3 text-left">Contract</th>
            <th className="px-5 py-3 text-left">Owner</th>
            <th className="px-5 py-3 text-left">Due Date</th>
            <th className="px-5 py-3 text-left">Priority</th>
            <th className="px-5 py-3 text-left">Status</th>
            <th className="px-5 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {obligations.map((item) => (
            <tr
              key={item.id}
              className="border-t border-gray-100 hover:bg-gray-50"
            >
              <td className="px-5 py-4 font-medium">{item.id}</td>
              <td className="px-5 py-4">{item.obligation}</td>
              <td className="px-5 py-4">{item.contract}</td>
              <td className="px-5 py-4">{item.owner}</td>
              <td className="px-5 py-4">{item.dueDate}</td>
              <td className="px-5 py-4">
                {getBadge(item.priority, "priority")}
              </td>
              <td className="px-5 py-4">
                {getBadge(item.status, "status")}
              </td>
              <td className="px-5 py-4 text-center">
                <button className="rounded-lg border px-3 py-1 text-xs hover:bg-gray-100">
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ObligationTable;