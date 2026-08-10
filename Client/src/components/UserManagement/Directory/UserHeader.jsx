import { Download, UserPlus } from "lucide-react";
import { useUsers } from "../../../context/UsersContext";

const UserHeader = ({ onAddUser }) => {
  const { users = [] } = useUsers();

  const handleExport = () => {
    if (users.length === 0) {
      alert("No users available to export.");
      return;
    }

    const headers = [
      "ID",
      "Username",
      "Email",
      "Department",
      "Role",
      "Status",
    ];

    const rows = users.map((user) => [
      user.id,
      user.name,
      user.email,
      user.department,
      user.role,
      user.status,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "users.csv";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex items-start justify-between">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          User Management
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          {users.length} users • 6 roles • Role-based access control
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={handleExport}
          className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition hover:bg-gray-50"
        >
          <Download size={16} />
          Export Users
        </button>

        <button
          onClick={onAddUser}
          className="flex items-center gap-2 rounded-xl bg-[#F5A000] px-4 py-2 text-sm font-semibold text-gray-900 shadow transition hover:brightness-105"
        >
          <UserPlus size={16} />
          Add User
        </button>
      </div>
    </div>
  );
};

export default UserHeader;