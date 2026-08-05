import { useState, useEffect } from "react";
import { Bell } from "lucide-react";

const NotificationSection = () => {
  const [notificationId, setNotificationId] = useState(null);

  const [loading, setLoading] = useState(false);

  const [notifications, setNotifications] = useState({
    renewal: true,
    obligation: true,
    approval: true,
    compliance: true,
    activity: false,
    security: true,
    system: true,

    inApp: true,
    email: true,
    slack: false,
    sms: false,
  });

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "http://127.0.0.1:8000/settings/notifications"
      );

      if (!response.ok) {
        throw new Error("Failed to fetch notification settings");
      }

      const data = await response.json();

      if (data.length > 0) {
        const item = data[0];

        setNotificationId(item.id);

        setNotifications({
          renewal: item.renewal,
          obligation: item.obligation,
          approval: item.approval,
          compliance: item.compliance,
          activity: item.activity,
          security: item.security,
          system: item.system,
          inApp: item.inApp,
          email: item.email,
          slack: item.slack,
          sms: item.sms,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const url = notificationId
        ? `http://127.0.0.1:8000/settings/notifications/${notificationId}`
        : "http://127.0.0.1:8000/settings/notifications";

      const method = notificationId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(notifications),
      });

      if (!response.ok) {
        throw new Error("Failed to save");
      }

      const result = await response.json();

      if (!notificationId) {
        setNotificationId(result.id);
      }

      alert("Notification settings saved successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to save notification settings.");
    } finally {
      setLoading(false);
    }
  };

  const toggleSwitch = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const Toggle = ({ value, onClick }) => (
    <button
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
            {/* Notification Preferences */}

      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

        <div className="border-b px-8 py-6">

          <div className="flex items-center gap-3">

            <Bell className="text-[#D4AF37]" size={26} />

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

          </div>          {/* Security Events */}

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

      {/* Delivery */}

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

          </div>      {/* Delivery */}

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

          <div className="flex items-center justify-between border-b px-8 py-6">

            <div>

              <h3 className="font-semibold text-[#1F2937]">
                Push Notifications
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Receive notifications inside ContractIQ
              </p>

            </div>

            <Toggle
              value={notifications.push_notifications}
              onClick={() => toggleSwitch("push_notifications")}
            />

          </div>

          <div className="flex items-center justify-between border-b px-8 py-6">

            <div>

              <h3 className="font-semibold text-[#1F2937]">
                Email Notifications
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Receive notifications by email
              </p>

            </div>

            <Toggle
              value={notifications.email_notifications}
              onClick={() => toggleSwitch("email_notifications")}
            />

          </div>

          <div className="flex items-center justify-between border-b px-8 py-6">

            <div>

              <h3 className="font-semibold text-[#1F2937]">
                SMS Notifications
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Receive important alerts by SMS
              </p>

            </div>

            <Toggle
              value={notifications.sms_notifications}
              onClick={() => toggleSwitch("sms_notifications")}
            />

          </div>

          <div className="flex items-center justify-between px-8 py-6">

            <div>

              <h3 className="font-semibold text-[#1F2937]">
                Weekly Summary
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Receive a weekly summary of all activities
              </p>

            </div>

            <Toggle
              value={notifications.weekly_summary}
              onClick={() => toggleSwitch("weekly_summary")}
            />

          </div>

        </div>

      </div>

    </div>
    </div>
    </div>
  );
};

export default NotificationSection;