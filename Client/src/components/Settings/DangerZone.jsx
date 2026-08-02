const DangerZone = () => {

  const handleExport = () => {
    alert("Export started! (Frontend only)");
  };

  const handleDisable = () => {
    alert("Organization disabled! (Frontend only)");
  };

  const handleDelete = () => {
    const confirmDelete = window.confirm(
      "Are you sure? This action cannot be undone."
    );

    if (confirmDelete) {
      alert("Organization deleted! (Frontend only)");
    }
  };

  return (

    <div className="space-y-8">

      {/* Header */}

      <div>

        <h1 className="text-3xl font-bold text-[#1F2937]">
          Danger Zone
        </h1>

        <p className="mt-2 text-gray-500">
          Manage your danger zone preferences
        </p>

      </div>      {/* Export All Data */}

      <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-semibold text-[#1F2937]">
              Export All Data
            </h2>

            <p className="mt-3 max-w-3xl text-gray-500">
              Download a full archive of all contracts, users, and audit logs
              as a ZIP file. This may take several minutes.
            </p>

          </div>

          <button
            onClick={handleExport}
            className="rounded-xl bg-[#D4AF37] px-6 py-3 font-semibold text-[#1F2937] transition hover:opacity-90"
          >
            Export Data
          </button>

        </div>

      </div>      {/* Disable Organization */}

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
            onClick={handleDisable}
            className="rounded-xl border border-yellow-500 px-6 py-3 font-semibold text-yellow-600 transition hover:bg-yellow-50"
          >
            Disable Organization
          </button>

        </div>

      </div>

      {/* Delete Organization */}

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

          </div>

          <button
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