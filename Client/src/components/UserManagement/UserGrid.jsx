import { MoreVertical } from "lucide-react";
import { useUsers } from "../../context/UsersContext";

const statusStyles = {
  Active: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Inactive: "bg-gray-100 text-gray-700",
  Suspended: "bg-red-100 text-red-700",
};

const UserGrid = () => {
  const {
    filteredUsers,
    selectedUser,
    setSelectedUser,
  } = useUsers();

  if (paginatedUsers.length === 0) {
    return (
      <div className="rounded-2xl border border-[#ECE7DE] bg-white py-16 text-center shadow-sm">
        <h3 className="text-lg font-semibold text-gray-700">
          No Users Found
        </h3>

        <p className="mt-2 text-gray-500">
          Try changing your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-5">

      {filteredUsers.map((user) => (

        <div
          key={user.id}
          onClick={() => setSelectedUser(user)}
          className={`cursor-pointer rounded-2xl border p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${
            selectedUser?.id === user.id
              ? "border-[#D4AF37] shadow-lg"
              : "border-[#ECE7DE] bg-white"
          }`}
        >

          <div className="flex items-start justify-between">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#D4AF37] text-lg font-bold text-[#1F2937]">

                {user.initials}

              </div>

              <div>

                <h3 className="font-semibold text-[#1F2937]">
                  {user.name}
                </h3>

                <p className="text-sm text-gray-500">
                  {user.email}
                </p>

              </div>

            </div>

            <MoreVertical
              size={18}
              className="text-gray-400"
            />

          </div>

          <div className="mt-6 space-y-3 text-sm">

            <div className="flex justify-between">

              <span className="text-gray-500">
                Department
              </span>

              <span className="font-medium">
                {user.department}
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-gray-500">
                Role
              </span>

              <span className="font-medium">
                {user.role}
              </span>

            </div>

            <div className="flex justify-between">

              <span className="text-gray-500">
                Contracts
              </span>

              <span className="font-semibold">
                {user.contracts}
              </span>

            </div>

          </div>

          <div className="mt-6 flex items-center justify-between">

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[user.status]}`}
            >
              {user.status}
            </span>

          </div>

        </div>

      ))}

    </div>
  );
};

export default UserGrid;