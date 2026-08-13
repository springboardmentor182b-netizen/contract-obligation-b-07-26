import { useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:8000/settings/integrations";

const IntegrationsSection = () => {
  const [integrations, setIntegrations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchIntegrations();
  }, []);

  const fetchIntegrations = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch integrations");
      }

      const data = await response.json();

      console.log("Integrations Data:", data);

      /*
        Backend can return:
        1. An array of integrations
        2. A single integration object
      */

      if (Array.isArray(data)) {
        setIntegrations(data);
      } else if (data) {
        setIntegrations([data]);
      } else {
        setIntegrations([]);
      }
    } catch (error) {
      console.error("Integration fetch error:", error);
      setIntegrations([]);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (integration) => {
    try {
      setLoading(true);

      const updatedIntegration = {
        name: integration.name,
        icon: integration.icon,
        description: integration.description,
        connected: !integration.connected,
        since: integration.since,
      };

      const response = await fetch(
        `${API_URL}/${integration.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedIntegration),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Backend error:", errorText);
        throw new Error("Failed to update integration");
      }

      const result = await response.json();

      console.log("Integration updated:", result);

      setIntegrations((previous) =>
        previous.map((item) =>
          item.id === integration.id ? result : item
        )
      );
    } catch (error) {
      console.error("Integration update error:", error);
      alert("Failed to update integration.");
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      for (const integration of integrations) {
        const response = await fetch(
          `${API_URL}/${integration.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: integration.name,
              icon: integration.icon,
              description: integration.description,
              connected: integration.connected,
              since: integration.since,
            }),
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to save integration ${integration.id}`
          );
        }
      }

      alert("Integration settings saved successfully!");

      await fetchIntegrations();
    } catch (error) {
      console.error("Integration save error:", error);
      alert("Failed to save integration settings.");
    } finally {
      setLoading(false);
    }
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

        <button
          onClick={handleSave}
          disabled={loading}
          className="rounded-xl bg-[#D4AF37] px-6 py-3 font-semibold text-[#1F2937] disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>

      </div>

      {/* Connected Applications */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

        <div className="border-b border-gray-200 px-8 py-6">

          <h2 className="text-2xl font-bold text-[#1F2937]">
            Connected Applications
          </h2>

          <p className="mt-1 text-gray-500">
            External tools and services integrated with ContractIQ.
          </p>

        </div>

        <div className="p-8">

          {loading && integrations.length === 0 ? (

            <p className="text-gray-500">
              Loading integrations...
            </p>

          ) : integrations.length === 0 ? (

            <p className="text-gray-500">
              No integrations found.
            </p>

          ) : (

            <div className="space-y-5">

              {integrations.map((integration) => (

                <div
                  key={integration.id}
                  className="flex items-center justify-between rounded-xl border border-gray-200 p-6"
                >

                  {/* Application Information */}
                  <div className="flex items-center gap-5">

                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#D4AF37]/10 text-xl font-bold text-[#D4AF37]">
                      {integration.icon || "APP"}
                    </div>

                    <div>

                      <h3 className="text-lg font-semibold text-[#1F2937]">
                        {integration.name || "Unnamed Integration"}
                      </h3>

                      <p className="mt-1 text-sm text-gray-500">
                        {integration.description ||
                          "No description available"}
                      </p>

                      {integration.connected &&
                        integration.since && (
                          <p className="mt-2 text-xs text-gray-400">
                            Connected since {integration.since}
                          </p>
                        )}

                    </div>

                  </div>

                  {/* Connection Status */}
                  <div className="flex items-center gap-4">

                    <span
                      className={`rounded-full px-4 py-2 text-sm font-semibold ${
                        integration.connected
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {integration.connected
                        ? "Connected"
                        : "Disconnected"}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        handleToggle(integration)
                      }
                      disabled={loading}
                      className={`rounded-xl px-5 py-2 font-semibold transition ${
                        integration.connected
                          ? "border border-red-300 text-red-600 hover:bg-red-50"
                          : "bg-[#D4AF37] text-[#1F2937] hover:opacity-90"
                      }`}
                    >
                      {integration.connected
                        ? "Disconnect"
                        : "Connect"}
                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

      {/* API Access */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">

        <div className="border-b border-gray-200 px-8 py-6">

          <h2 className="text-2xl font-bold text-[#1F2937]">
            API Access
          </h2>

          <p className="mt-1 text-gray-500">
            Manage API keys for custom integrations with ContractIQ.
          </p>

        </div>

        <div className="p-8">

          <div className="rounded-xl bg-gray-50 p-6">

            <p className="font-medium text-[#1F2937]">
              API key management is not configured yet.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default IntegrationsSection;