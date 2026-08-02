import { useState } from "react";
import { Shield, Smartphone, KeyRound } from "lucide-react";

const SecuritySection = () => {
  const [passwords, setPasswords] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });

  const [twoFactor] = useState(true);
  const [sessionAlerts, setSessionAlerts] = useState(true);

  const handleChange = (e) => {
    setPasswords({
      ...passwords,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    alert("Security settings saved successfully! (Frontend only)");
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
            Manage your security & access preferences
          </p>

        </div>

        <button
          onClick={handleSave}
          className="rounded-xl bg-[#D4AF37] px-6 py-3 font-semibold text-[#1F2937]"
        >
          Save Changes
        </button>

      </div>

      {/* Password */}

      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

        <div className="border-b px-8 py-6">

          <div className="flex items-center gap-3">

            <Shield className="text-[#D4AF37]" size={26} />

            <div>

              <h2 className="text-2xl font-semibold">
                Password
              </h2>

              <p className="text-gray-500">
                Change your account password. Must be at least 12 characters.
              </p>

            </div>

          </div>

        </div>

        <div className="space-y-6 p-8">

          <div>

            <label className="mb-2 block font-medium">
              Current Password
            </label>

            <input
              type="password"
              name="current"
              value={passwords.current}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-[#D4AF37] outline-none"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              New Password
            </label>

            <input
              type="password"
              name="newPassword"
              value={passwords.newPassword}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-[#D4AF37] outline-none"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Confirm Password
            </label>

            <input
              type="password"
              name="confirm"
              value={passwords.confirm}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-[#D4AF37] outline-none"
            />

          </div>

          <button className="rounded-xl bg-[#D4AF37] px-5 py-3 font-semibold text-[#1F2937]">
            Update Password
          </button>

        </div>

      </div>
            {/* Two-Factor Authentication */}

      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

        <div className="border-b px-8 py-6">

          <div className="flex items-center gap-3">

            <Smartphone className="text-[#D4AF37]" size={26} />

            <div>

              <h2 className="text-2xl font-semibold">
                Two-Factor Authentication
              </h2>

              <p className="text-gray-500">
                Add a second layer of protection to your account.
              </p>

            </div>

          </div>

        </div>

        <div className="flex items-center justify-between p-8">

          <div>

            <h3 className="font-semibold text-[#1F2937]">
              2FA is enabled on your account
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Authenticator app configured · Last verified Dec 4, 2024
            </p>

          </div>

          <button className="rounded-xl border border-[#D4AF37] px-5 py-2 font-semibold text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition">
            Reconfigure
          </button>

        </div>

      </div>

      {/* Backup Codes */}

      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

        <div className="flex items-center justify-between p-8">

          <div className="flex items-center gap-3">

            <KeyRound className="text-[#D4AF37]" size={24} />

            <div>

              <h2 className="text-xl font-semibold">
                Backup Codes
              </h2>

              <p className="text-gray-500">
                Generate one-time backup codes for account recovery.
              </p>

            </div>

          </div>

          <button className="rounded-xl border border-[#D4AF37] px-5 py-2 font-semibold text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition">
            Generate
          </button>

        </div>

      </div>

      {/* Session Alerts */}

      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

        <div className="flex items-center justify-between p-8">

          <div>

            <h2 className="text-xl font-semibold">
              Session Alerts
            </h2>

            <p className="text-gray-500">
              Email me when a new session is started on my account.
            </p>

          </div>

          <button
            onClick={() => setSessionAlerts(!sessionAlerts)}
            className={`relative h-7 w-14 rounded-full transition ${
              sessionAlerts
                ? "bg-[#D4AF37]"
                : "bg-gray-300"
            }`}
          >

            <span
              className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                sessionAlerts
                  ? "left-8"
                  : "left-1"
              }`}
            ></span>

          </button>

        </div>

      </div>
            {/* Active Sessions */}

      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

        <div className="border-b px-8 py-6">

          <h2 className="text-2xl font-semibold">
            Active Sessions
          </h2>

          <p className="mt-1 text-gray-500">
            Devices currently signed into ContractIQ with your credentials.
          </p>

        </div>

        {/* Current Session */}

        <div className="flex items-center justify-between border-b px-8 py-6">

          <div>

            <h3 className="font-semibold text-[#1F2937]">
              MacBook Pro – Chrome 120
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              10.0.1.42 · New York, NY · Current session
            </p>

          </div>

          <span className="rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-700">
            Current
          </span>

        </div>

        {/* Session 2 */}

        <div className="flex items-center justify-between border-b px-8 py-6">

          <div>

            <h3 className="font-semibold text-[#1F2937]">
              iPhone 15 Pro – Safari
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              10.0.1.91 · New York, NY · 1 hour ago
            </p>

          </div>

          <button className="rounded-xl border border-red-500 px-5 py-2 font-semibold text-red-500 transition hover:bg-red-500 hover:text-white">
            Revoke
          </button>

        </div>

        {/* Session 3 */}

        <div className="flex items-center justify-between px-8 py-6">

          <div>

            <h3 className="font-semibold text-[#1F2937]">
              Windows 11 – Edge 119
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              192.168.4.11 · Newark, NJ · Yesterday 09:30
            </p>

          </div>

          <button className="rounded-xl border border-red-500 px-5 py-2 font-semibold text-red-500 transition hover:bg-red-500 hover:text-white">
            Revoke
          </button>

        </div>

      </div>
            {/* Sign Out All Other Sessions */}

      <div className="flex justify-end">

        <button
          className="rounded-xl bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700"
          onClick={() =>
            alert("All other sessions have been signed out. (Frontend only)")
          }
        >
          Sign out all other sessions
        </button>

      </div>

    </div>
  );
};

export default SecuritySection;