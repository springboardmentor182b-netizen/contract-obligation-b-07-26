import { useState } from "react";
import { X } from "lucide-react";

const AddRenewalModal = ({ onClose, refresh }) => {
  const [formData, setFormData] = useState({
    contract_id: "",
    renewal_date: "",
    reminder_date: "",
    renewal_status: "Pending",
    approved_by: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.contract_id ||
      !formData.renewal_date ||
      !formData.reminder_date
    ) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/renewals/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contract_id: Number(formData.contract_id),
          renewal_date: formData.renewal_date,
          reminder_date: formData.reminder_date,
          renewal_status: formData.renewal_status,
          approved_by: formData.approved_by
            ? Number(formData.approved_by)
            : null,
          notes: formData.notes,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add renewal");
      }

      if (refresh) {
        await refresh();
      }

      onClose();
    } catch (err) {
      console.error(err);
      alert("Unable to add renewal.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-xl rounded-2xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div>
            <h2 className="text-xl font-bold text-gray-800">
              Add Renewal
            </h2>

            <p className="text-sm text-gray-500">
              Create a new contract renewal record
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Contract ID *
              </label>

              <input
                type="number"
                name="contract_id"
                value={formData.contract_id}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Approved By
              </label>

              <input
                type="number"
                name="approved_by"
                value={formData.approved_by}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Renewal Date *
              </label>

              <input
                type="date"
                name="renewal_date"
                value={formData.renewal_date}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">
                Reminder Date *
              </label>

              <input
                type="date"
                name="reminder_date"
                value={formData.reminder_date}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Status
            </label>

            <select
              name="renewal_status"
              value={formData.renewal_status}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
            >
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
              <option>Completed</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Notes
            </label>

            <textarea
              rows={3}
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-lg border px-5 py-2 text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-yellow-500 px-6 py-2 font-semibold text-white hover:bg-yellow-600 disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Renewal"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRenewalModal;