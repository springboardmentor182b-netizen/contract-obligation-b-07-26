import { useEffect, useState } from "react";
import { Shield, Smartphone, KeyRound } from "lucide-react";

const SecuritySection = () => {
  const [securityId, setSecurityId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [security, setSecurity] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactor: false,
    sessionAlerts: true,
  });

  useEffect(() => {
    fetchSecurity();
  }, []);

  // GET security settings from backend
  const fetchSecurity = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://127.0.0.1:8000/settings/security"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch security settings");
      }

      const data = await response.json();

      // Backend may return either an array or a single object
      const item = Array.isArray(data) ? data[0] : data;

      if (item) {
        setSecurityId(item.id);

        setSecurity((prev) => ({
          ...prev,
          twoFactor: item.twoFactor ?? false,
          sessionAlerts: item.sessionAlerts ?? true,
        }));
      }
    } catch (error) {
      console.error("Error fetching security settings:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setSecurity((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Save security settings to backend
  const handleSave = async () => {
    try {
      setLoading(true);

      // Password confirmation validation
      if (
        security.newPassword &&
        security.newPassword !== security.confirmPassword
      ) {
        alert("New password and confirm password do not match.");
        setLoading(false);
        return;
      }

      const method = securityId ? "PUT" : "POST";

      const url = securityId
        ? `http://127.0.0.1:8000/settings/security/${securityId}`
        : "http://127.0.0.1:8000/settings/security";

      /*
       * Send only fields that belong to security settings.
       *
       * Password fields are intentionally not sent here because
       * they should only be sent to a dedicated password-change
       * endpoint if the backend provides one.
       */
      const requestBody = {
        twoFactor: security.twoFactor,
        sessionAlerts: security.sessionAlerts,
      };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to save security settings");
      }

      const result = await response.json();

      if (!securityId && result.id) {
        setSecurityId(result.id);
      }

      // Clear password fields after successful save
      setSecurity((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));

      alert("Security settings saved successfully.");
    } catch (error) {
      console.error("Error saving security settings:", error);
      alert("Unable to save security settings.");
    } finally {
      setLoading(false);
    }
  };

  // Toggle Two-Factor Authentication
  const toggleTwoFactor = () => {
    setSecurity((prev) => ({
      ...prev,
      twoFactor: !prev.twoFactor,
    }));
  };

  // Toggle Session Alerts
  const toggleSessionAlerts = () => {
    setSecurity((prev) => ({
      ...prev,
      sessionAlerts: !prev.sessionAlerts,
    }));
  };

  // Generate backup codes
  const handleGenerateBackupCodes = () => {
    alert("Backup code generation is not configured in the backend yet.");
  };

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#1F2937]">
            Security & Access
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your security settings
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

      {/* Password */}
      <div className="rounded-2xl border bg-white p-8 shadow">

        <div className="mb-6 flex items-center gap-3">
          <Shield className="text-[#D4AF37]" />

          <h2 className="text-2xl font-semibold">
            Password
          </h2>
        </div>

        {/* Current Password */}
        <label className="mb-2 block font-medium">
          Current Password
        </label>

        <input
          type="password"
          name="currentPassword"
          value={security.currentPassword}
          onChange={handleChange}
          className="mb-5 w-full rounded-xl border px-4 py-3"
        />

        {/* New Password */}
        <label className="mb-2 block font-medium">
          New Password
        </label>

        <input
          type="password"
          name="newPassword"
          value={security.newPassword}
          onChange={handleChange}
          className="mb-5 w-full rounded-xl border px-4 py-3"
        />

        {/* Confirm Password */}
        <label className="mb-2 block font-medium">
          Confirm Password
        </label>

        <input
          type="password"
          name="confirmPassword"
          value={security.confirmPassword}
          onChange={handleChange}
          className="w-full rounded-xl border px-4 py-3"
        />

      </div>

      {/* Two Factor Authentication */}
      <div className="rounded-2xl border bg-white p-8 shadow">

        <div className="flex items-center justify-between">

          <div className="flex gap-3">

            <Smartphone className="text-[#D4AF37]" />

            <div>
              <h2 className="text-xl font-semibold">
                Two-Factor Authentication
              </h2>

              <p className="text-gray-500">
                Add extra protection to your account
              </p>
            </div>

          </div>

          <button
            type="button"
            onClick={toggleTwoFactor}
            className={`rounded-xl px-5 py-2 ${
              security.twoFactor
                ? "bg-[#D4AF37]"
                : "bg-gray-300"
            }`}
          >
            {security.twoFactor ? "Enabled" : "Disabled"}
          </button>

        </div>

      </div>

      {/* Session Alerts */}
      <div className="rounded-2xl border bg-white p-8 shadow">

        <div className="flex items-center justify-between">

          <div>
            <h2 className="text-xl font-semibold">
              Session Alerts
            </h2>

            <p className="text-gray-500">
              Email me when a new session starts
            </p>
          </div>

          <button
            type="button"
            onClick={toggleSessionAlerts}
            className={`relative h-7 w-14 rounded-full transition ${
              security.sessionAlerts
                ? "bg-[#D4AF37]"
                : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                security.sessionAlerts
                  ? "left-8"
                  : "left-1"
              }`}
            />
          </button>

        </div>

      </div>

      {/* Backup Codes */}
      <div className="flex justify-between rounded-2xl border bg-white p-8 shadow">

        <div className="flex gap-3">

          <KeyRound className="text-[#D4AF37]" />

          <div>
            <h2 className="text-xl font-semibold">
              Backup Codes
            </h2>

            <p className="text-gray-500">
              Generate recovery codes
            </p>
          </div>

        </div>

        <button
          type="button"
          onClick={handleGenerateBackupCodes}
          className="rounded-xl border border-[#D4AF37] px-5 py-2"
        >
          Generate
        </button>

      </div>

    </div>
  );
};

export default SecuritySection;