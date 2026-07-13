import { FaEdit, FaTrash, FaEye } from "react-icons/fa";

const users = [
  {
    id: 1,
    name: "John Smith",
    email: "john@company.com",
    role: "Admin",
    department: "Legal",
    status: "Active",
    lastLogin: "2 mins ago",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@company.com",
    role: "Manager",
    department: "Compliance",
    status: "Active",
    lastLogin: "10 mins ago",
  },
  {
    id: 3,
    name: "David Miller",
    email: "david@company.com",
    role: "Viewer",
    department: "Finance",
    status: "Inactive",
    lastLogin: "Yesterday",
  },
  {
    id: 4,
    name: "Emily Brown",
    email: "emily@company.com",
    role: "Editor",
    department: "Contracts",
    status: "Active",
    lastLogin: "1 hour ago",
  },
];

const UserTable = () => {
  return (
    <div className="mt-8 rounded-2xl bg-white shadow border border-gray-200 overflow-hidden">
      <div className="p-6 border-b">
        <h2 className="text-xl font-semibold">System Users</h2>
        <p className="text-sm text-gray-500">
          Manage registered users and permissions
        </p>
      </div>

      <table className="w-full">
        <thead className="bg-gray-100">
          <tr className="text-left text-gray-600 text-sm">
            <th className="px-6 py-4">User</th>
            <th className="px-6 py-4">Role</th>
            <th className="px-6 py-4">Department</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Last Login</th>
            <th className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-t hover:bg-gray-50 transition"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <img
                    src={`https://i.pravatar.cc/150?img=${user.id + 10}`}
                    alt=""
                    className="w-11 h-11 rounded-full"
                  />

                  <div>
                    <h4 className="font-semibold">{user.name}</h4>
                    <p className="text-sm text-gray-500">
                      {user.email}
                    </p>
                  </div>
                </div>
              </td>

              <td className="px-6">{user.role}</td>

              <td className="px-6">{user.department}</td>

              <td className="px-6">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold
                  ${
                    user.status === "Active"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {user.status}
                </span>
              </td>

              <td className="px-6">{user.lastLogin}</td>

              <td className="px-6">
                <div className="flex justify-center gap-4">
                  <FaEye className="cursor-pointer text-blue-500 hover:scale-110" />
                  <FaEdit className="cursor-pointer text-green-500 hover:scale-110" />
                  <FaTrash className="cursor-pointer text-red-500 hover:scale-110" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;