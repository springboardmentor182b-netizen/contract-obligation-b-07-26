import { useEffect, useState } from "react";
import { Bell } from "lucide-react";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/settings/notifications`;

const NotificationSection = () => {
  const [notificationId, setNotificationId] = useState(null);
  const [loading, setLoading] = useState(false);

  // No dummy data.
  // Values will come from the backend.
  const [notifications, setNotifications] = useState({
    renewal: false,
    obligation: false,
    approval: false,
    compliance: false,
    activity: false,
    security: false,
    system: false,

    inApp: false,
    email: false,
    slack: false,
    sms: false,
  });

  useEffect(() => {
    fetchNotifications();
  }, []);

  // =========================
  // GET NOTIFICATION SETTINGS
  // =========================
  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch notification settings");
      }

      const data = await response.json();

      if (data.length > 0) {
        const item = data[0];

        setNotificationId(item.id);

        setNotifications({
          renewal: item.renewal ?? false,
          obligation: item.obligation ?? false,
          approval: item.approval ?? false,
          compliance: item.compliance ?? false,
          activity: item.activity ?? false,
          security: item.security ?? false,
          system: item.system ?? false,

          inApp: item.inApp ?? false,
          email: item.email ?? false,
          slack: item.slack ?? false,
          sms: item.sms ?? false,
        });
      }
    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // SAVE NOTIFICATION SETTINGS
  // =========================
  const handleSave = async () => {
    try {
      setLoading(true);

      const url = notificationId
        ? `${API_URL}/${notificationId}`
        : API_URL;

      const method = notificationId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notifications),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to save settings");
      }

      const result = await response.json();

      if (!notificationId && result.id) {
        setNotificationId(result.id);
      }

      alert("Notification settings saved successfully!");
    } catch (error) {
      console.error("Error saving notifications:", error);
      alert("Failed to save notification settings.");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // TOGGLE SWITCH
  // =========================
  const toggleSwitch = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // =========================
  // TOGGLE COMPONENT
  // =========================
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

      {/* ================= HEADER ================= */}

      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold text-[#1F2937]">
            Notification Settings
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your notification settings preferences
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

      {/* ================= NOTIFICATION PREFERENCES ================= */}

      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

        <div className="border-b px-8 py-6">

          <div className="flex items-center gap-3">

            <Bell
              className="text-[#D4AF37]"
              size={26}
            />

            <div>

              <h2 className="text-2xl font-semibold">
                Notification Preferences
              </h2>

              <p className="text-gray-500">
                Choose which events send you notifications.
              </p>

            </div>

          </div>

        </div>

        <div>

          {/* Renewal Reminders */}

          <div className="flex items-center justify-between border-b px-8 py-6">

            <div>

              <h3 className="font-semibold text-[#1F2937]">
                Renewal reminders
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Alerts before contract expiry dates
              </p>

            </div>

            <Toggle
              value={notifications.renewal}
              onClick={() => toggleSwitch("renewal")}
            />

          </div>

          {/* Obligation Alerts */}

          <div className="flex items-center justify-between border-b px-8 py-6">

            <div>

              <h3 className="font-semibold text-[#1F2937]">
                Obligation alerts
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Overdue or approaching obligation due dates
              </p>

            </div>

            <Toggle
              value={notifications.obligation}
              onClick={() => toggleSwitch("obligation")}
            />

          </div>

          {/* Approval Requests */}

          <div className="flex items-center justify-between border-b px-8 py-6">

            <div>

              <h3 className="font-semibold text-[#1F2937]">
                Approval requests
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                When a contract is submitted for your review
              </p>

            </div>

            <Toggle
              value={notifications.approval}
              onClick={() => toggleSwitch("approval")}
            />

          </div>

          {/* Compliance Alerts */}

          <div className="flex items-center justify-between border-b px-8 py-6">

            <div>

              <h3 className="font-semibold text-[#1F2937]">
                Compliance alerts
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Risk flags and audit findings
              </p>

            </div>

            <Toggle
              value={notifications.compliance}
              onClick={() => toggleSwitch("compliance")}
            />

          </div>

          {/* User Activity */}

          <div className="flex items-center justify-between border-b px-8 py-6">

            <div>

              <h3 className="font-semibold text-[#1F2937]">
                User activity
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                New users and permission changes
              </p>

            </div>

            <Toggle
              value={notifications.activity}
              onClick={() => toggleSwitch("activity")}
            />

          </div>

          {/* Security Events */}

          <div className="flex items-center justify-between border-b px-8 py-6">

            <div>

              <h3 className="font-semibold text-[#1F2937]">
                Security events
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Failed logins and new device alerts
              </p>

            </div>

            <Toggle
              value={notifications.security}
              onClick={() => toggleSwitch("security")}
            />

          </div>

          {/* System Notifications */}

          <div className="flex items-center justify-between px-8 py-6">

            <div>

              <h3 className="font-semibold text-[#1F2937]">
                System notifications
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Backups, reports, and maintenance alerts
              </p>

            </div>

            <Toggle
              value={notifications.system}
              onClick={() => toggleSwitch("system")}
            />

          </div>

        </div>

      </div>

      {/* ================= DELIVERY ================= */}

      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

        <div className="border-b px-8 py-6">

          <h2 className="text-2xl font-semibold">
            Delivery
          </h2>

          <p className="mt-1 text-gray-500">
            How notifications reach you.
          </p>

        </div>

        <div>

          {/* In-App Notifications */}

          <div className="flex items-center justify-between border-b px-8 py-6">

            <div>

              <h3 className="font-semibold text-[#1F2937]">
                In-app notifications
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Badge and panel in ContractIQ
              </p>

            </div>

            <Toggle
              value={notifications.inApp}
              onClick={() => toggleSwitch("inApp")}
            />

          </div>

          {/* Email Notifications */}

          <div className="flex items-center justify-between border-b px-8 py-6">

            <div>

              <h3 className="font-semibold text-[#1F2937]">
                Email notifications
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Receive notifications by email
              </p>

            </div>

            <Toggle
              value={notifications.email}
              onClick={() => toggleSwitch("email")}
            />

          </div>

          {/* Slack Notifications */}

          <div className="flex items-center justify-between border-b px-8 py-6">

            <div>

              <h3 className="font-semibold text-[#1F2937]">
                Slack notifications
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Receive notifications through Slack
              </p>

            </div>

            <Toggle
              value={notifications.slack}
              onClick={() => toggleSwitch("slack")}
            />

          </div>

          {/* SMS Notifications */}

          <div className="flex items-center justify-between px-8 py-6">

            <div>

              <h3 className="font-semibold text-[#1F2937]">
                SMS notifications
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Receive important alerts by SMS
              </p>

            </div>

            <Toggle
              value={notifications.sms}
              onClick={() => toggleSwitch("sms")}
            />

          </div>

        </div>

      </div>

    </div>
  );
};

export default NotificationSection;