import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";

import { useUsers } from "../../../context/UsersContext";

import EditUserModal from "./EditUserModal";
import DeleteUserModal from "./DeleteUserModal";

const UserTable = () => {
  const { paginatedUsers } = useUsers();

  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);

  const refreshPage = () => {
    window.location.reload();
  };

  if (paginatedUsers.length === 0) {
    return (
      <div className="py-16 text-center text-gray-500">
        No users found.
      </div>
    );
  }

  return (
    <>
      <div className="overflow-x-auto rounded-xl border border-gray-200">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr className="text-left text-sm font-semibold text-gray-700">
              <th className="px-5 py-4">User</th>
              <th className="px-5 py-4">Email</th>
              <th className="px-5 py-4">Department</th>
              <th className="px-5 py-4">Role</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {paginatedUsers.map((user) => (
              <tr
                key={user.id}
                className="border-t transition hover:bg-gray-50"
              >
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500 font-bold text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </div>

                    <div>
                      <p className="font-semibold text-gray-900">
                        {user.name}
                      </p>

                      <p className="text-xs text-gray-500">
                        ID #{user.id}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4 text-gray-700">
                  {user.email}
                </td>

                <td className="px-5 py-4">
                  <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
                    {user.department}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-700">
                    {user.role}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                    {user.status}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => setEditingUser(user)}
                      className="rounded-lg p-2 text-blue-600 hover:bg-blue-100"
                      title="Edit User"
                    >
                      <Edit size={18} />
                    </button>

                    <button
                      onClick={() => setDeletingUser(user)}
                      className="rounded-lg p-2 text-red-600 hover:bg-red-100"
                      title="Delete User"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <EditUserModal
        open={editingUser !== null}
        user={editingUser}
        onClose={() => setEditingUser(null)}
        onSuccess={refreshPage}
      />

      <DeleteUserModal
        open={deletingUser !== null}
        user={deletingUser}
        onClose={() => setDeletingUser(null)}
        onSuccess={refreshPage}
      />
    </>
  );
};

export default UserTable;