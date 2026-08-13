import { useState, useEffect } from "react";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/settings/danger-zone`;

const DangerZone = () => {
  const [dangerId, setDangerId] = useState(null);

  const [loading, setLoading] = useState(false);

  const [danger, setDanger] = useState({
    accountStatus: "",
    deleteRequested: false,
    deleteReason: "",
  });

  // GET DATA FROM BACKEND
  useEffect(() => {
    fetchDangerZone();
  }, []);

  const fetchDangerZone = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch Danger Zone settings");
      }

      const data = await response.json();

      if (data.length > 0) {
        const item = data[0];

        setDangerId(item.id);

        setDanger({
          accountStatus: item.accountStatus || "",
          deleteRequested: item.deleteRequested || false,
          deleteReason: item.deleteReason || "",
        });
      }
    } catch (error) {
      console.error("Error fetching Danger Zone:", error);
    } finally {
      setLoading(false);
    }
  };

  // SAVE DATA TO BACKEND
  const handleSave = async () => {
    try {
      setLoading(true);

      const url = dangerId
        ? `${API_URL}/${dangerId}`
        : API_URL;

      const method = dangerId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accountStatus: danger.accountStatus,
          deleteRequested: danger.deleteRequested,
          deleteReason: danger.deleteReason,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      const result = await response.json();

      if (!dangerId && result.id) {
        setDangerId(result.id);
      }

      alert("Danger Zone settings saved successfully.");
    } catch (error) {
      console.error("Error saving Danger Zone:", error);
      alert("Failed to save Danger Zone settings.");
    } finally {
      setLoading(false);
    }
  };

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    setDanger((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // DISABLE ORGANIZATION
  const handleDisable = () => {
    setDanger((prev) => ({
      ...prev,
      accountStatus: "Disabled",
    }));
  };

  // DELETE ORGANIZATION
  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to request organization deletion? This action cannot be undone."
    );

    if (!confirmDelete) {
      return;
    }

    setDanger((prev) => ({
      ...prev,
      accountStatus: "Delete Requested",
      deleteRequested: true,
      deleteReason: "Requested by Administrator",
    }));
  };

  return (
    <div className="space-y-8">

      {/* HEADER */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold text-[#1F2937]">
            Danger Zone
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your danger zone preferences
          </p>

        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="rounded-xl bg-[#D4AF37] px-6 py-3 font-semibold text-[#1F2937] disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>

      </div>


      {/* EXPORT ALL DATA */}

      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-semibold text-[#1F2937]">
              Export All Data
            </h2>

            <p className="mt-3 max-w-3xl text-gray-500">
              Download a full archive of all contracts, users and audit logs
              as a ZIP file. This may take several minutes.
            </p>

          </div>

          {/* Export backend endpoint is not available yet */}
          <button
            type="button"
            disabled
            className="rounded-xl bg-gray-300 px-6 py-3 font-semibold text-gray-500 cursor-not-allowed"
          >
            Export Data
          </button>

        </div>

      </div>


      {/* DISABLE ORGANIZATION */}

      <div className="rounded-2xl border border-yellow-300 bg-white p-8 shadow-sm">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-semibold text-[#1F2937]">
              Disable Organization
            </h2>

            <p className="mt-3 max-w-3xl text-gray-500">
              Temporarily disable all user access and contract operations.
              Existing data is preserved and can be restored.
            </p>

          </div>

          <button
            type="button"
            onClick={handleDisable}
            className="rounded-xl border border-yellow-500 px-6 py-3 font-semibold text-yellow-600 transition hover:bg-yellow-50"
          >
            Disable Organization
          </button>

        </div>

      </div>


      {/* ORGANIZATION STATUS */}

      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

        <div className="mb-6">

          <h2 className="text-2xl font-semibold text-[#1F2937]">
            Organization Status
          </h2>

          <p className="mt-2 text-gray-500">
            View and update the current organization status.
          </p>

        </div>

        <div className="space-y-6">

          {/* ACCOUNT STATUS */}

          <div>

            <label className="mb-2 block font-medium">
              Account Status
            </label>

            <select
              name="accountStatus"
              value={danger.accountStatus}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#D4AF37]"
            >
              <option value="">
                Select Account Status
              </option>

              <option value="Active">
                Active
              </option>

              <option value="Disabled">
                Disabled
              </option>

              <option value="Delete Requested">
                Delete Requested
              </option>
            </select>

          </div>


          {/* DELETE REASON */}

          <div>

            <label className="mb-2 block font-medium">
              Delete Reason
            </label>

            <textarea
              rows={4}
              name="deleteReason"
              value={danger.deleteReason}
              onChange={handleChange}
              placeholder="Reason for deletion..."
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#D4AF37]"
            />

          </div>


          {/* DELETE REQUEST STATUS */}

          <div className="rounded-xl bg-gray-50 p-4">

            <p className="font-medium text-[#1F2937]">
              Delete Request Status
            </p>

            <p
              className={`mt-2 font-semibold ${
                danger.deleteRequested
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {danger.deleteRequested
                ? "Delete Request Submitted"
                : "No Delete Request"}
            </p>

          </div>

        </div>

      </div>


      {/* DELETE ORGANIZATION */}

      <div className="rounded-2xl border border-red-300 bg-white p-8 shadow-sm">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-semibold text-red-600">
              Delete Organization
            </h2>

            <p className="mt-3 max-w-3xl text-gray-500">
              Permanently delete the organization and all associated data.
              This action is irreversible. All contracts and users will be
              removed.
            </p>

            {danger.deleteRequested && (
              <p className="mt-4 font-semibold text-red-600">
                Delete request has been submitted.
              </p>
            )}

          </div>

          <button
            type="button"
            onClick={handleDelete}
            className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
          >
            Delete Organization
          </button>

        </div>

      </div>

    </div>
  );
};

export default DangerZone;