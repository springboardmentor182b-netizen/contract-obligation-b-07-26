import { useEffect, useState } from "react";
import { X, Pencil } from "lucide-react";
import toast from "react-hot-toast";

import { updateUser } from "../../../services/userService";

const EditUserModal = ({
  open,
  onClose,
  user,
  onSuccess,
}) => {
  const [form, setForm] = useState({
    username: "",
    email: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setForm({
        username: user.name,
        email: user.email,
      });
    }
  }, [user]);

  if (!open || !user) return null;

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await updateUser(user.id, {
        username: form.username,
        email: form.email,
      });

      toast.success("User updated successfully!");

      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err.message || "Failed to update user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">

        <div className="flex items-center justify-between rounded-t-2xl bg-[#D9B233] px-6 py-4">
          <div className="flex items-center gap-2">
            <Pencil size={22} />
            <h2 className="text-xl font-bold">
              Edit User
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

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Username
            </label>

            <input
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              disabled={loading}
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#D9B233] disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              disabled={loading}
              required
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#D9B233] disabled:bg-gray-100"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-xl border border-gray-300 px-6 py-3 font-medium transition hover:bg-gray-100 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-[#D9B233] px-6 py-3 font-semibold text-black transition hover:brightness-105 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default EditUserModal;