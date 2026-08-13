import { useState, useEffect } from "react";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/settings/contract-defaults`;

const ContractDefaultsSection = () => {
  const [defaultId, setDefaultId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [defaults, setDefaults] = useState({
    category: "",
    status: "",
    law: "",
    numbering: "",
    renewal: "",

    reminder90: false,
    reminder60: false,
    reminder30: false,
    reminder14: false,

    autoArchive: false,

    workflow: [],
  });

  useEffect(() => {
    fetchDefaults();
  }, []);

  // GET DATA FROM DATABASE
  const fetchDefaults = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch Contract Defaults");
      }

      const data = await response.json();

      if (data.length > 0) {
        const item = data[0];

        setDefaultId(item.id);

        setDefaults({
          category: item.category ?? "",
          status: item.status ?? "",
          law: item.law ?? "",
          numbering: item.numbering ?? "",
          renewal: item.renewal ?? "",

          reminder90: item.reminder90 ?? false,
          reminder60: item.reminder60 ?? false,
          reminder30: item.reminder30 ?? false,
          reminder14: item.reminder14 ?? false,

          autoArchive: item.autoArchive ?? false,

          workflow: Array.isArray(item.workflow)
            ? item.workflow
            : [],
        });
      }
    } catch (error) {
      console.error("Error fetching Contract Defaults:", error);
    } finally {
      setLoading(false);
    }
  };

  // SAVE DATA TO DATABASE
  const handleSave = async () => {
    try {
      setLoading(true);

      const url = defaultId
        ? `${API_URL}/${defaultId}`
        : API_URL;

      const method = defaultId ? "PUT" : "POST";

      const body = {
        category: defaults.category,
        status: defaults.status,
        law: defaults.law,
        numbering: defaults.numbering,
        renewal: defaults.renewal,

        reminder90: defaults.reminder90,
        reminder60: defaults.reminder60,
        reminder30: defaults.reminder30,
        reminder14: defaults.reminder14,

        autoArchive: defaults.autoArchive,

        workflow: defaults.workflow,
      };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(errorText);
        throw new Error("Failed to save Contract Defaults");
      }

      const result = await response.json();

      // If this was a new record
      if (!defaultId && result.id) {
        setDefaultId(result.id);
      }

      alert("Contract Defaults saved successfully!");

      // Reload data from database
      await fetchDefaults();

    } catch (error) {
      console.error("Error saving Contract Defaults:", error);
      alert("Failed to save Contract Defaults.");
    } finally {
      setLoading(false);
    }
  };

  // HANDLE INPUT / SELECT CHANGES
  const handleChange = (e) => {
    const { name, value } = e.target;

    setDefaults((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // HANDLE TOGGLE
  const toggle = (key) => {
    setDefaults((previous) => ({
      ...previous,
      [key]: !previous[key],
    }));
  };

  // ADD WORKFLOW STEP
  const addStep = () => {
    const step = prompt("Enter workflow step");

    if (step && step.trim() !== "") {
      setDefaults((previous) => ({
        ...previous,
        workflow: [...previous.workflow, step.trim()],
      }));
    }
  };

  const Toggle = ({ value, onClick }) => (
    <button
      type="button"
      onClick={onClick}
      className={`relative h-7 w-14 rounded-full transition ${
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

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Contract Defaults
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your contract default settings
          </p>

        </div>

        <button
          onClick={handleSave}
          disabled={loading}
          className="rounded-xl bg-[#D4AF37] px-6 py-3 font-semibold disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>

      </div>


      {/* Default Contract Settings */}

      <div className="rounded-2xl border bg-white shadow">

        <div className="border-b p-6">

          <h2 className="text-2xl font-semibold">
            Default Contract Settings
          </h2>

          <p className="mt-1 text-gray-500">
            Configure the default values used when creating contracts.
          </p>

        </div>

        <div className="grid grid-cols-2 gap-6 p-6">

          {/* Default Category */}

          <div>

            <label className="mb-2 block font-medium">
              Default Category
            </label>

            <select
              name="category"
              value={defaults.category}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            >
              <option value="">
                Select category
              </option>

              <option value="Vendor">
                Vendor
              </option>

              <option value="Customer">
                Customer
              </option>

              <option value="Employment">
                Employment
              </option>

              <option value="Procurement">
                Procurement
              </option>

              <option value="NDA">
                NDA
              </option>
            </select>

          </div>


          {/* Default Status */}

          <div>

            <label className="mb-2 block font-medium">
              Default Status
            </label>

            <select
              name="status"
              value={defaults.status}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            >
              <option value="">
                Select status
              </option>

              <option value="Draft">
                Draft
              </option>

              <option value="Under Review">
                Under Review
              </option>

              <option value="Pending Approval">
                Pending Approval
              </option>
            </select>

          </div>


          {/* Governing Law */}

          <div>

            <label className="mb-2 block font-medium">
              Governing Law
            </label>

            <input
              type="text"
              name="law"
              value={defaults.law}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            />

          </div>


          {/* Numbering Format */}

          <div>

            <label className="mb-2 block font-medium">
              Numbering Format
            </label>

            <input
              type="text"
              name="numbering"
              value={defaults.numbering}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            />

          </div>


          {/* Renewal Cycle */}

          <div>

            <label className="mb-2 block font-medium">
              Renewal Cycle
            </label>

            <select
              name="renewal"
              value={defaults.renewal}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3"
            >
              <option value="">
                Select renewal cycle
              </option>

              <option value="6 Months">
                6 Months
              </option>

              <option value="1 Year">
                1 Year
              </option>

              <option value="2 Years">
                2 Years
              </option>

              <option value="3 Years">
                3 Years
              </option>
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

        </div>

        <div className="space-y-4 p-6">

          {[
            ["90-day Reminder", "reminder90"],
            ["60-day Reminder", "reminder60"],
            ["30-day Reminder", "reminder30"],
            ["14-day Reminder", "reminder14"],
            ["Auto Archive", "autoArchive"],
          ].map(([title, key]) => (

            <div
              key={key}
              className="flex items-center justify-between rounded-xl border border-gray-200 p-5"
            >

              <h3 className="font-semibold">
                {title}
              </h3>

              <Toggle
                value={defaults[key]}
                onClick={() => toggle(key)}
              />

            </div>

          ))}

        </div>

      </div>


      {/* Approval Workflow Defaults */}

      <div className="rounded-2xl border bg-white shadow">

        <div className="border-b p-6">

          <h2 className="text-2xl font-semibold">
            Approval Workflow Defaults
          </h2>

          <p className="mt-1 text-gray-500">
            Default approval workflow for newly created contracts.
          </p>

        </div>

        <div className="space-y-4 p-6">

          {defaults.workflow.map((step, index) => (

            <div
              key={`${step}-${index}`}
              className="flex items-center gap-5 rounded-xl border border-gray-200 p-5"
            >

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D4AF37] text-white font-bold">
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
            type="button"
            onClick={addStep}
            className="w-full rounded-xl border-2 border-dashed border-[#D4AF37] py-4 font-semibold text-[#D4AF37] hover:bg-[#FFF8E1]"
          >
            + Add Workflow Step
          </button>

        </div>

      </div>

    </div>
  );
};

export default ContractDefaultsSection;