import { useState, useEffect } from "react";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/settings/compliance`;

const ComplianceSection = () => {
  const [complianceId, setComplianceId] = useState(null);

  const [settings, setSettings] = useState({
    critical: "",
    warning: "",
    calculation: "",
    frequency: "",
    gdpr: false,
    sox: false,
    iso: false,
    hipaa: false,
    pci: false,
    ccpa: false,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCompliance();
  }, []);

  // GET DATA FROM DATABASE
  const fetchCompliance = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch compliance settings");
      }

      const data = await response.json();

      if (data.length > 0) {
        const item = data[0];

        setComplianceId(item.id);

        setSettings({
          critical: item.critical ?? "",
          warning: item.warning ?? "",
          calculation: item.calculation ?? "",
          frequency: item.frequency ?? "",
          gdpr: item.gdpr ?? false,
          sox: item.sox ?? false,
          iso: item.iso ?? false,
          hipaa: item.hipaa ?? false,
          pci: item.pci ?? false,
          ccpa: item.ccpa ?? false,
        });
      }
    } catch (error) {
      console.error("Error fetching compliance settings:", error);
    } finally {
      setLoading(false);
    }
  };

  // SAVE DATA TO DATABASE
  const handleSave = async () => {
    try {
      setLoading(true);

      const url = complianceId
        ? `${API_URL}/${complianceId}`
        : API_URL;

      const method = complianceId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      });

      if (!response.ok) {
        throw new Error("Failed to save compliance settings");
      }

      const result = await response.json();

      if (!complianceId && result.id) {
        setComplianceId(result.id);
      }

      alert("Compliance settings saved successfully!");

      // Reload saved data from database
      await fetchCompliance();

    } catch (error) {
      console.error("Error saving compliance settings:", error);
      alert("Failed to save compliance settings.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSettings((previousSettings) => ({
      ...previousSettings,
      [name]: value,
    }));
  };

  const toggle = (key) => {
    setSettings((previousSettings) => ({
      ...previousSettings,
      [key]: !previousSettings[key],
    }));
  };

  const Toggle = ({ value, onClick }) => (
    <button
      type="button"
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

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold">
            Compliance Settings
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your compliance settings preferences
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


      {/* Compliance Score */}

      <div className="rounded-2xl border bg-white shadow">

        <div className="border-b p-6">

          <h2 className="text-2xl font-semibold">
            Compliance Score Configuration
          </h2>

          <p className="mt-1 text-gray-500">
            Define thresholds that trigger compliance alerts.
          </p>

        </div>

        <div className="grid grid-cols-2 gap-6 p-6">

          {/* Critical Threshold */}

          <div>

            <label className="mb-2 block font-medium">
              Critical threshold
            </label>

            <p className="mb-3 text-sm text-gray-500">
              Below this score triggers a critical alert
            </p>

            <select
              name="critical"
              value={settings.critical}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#D4AF37]"
            >
              <option value="">Select threshold</option>
              <option value="60%">60%</option>
              <option value="70%">70%</option>
              <option value="75%">75%</option>
              <option value="80%">80%</option>
            </select>

          </div>


          {/* Warning Threshold */}

          <div>

            <label className="mb-2 block font-medium">
              Warning threshold
            </label>

            <p className="mb-3 text-sm text-gray-500">
              Below this score triggers a warning
            </p>

            <select
              name="warning"
              value={settings.warning}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#D4AF37]"
            >
              <option value="">Select threshold</option>
              <option value="70%">70%</option>
              <option value="80%">80%</option>
              <option value="85%">85%</option>
              <option value="90%">90%</option>
            </select>

          </div>


          {/* Score Calculation */}

          <div>

            <label className="mb-2 block font-medium">
              Score calculation
            </label>

            <p className="mb-3 text-sm text-gray-500">
              Method used to calculate compliance score
            </p>

            <select
              name="calculation"
              value={settings.calculation}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#D4AF37]"
            >
              <option value="">Select calculation</option>
              <option value="Weighted average">
                Weighted average
              </option>
              <option value="Simple average">
                Simple average
              </option>
              <option value="Risk based">
                Risk based
              </option>
            </select>

          </div>


          {/* Review Frequency */}

          <div>

            <label className="mb-2 block font-medium">
              Review frequency
            </label>

            <p className="mb-3 text-sm text-gray-500">
              How often the compliance score is recalculated
            </p>

            <select
              name="frequency"
              value={settings.frequency}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#D4AF37]"
            >
              <option value="">Select frequency</option>
              <option value="Real-time">Real-time</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>

          </div>

        </div>

      </div>


      {/* Regulatory Frameworks */}

      <div className="rounded-2xl border bg-white shadow">

        <div className="border-b p-6">

          <h2 className="text-2xl font-semibold">
            Regulatory Frameworks
          </h2>

          <p className="mt-1 text-gray-500">
            Standards this organization tracks compliance against.
          </p>

        </div>

        <div className="space-y-4 p-6">

          {/* GDPR */}

          <div className="flex items-center justify-between rounded-xl border border-gray-200 p-5">

            <div>

              <h3 className="font-semibold">
                GDPR
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                EU General Data Protection Regulation
              </p>

            </div>

            <Toggle
              value={settings.gdpr}
              onClick={() => toggle("gdpr")}
            />

          </div>


          {/* SOX */}

          <div className="flex items-center justify-between rounded-xl border border-gray-200 p-5">

            <div>

              <h3 className="font-semibold">
                SOX
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Sarbanes-Oxley Act – Financial reporting
              </p>

            </div>

            <Toggle
              value={settings.sox}
              onClick={() => toggle("sox")}
            />

          </div>


          {/* ISO 27001 */}

          <div className="flex items-center justify-between rounded-xl border border-gray-200 p-5">

            <div>

              <h3 className="font-semibold">
                ISO 27001
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Information security management
              </p>

            </div>

            <Toggle
              value={settings.iso}
              onClick={() => toggle("iso")}
            />

          </div>


          {/* HIPAA */}

          <div className="flex items-center justify-between rounded-xl border border-gray-200 p-5">

            <div>

              <h3 className="font-semibold">
                HIPAA
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Health information privacy (US)
              </p>

            </div>

            <Toggle
              value={settings.hipaa}
              onClick={() => toggle("hipaa")}
            />

          </div>


          {/* PCI DSS */}

          <div className="flex items-center justify-between rounded-xl border border-gray-200 p-5">

            <div>

              <h3 className="font-semibold">
                PCI DSS
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Payment card industry data security
              </p>

            </div>

            <Toggle
              value={settings.pci}
              onClick={() => toggle("pci")}
            />

          </div>


          {/* CCPA */}

          <div className="flex items-center justify-between rounded-xl border border-gray-200 p-5">

            <div>

              <h3 className="font-semibold">
                CCPA
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                California Consumer Privacy Act
              </p>

            </div>

            <Toggle
              value={settings.ccpa}
              onClick={() => toggle("ccpa")}
            />

          </div>

        </div>

      </div>

    </div>
  );
};

export default ComplianceSection;