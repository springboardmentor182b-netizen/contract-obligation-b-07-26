import { useState } from "react";
import { X, UserPlus } from "lucide-react";
import { createUser } from "../../../services/userService";
import toast from "react-hot-toast";

const AddUserModal = ({ open, onClose, onSuccess }) => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const getErrorMessage = (message) => {
    if (message.includes("Email already")) {
      return "Email already exists.";
    }

    if (
      message.includes("value_error") ||
      message.includes("valid email")
    ) {
      return "Please enter a valid email address.";
    }

    return "Failed to create user.";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createUser(form);

      toast.success("User created successfully!");

      setForm({
        username: "",
        email: "",
        password: "",
      });

      onSuccess();
      onClose();
    } catch (err) {
      toast.error(getErrorMessage(err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl">

        <div className="flex items-center justify-between rounded-t-2xl bg-[#D9B233] px-6 py-4">
          <div className="flex items-center gap-2">
            <UserPlus size={22} />
            <h2 className="text-xl font-bold">
              Add New User
            </h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-white/20"
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
              required
              placeholder="Enter username"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#D9B233]"
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
              required
              placeholder="Enter email"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#D9B233]"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              placeholder="Enter password"
              className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-[#D9B233]"
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
              {loading ? "Creating..." : "Create User"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default AddUserModal;