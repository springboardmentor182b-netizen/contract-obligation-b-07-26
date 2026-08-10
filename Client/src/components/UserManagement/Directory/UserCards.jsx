import { useState } from "react";
import {
  Mail,
  Building2,
  Shield,
  CheckCircle2,
  Edit,
  Trash2,
} from "lucide-react";

import { useUsers } from "../../../context/UsersContext";

import EditUserModal from "./EditUserModal";
import DeleteUserModal from "./DeleteUserModal";

const UserCards = () => {
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
      <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 xl:grid-cols-3">
        {paginatedUsers.map((user) => (
          <div
            key={user.id}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
          >
            {/* Avatar */}
            <div className="mb-5 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#D9B233] text-2xl font-bold text-white">
                {user.name.charAt(0).toUpperCase()}
              </div>

              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  {user.name}
                </h2>

                <p className="text-sm text-gray-500">
                  ID #{user.id}
                </p>
              </div>
            </div>

            {/* Details */}
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail size={16} />
                {user.email}
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <Building2 size={16} />
                Department:
                <span className="font-medium">
                  {user.department}
                </span>
              </div>

              <div className="flex items-center gap-2 text-gray-600">
                <Shield size={16} />
                Role:
                <span className="font-medium">
                  {user.role}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <CheckCircle2
                  size={16}
                  className="text-green-600"
                />

                <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                  {user.status}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setEditingUser(user)}
                className="rounded-lg bg-blue-50 p-2 text-blue-600 transition hover:bg-blue-100"
                title="Edit User"
              >
                <Edit size={18} />
              </button>

              <button
                onClick={() => setDeletingUser(user)}
                className="rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100"
                title="Delete User"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
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

export default UserCards;