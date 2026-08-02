import { Trash2, Pencil } from "lucide-react";

const getBadge = (status) => {
  const styles = {
    Pending: "bg-yellow-100 text-yellow-700",
    Approved: "bg-green-100 text-green-700",
    Rejected: "bg-red-100 text-red-700",
    Completed: "bg-green-100 text-green-700",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        styles[status] || "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
};

const formatDate = (date) => {
  if (!date) return "-";
  return new Date(date).toLocaleDateString();
};

const RenewalTable = ({
  renewals = [],
  loading = false,
  refresh,
}) => {
  const deleteRenewal = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this renewal?"
    );

    if (!confirmDelete) return;

    try {
      const response = await fetch(`/renewals/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      if (refresh) {
        await refresh();
      }
    } catch (error) {
      console.error(error);
      alert("Unable to delete renewal.");
    }
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center shadow-sm">
        Loading renewals...
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 px-6 py-5">
        <h2 className="text-xl font-semibold text-gray-800">
          Renewal History
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr className="text-left text-gray-600">
              <th className="px-6 py-4 font-semibold">ID</th>
              <th className="px-6 py-4 font-semibold">Contract ID</th>
              <th className="px-6 py-4 font-semibold">Renewal Date</th>
              <th className="px-6 py-4 font-semibold">Reminder Date</th>
              <th className="px-6 py-4 font-semibold">Status</th>
              <th className="px-6 py-4 font-semibold">Approved By</th>
              <th className="px-6 py-4 font-semibold">Notes</th>
              <th className="px-6 py-4 text-center font-semibold">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {renewals.length > 0 ? (
              renewals.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-gray-100 transition hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {item.id}
                  </td>

                  <td className="px-6 py-4">
                    {item.contract_id}
                  </td>

                  <td className="px-6 py-4">
                    {formatDate(item.renewal_date)}
                  </td>

                  <td className="px-6 py-4">
                    {formatDate(item.reminder_date)}
                  </td>

                  <td className="px-6 py-4">
                    {getBadge(item.renewal_status)}
                  </td>

                  <td className="px-6 py-4">
                    {item.approved_by || "-"}
                  </td>

                  <td className="max-w-xs px-6 py-4 truncate">
                    {item.notes || "-"}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-4">
                      <button
                        className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50 hover:text-blue-700"
                        title="Edit"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        onClick={() => deleteRenewal(item.id)}
                        className="rounded-lg p-2 text-red-600 transition hover:bg-red-50 hover:text-red-700"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={8}
                  className="px-6 py-10 text-center text-gray-500"
                >
                  No renewals found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RenewalTable;