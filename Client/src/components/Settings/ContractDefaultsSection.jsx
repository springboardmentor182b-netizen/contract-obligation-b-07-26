import { useState } from "react";

const ContractDefaultsSection = () => {

  const [defaults, setDefaults] = useState({
    category: "Vendor",
    status: "Draft",
    law: "New York Law",
    numbering: "CTR-YYYY-###",
    renewal: "1 Year",

    reminder90: true,
    reminder60: true,
    reminder30: true,
    reminder14: true,
    autoArchive: false,

    workflow: [
      "Contract Owner Review",
      "Legal Counsel Sign-off",
      "Department Head Approval",
      "CCO Final Approval",
    ],
  });

  const handleChange = (e) => {
    setDefaults({
      ...defaults,
      [e.target.name]: e.target.value,
    });
  };

  const toggle = (key) => {
    setDefaults({
      ...defaults,
      [key]: !defaults[key],
    });
  };

  const addStep = () => {
    const step = prompt("Enter workflow step");

    if (step) {
      setDefaults({
        ...defaults,
        workflow: [...defaults.workflow, step],
      });
    }
  };

  const Toggle = ({ value, onClick }) => (
    <button
      onClick={onClick}
      className={`relative h-7 w-14 rounded-full ${
        value ? "bg-[#D4AF37]" : "bg-gray-300"
      }`}
    >
      <span
        className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
          value ? "left-8" : "left-1"
        }`}
      />
    </button>
  );

  return (

    <div className="space-y-8">

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Contract Defaults
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your contract defaults preferences
          </p>

        </div>

        <button className="rounded-xl bg-[#D4AF37] px-6 py-3 font-semibold">
          Save Changes
        </button>

      </div>

      {/* Default Contract Settings */}

      <div className="rounded-2xl border bg-white shadow">

        <div className="border-b p-6">

          <h2 className="text-2xl font-semibold">
            Default Contract Settings
          </h2>

          <p className="mt-1 text-gray-500">
            Pre-fill defaults used when creating new contracts.
          </p>

        </div>

        <div className="grid grid-cols-2 gap-6 p-6">          {/* Default Category */}

          <div>

            <label className="mb-2 block font-medium">
              Default Category
            </label>

            <p className="mb-3 text-sm text-gray-500">
              Pre-selected category for new contracts
            </p>

            <select
              name="category"
              value={defaults.category}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#D4AF37]"
            >
              <option>Vendor</option>
              <option>Customer</option>
              <option>Employment</option>
              <option>Procurement</option>
              <option>NDA</option>
            </select>

          </div>

          {/* Default Status */}

          <div>

            <label className="mb-2 block font-medium">
              Default Status
            </label>

            <p className="mb-3 text-sm text-gray-500">
              Starting status when a contract is created
            </p>

            <select
              name="status"
              value={defaults.status}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#D4AF37]"
            >
              <option>Draft</option>
              <option>Under Review</option>
              <option>Pending Approval</option>
            </select>

          </div>

          {/* Default Governing Law */}

          <div>

            <label className="mb-2 block font-medium">
              Default Governing Law
            </label>

            <p className="mb-3 text-sm text-gray-500">
              Jurisdiction applied to new contracts
            </p>

            <select
              name="law"
              value={defaults.law}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#D4AF37]"
            >
              <option>New York Law</option>
              <option>California Law</option>
              <option>Texas Law</option>
              <option>English Law</option>
            </select>

          </div>

          {/* Auto-numbering Format */}

          <div>

            <label className="mb-2 block font-medium">
              Auto-numbering Format
            </label>

            <p className="mb-3 text-sm text-gray-500">
              Pattern for Contract ID generation
            </p>

            <input
              type="text"
              name="numbering"
              value={defaults.numbering}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#D4AF37]"
            />

          </div>

          {/* Default Renewal Cycle */}

          <div>

            <label className="mb-2 block font-medium">
              Default Renewal Cycle
            </label>

            <p className="mb-3 text-sm text-gray-500">
              Renewal period applied to new contracts
            </p>

            <select
              name="renewal"
              value={defaults.renewal}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#D4AF37]"
            >
              <option>6 Months</option>
              <option>1 Year</option>
              <option>2 Years</option>
              <option>3 Years</option>
            </select>

          </div>

        </div>

      </div>

      {/* Renewal & Reminder Defaults */}

      <div className="rounded-2xl border bg-white shadow">

        <div className="border-b p-6">

          <h2 className="text-2xl font-semibold">
            Renewal & Reminder Defaults
          </h2>

          <p className="mt-1 text-gray-500">
            Default reminder schedule applied to all contracts.
          </p>

        </div>

        <div className="space-y-4 p-6">          {/* 90-day Reminder */}

          <div className="flex items-center justify-between rounded-xl border border-gray-200 p-5">

            <div>

              <h3 className="font-semibold">
                90-day reminder
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Send alert 90 days before any contract expires
              </p>

            </div>

            <Toggle
              value={defaults.reminder90}
              onClick={() => toggle("reminder90")}
            />

          </div>

          {/* 60-day Reminder */}

          <div className="flex items-center justify-between rounded-xl border border-gray-200 p-5">

            <div>

              <h3 className="font-semibold">
                60-day reminder
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Send alert 60 days before any contract expires
              </p>

            </div>

            <Toggle
              value={defaults.reminder60}
              onClick={() => toggle("reminder60")}
            />

          </div>

          {/* 30-day Reminder */}

          <div className="flex items-center justify-between rounded-xl border border-gray-200 p-5">

            <div>

              <h3 className="font-semibold">
                30-day reminder
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Send alert 30 days before any contract expires
              </p>

            </div>

            <Toggle
              value={defaults.reminder30}
              onClick={() => toggle("reminder30")}
            />

          </div>

          {/* 14-day Reminder */}

          <div className="flex items-center justify-between rounded-xl border border-gray-200 p-5">

            <div>

              <h3 className="font-semibold">
                14-day reminder
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Final escalation 14 days before expiry
              </p>

            </div>

            <Toggle
              value={defaults.reminder14}
              onClick={() => toggle("reminder14")}
            />

          </div>

          {/* Auto Archive */}

          <div className="flex items-center justify-between rounded-xl border border-gray-200 p-5">

            <div>

              <h3 className="font-semibold">
                Auto-archive expired
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Automatically archive contracts after expiry
              </p>

            </div>

            <Toggle
              value={defaults.autoArchive}
              onClick={() => toggle("autoArchive")}
            />

          </div>

        </div>

      </div>

      {/* Approval Workflow Defaults */}

      <div className="rounded-2xl border bg-white shadow">

        <div className="border-b p-6">

          <h2 className="text-2xl font-semibold">
            Approval Workflow Defaults
          </h2>

          <p className="mt-1 text-gray-500">
            Default approval pipeline applied to new contracts.
          </p>

        </div>

        <div className="space-y-4 p-6">          {defaults.workflow.map((step, index) => (

            <div
              key={index}
              className="flex items-center gap-5 rounded-xl border border-gray-200 p-5"
            >

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D4AF37] font-bold text-white">
                {index + 1}
              </div>

              <div className="flex-1">

                <h3 className="font-semibold text-[#1F2937]">
                  {step}
                </h3>

              </div>

            </div>

          ))}

          <button
            onClick={addStep}
            className="w-full rounded-xl border-2 border-dashed border-[#D4AF37] py-4 font-semibold text-[#D4AF37] transition hover:bg-[#FFF8E1]"
          >
            + Add Step
          </button>

        </div>

      </div>

    </div>
  );
};

export default ContractDefaultsSection;