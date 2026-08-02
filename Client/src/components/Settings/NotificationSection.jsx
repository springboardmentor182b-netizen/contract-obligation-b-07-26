import { useState } from "react";
import { Bell } from "lucide-react";

const NotificationSection = () => {
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

  const toggleSwitch = (key) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = () => {
    alert("Notification settings saved successfully! (Frontend only)");
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
          className="rounded-xl bg-[#D4AF37] px-6 py-3 font-semibold text-[#1F2937]"
        >
          Save Changes
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

          {/* Email Digest */}

          <div className="flex items-center justify-between border-b px-8 py-6">

            <div>

              <h3 className="font-semibold text-[#1F2937]">
                Email digest
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Daily summary email at 8am
              </p>

            </div>

            <Toggle
              value={notifications.email}
              onClick={() => toggleSwitch("email")}
            />

          </div>

          {/* Slack */}

          <div className="flex items-center justify-between border-b px-8 py-6">

            <div>

              <h3 className="font-semibold text-[#1F2937]">
                Slack
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                #contracts-alerts channel
              </p>

            </div>

            <Toggle
              value={notifications.slack}
              onClick={() => toggleSwitch("slack")}
            />

          </div>

          {/* SMS */}

          <div className="flex items-center justify-between px-8 py-6">

            <div>

              <h3 className="font-semibold text-[#1F2937]">
                SMS — Critical only
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Text alerts for Critical priority only
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