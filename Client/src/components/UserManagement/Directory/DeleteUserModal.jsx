import { useState } from "react";
import { Trash2, X } from "lucide-react";
import toast from "react-hot-toast";

import { deleteUser } from "../../../services/userService";

const DeleteUserModal = ({
  open,
  onClose,
  user,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);

  if (!open || !user) return null;

  const handleDelete = async () => {
    try {
      setLoading(true);

      await deleteUser(user.id);

      toast.success("User deleted successfully!");

      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err.message || "Failed to delete user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl">

        {/* Header */}
        <div className="flex items-center justify-between rounded-t-2xl bg-[#D9B233] px-6 py-4">
          <div className="flex items-center gap-2">
            <Trash2 size={22} />
            <h2 className="text-xl font-bold">
              Delete User
            </h2>
          </div>

          <button
            onClick={onClose}
            disabled={loading}
            className="rounded-lg p-2 transition hover:bg-white/20 disabled:opacity-50"
          >
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-5 p-6">
          <p className="text-gray-700">
            Are you sure you want to delete
            <span className="font-semibold">
              {" "}
              {user.name}
            </span>
            ?
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              disabled={loading}
              className="rounded-xl border border-gray-300 px-5 py-2 transition hover:bg-gray-100 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              onClick={handleDelete}
              disabled={loading}
              className="rounded-xl bg-red-600 px-5 py-2 font-semibold text-white transition hover:bg-red-700 disabled:opacity-50"
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DeleteUserModal;