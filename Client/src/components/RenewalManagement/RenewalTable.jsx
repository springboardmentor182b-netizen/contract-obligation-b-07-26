const renewals = [
  {
    id: "REN-001",
    contract: "Vendor Agreement",
    renewalDate: "15 Jul 2026",
    owner: "James Park",
    type: "Annual",
    status: "Upcoming",
  },
  {
    id: "REN-002",
    contract: "Insurance Policy",
    renewalDate: "18 Jul 2026",
    owner: "Sarah Chen",
    type: "Quarterly",
    status: "In Progress",
  },
  {
    id: "REN-003",
    contract: "NDA Agreement",
    renewalDate: "22 Jul 2026",
    owner: "Marcus Reid",
    type: "Annual",
    status: "Renewed",
  },
  {
    id: "REN-004",
    contract: "Service Contract",
    renewalDate: "28 Jul 2026",
    owner: "Dana Kim",
    type: "Monthly",
    status: "Expired",
  },
];

const getBadge = (status) => {
  const styles = {
    Upcoming: "bg-yellow-100 text-yellow-700",
    "In Progress": "bg-blue-100 text-blue-700",
    Renewed: "bg-green-100 text-green-700",
    Expired: "bg-red-100 text-red-700",
    Cancelled: "bg-gray-200 text-gray-700",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-medium ${
        styles[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
};

const RenewalTable = () => {
  return (
    <div className="mt-6 rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 px-5 py-4">
        <h2 className="text-lg font-semibold">
          Renewal History
        </h2>
      </div>

      <table className="w-full text-sm">
        <thead className="bg-gray-50 text-gray-600">
          <tr>
            <th className="px-5 py-3 text-left">ID</th>
            <th className="px-5 py-3 text-left">Contract</th>
            <th className="px-5 py-3 text-left">Renewal Date</th>
            <th className="px-5 py-3 text-left">Owner</th>
            <th className="px-5 py-3 text-left">Type</th>
            <th className="px-5 py-3 text-left">Status</th>
            <th className="px-5 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {renewals.map((item) => (
            <tr
              key={item.id}
              className="border-t border-gray-100 hover:bg-gray-50"
            >
              <td className="px-5 py-4 font-medium">{item.id}</td>
              <td className="px-5 py-4">{item.contract}</td>
              <td className="px-5 py-4">{item.renewalDate}</td>
              <td className="px-5 py-4">{item.owner}</td>
              <td className="px-5 py-4">{item.type}</td>
              <td className="px-5 py-4">{getBadge(item.status)}</td>
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

export default RenewalTable;