import { useRoles } from "../../../context/RolesContext";

const RolesPage = () => {
  const {
    paginatedRoles,
    search,
    setSearch,
    currentPage,
    setCurrentPage,
    totalPages,
  } = useRoles();

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="flex justify-between">
        <input
          type="text"
          placeholder="Search roles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-80 rounded-xl border border-gray-300 px-4 py-2 outline-none focus:border-yellow-500"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-5 py-3 text-left">Role Name</th>
              <th className="px-5 py-3 text-left">Description</th>
            </tr>
          </thead>

          <tbody>
            {paginatedRoles.length === 0 ? (
              <tr>
                <td
                  colSpan={2}
                  className="py-8 text-center text-gray-500"
                >
                  No roles found.
                </td>
              </tr>
            ) : (
              paginatedRoles.map((role) => (
                <tr
                  key={role.id}
                  className="border-t hover:bg-gray-50"
                >
                  <td className="px-5 py-4 font-semibold">
                    {role.name}
                  </td>

                  <td className="px-5 py-4">
                    {role.description}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex gap-3">
        <button
          onClick={() =>
            setCurrentPage((p) => Math.max(1, p - 1))
          }
          disabled={currentPage === 1}
          className="rounded-lg bg-yellow-500 px-5 py-2 text-white disabled:opacity-50"
        >
          Previous
        </button>

        <div className="flex items-center px-5">
          Page {currentPage} of {Math.max(totalPages, 1)}
        </div>

        <button
          onClick={() =>
            setCurrentPage((p) =>
              Math.min(totalPages, p + 1)
            )
          }
          disabled={currentPage === totalPages}
          className="rounded-lg bg-yellow-500 px-5 py-2 text-white disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default RolesPage;