import { useState, useEffect } from "react";

const ContractDefaultsSection = () => {
  const [defaultId, setDefaultId] = useState(null);
  const [loading, setLoading] = useState(false);

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

  useEffect(() => {
    fetchDefaults();
  }, []);

  const fetchDefaults = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://127.0.0.1:8000/settings/contract-defaults"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch Contract Defaults");
      }

      const data = await response.json();

      if (data.length > 0) {
        const item = data[0];

        setDefaultId(item.id);

        setDefaults({
          category: item.category,
          status: item.status,
          law: item.law,
          numbering: item.numbering,
          renewal: item.renewal,

          reminder90: item.reminder90,
          reminder60: item.reminder60,
          reminder30: item.reminder30,
          reminder14: item.reminder14,

          autoArchive: item.autoArchive,

          workflow: item.workflow || [],
        });
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleSave = async () => {
  try {
    setLoading(true);

    const url = defaultId
      ? `http://127.0.0.1:8000/settings/contract-defaults/${defaultId}`
      : "http://127.0.0.1:8000/settings/contract-defaults";

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
      const error = await response.text();
      console.log(error);
      throw new Error(error);
    }

    const result = await response.json();

    if (!defaultId) {
      setDefaultId(result.id);
    }

    alert("Contract Defaults saved successfully!");
  } catch (error) {
    console.error(error);
    alert("Failed to save Contract Defaults.");
  } finally {
    setLoading(false);
  }
};

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

  if (step && step.trim() !== "") {
    setDefaults({
      ...defaults,
      workflow: [...defaults.workflow, step],
    });
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
            <option>Vendor</option>
            <option>Customer</option>
            <option>Employment</option>
            <option>Procurement</option>
            <option>NDA</option>
          </select>

        </div>

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
            <option>Draft</option>
            <option>Under Review</option>
            <option>Pending Approval</option>
          </select>

        </div>

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

      </div>

      <div className="space-y-4 p-6">

        {[
          ["90-day Reminder","reminder90"],
          ["60-day Reminder","reminder60"],
          ["30-day Reminder","reminder30"],
          ["14-day Reminder","reminder14"],
          ["Auto Archive","autoArchive"],
        ].map(([title,key])=>(
          <div
            key={key}
            className="flex items-center justify-between rounded-xl border border-gray-200 p-5"
          >

            <h3 className="font-semibold">
              {title}
            </h3>

            <Toggle
              value={defaults[key]}
              onClick={()=>toggle(key)}
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
            key={index}
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