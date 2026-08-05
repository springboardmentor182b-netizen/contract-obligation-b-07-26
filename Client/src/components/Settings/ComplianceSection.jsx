import { useState, useEffect } from "react";

const ComplianceSection = () => {

  const [complianceId, setComplianceId] = useState(null);

  const [settings, setSettings] = useState({
    critical: "70%",
    warning: "80%",
    calculation: "Weighted average",
    frequency: "Real-time",
    gdpr: true,
    sox: true,
    iso: true,
    hipaa: false,
    pci: true,
    ccpa: false,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCompliance();
  }, []);

  const fetchCompliance = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://127.0.0.1:8000/settings/compliance"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch compliance settings");
      }

      const data = await response.json();

      if (data.length > 0) {
        const item = data[0];

        setComplianceId(item.id);

        setSettings({
          critical: item.critical,
          warning: item.warning,
          calculation: item.calculation,
          frequency: item.frequency,
          gdpr: item.gdpr,
          sox: item.sox,
          iso: item.iso,
          hipaa: item.hipaa,
          pci: item.pci,
          ccpa: item.ccpa,
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

      const url = complianceId
        ? `http://127.0.0.1:8000/settings/compliance/${complianceId}`
        : "http://127.0.0.1:8000/settings/compliance";

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

      if (!complianceId) {
        setComplianceId(result.id);
      }

      alert("Compliance settings saved successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to save compliance settings.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setSettings({
      ...settings,
      [e.target.name]: e.target.value,
    });
  };

  const toggle = (key) => {
    setSettings({
      ...settings,
      [key]: !settings[key],
    });
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
          <option>60%</option>
          <option>70%</option>
          <option>75%</option>
          <option>80%</option>
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
          <option>70%</option>
          <option>80%</option>
          <option>85%</option>
          <option>90%</option>
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
          <option>Weighted average</option>
          <option>Simple average</option>
          <option>Risk based</option>
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
          <option>Real-time</option>
          <option>Daily</option>
          <option>Weekly</option>
          <option>Monthly</option>
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