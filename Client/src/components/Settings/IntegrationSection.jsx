import { useState } from "react";

const IntegrationsSection = () => {
  const [apps, setApps] = useState([
    {
      name: "Microsoft 365",
      icon: "M",
      description: "SharePoint storage + Outlook calendar sync",
      connected: true,
      since: "Connected since 2023-01-15",
    },
    {
      name: "Salesforce CRM",
      icon: "S",
      description: "Contract data sync with opportunity pipeline",
      connected: true,
      since: "Connected since 2023-06-01",
    },
    {
      name: "DocuSign",
      icon: "D",
      description: "E-signature workflow for contract approvals",
      connected: true,
      since: "Connected since 2022-11-10",
    },
    {
      name: "Slack",
      icon: "S",
      description: "Contract notifications to workspace channels",
      connected: false,
    },
    {
      name: "Jira",
      icon: "J",
      description: "Link contract obligations to project tickets",
      connected: false,
    },
    {
      name: "Workday HCM",
      icon: "W",
      description: "Sync employment contracts with HR system",
      connected: false,
    },
  ]);

  const handleToggle = (index) => {
    const updated = [...apps];
    updated[index].connected = !updated[index].connected;
    setApps(updated);
  };

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold text-[#1F2937]">
            Integrations
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your integrations preferences
          </p>

        </div>

        <button className="rounded-xl bg-[#D4AF37] px-6 py-3 font-semibold text-[#1F2937]">
          Save Changes
        </button>

      </div>

      {/* Connected Applications */}

      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

        <div className="border-b px-8 py-6">

          <h2 className="text-2xl font-semibold">
            Connected Applications
          </h2>

          <p className="mt-1 text-gray-500">
            External tools and services integrated with ContractIQ.
          </p>

        </div>

        <div>
          {apps.map((app, index) => (
            <div
              key={app.name}
              className={`flex items-center justify-between px-8 py-6 ${
                index !== apps.length - 1
                  ? "border-b border-gray-200"
                  : ""
              }`}
            >
              <div className="flex items-center gap-5">

                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#D4AF37] text-xl font-bold text-white">
                  {app.icon}
                </div>

                <div>

                  <h3 className="text-lg font-semibold text-[#1F2937]">
                    {app.name}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    {app.description}
                  </p>

                  {app.connected && (
                    <p className="mt-2 text-sm text-gray-400">
                      {app.since}
                    </p>
                  )}

                </div>

              </div>

              <div className="flex items-center gap-4">

                {app.connected && (
                  <span className="rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-700">
                    Connected
                  </span>
                )}

                <button
                  onClick={() => handleToggle(index)}
                  className={`rounded-xl px-5 py-2 font-semibold transition ${
                    app.connected
                      ? "border border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                      : "bg-[#D4AF37] text-[#1F2937] hover:opacity-90"
                  }`}
                >
                  {app.connected ? "Disconnect" : "Connect"}
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* API Access */}

      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

        <div className="border-b px-8 py-6">

          <h2 className="text-2xl font-semibold">
            API Access
          </h2>

          <p className="mt-1 text-gray-500">
            Manage API keys for custom integrations with ContractIQ.
          </p>

        </div>

        {/* Production Key */}

        <div className="flex items-center justify-between border-b px-8 py-6">

          <div>

            <h3 className="text-lg font-semibold text-[#1F2937]">
              Production Key
            </h3>

            <p className="mt-2 font-mono text-sm text-gray-700">
              ciq_live_••••••••••••••••••4f2a
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Created 2023-06-01 · Last used 2024-12-06
            </p>

          </div>

          <div className="flex gap-3">

            <button className="rounded-xl border border-[#D4AF37] px-5 py-2 font-semibold text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition">
              Rotate
            </button>

            <button className="rounded-xl border border-red-500 px-5 py-2 font-semibold text-red-500 hover:bg-red-500 hover:text-white transition">
              Revoke
            </button>

          </div>

        </div>

        {/* Sandbox Key */}

        <div className="flex items-center justify-between px-8 py-6">

          <div>

            <h3 className="text-lg font-semibold text-[#1F2937]">
              Sandbox Key
            </h3>

            <p className="mt-2 font-mono text-sm text-gray-700">
              ciq_test_••••••••••••••••••9c1b
            </p>

            <p className="mt-2 text-sm text-gray-500">
              Created 2024-01-10 · Last used 2024-11-30
            </p>

          </div>

          <div className="flex gap-3">

            <button className="rounded-xl border border-[#D4AF37] px-5 py-2 font-semibold text-[#D4AF37] hover:bg-[#D4AF37] hover:text-white transition">
              Rotate
            </button>

            <button className="rounded-xl border border-red-500 px-5 py-2 font-semibold text-red-500 hover:bg-red-500 hover:text-white transition">
              Revoke
            </button>

          </div>

        </div>

      </div>
            {/* Generate API Key */}

      <div className="flex justify-end">

        <button
          onClick={() =>
            alert("New API Key generated successfully! (Frontend only)")
          }
          className="rounded-xl bg-[#D4AF37] px-6 py-3 font-semibold text-[#1F2937] transition hover:opacity-90"
        >
          Generate New API Key
        </button>

      </div>

    </div>
  );
};

export default IntegrationsSection;