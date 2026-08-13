import { useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:8000/settings/appearance";

const AppearanceSection = () => {
  const [appearanceId, setAppearanceId] = useState(null);
  const [loading, setLoading] = useState(false);

  const [appearance, setAppearance] = useState({
    theme: "",
    accentColor: "",
    density: "",
    sidebar: "",
  });

  useEffect(() => {
    fetchAppearance();
  }, []);

  const fetchAppearance = async () => {
    try {
      setLoading(true);

      const response = await fetch(API_URL);

      if (!response.ok) {
        throw new Error("Failed to fetch appearance settings");
      }

      const data = await response.json();

      console.log("Appearance Data:", data);

      // Backend may return an array or a single object
      const item = Array.isArray(data) ? data[0] : data;

      if (item) {
        setAppearanceId(item.id);

        setAppearance({
          theme: item.theme || "",
          accentColor: item.accentColor || "",
          density: item.density || "",
          sidebar: item.sidebar || "",
        });
      }
    } catch (error) {
      console.error("Appearance fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setAppearance({
      ...appearance,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      const method = appearanceId ? "PUT" : "POST";

      const url = appearanceId
        ? `${API_URL}/${appearanceId}`
        : API_URL;

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(appearance),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Backend error:", errorText);
        throw new Error("Failed to save appearance settings");
      }

      const result = await response.json();

      console.log("Appearance saved:", result);

      if (!appearanceId && result.id) {
        setAppearanceId(result.id);
      }

      alert("Appearance settings saved successfully!");
    } catch (error) {
      console.error("Appearance save error:", error);
      alert("Failed to save Appearance settings.");
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
            Appearance
          </h1>

          <p className="mt-2 text-gray-500">
            Customize how ContractIQ looks and feels
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

      {/* Theme */}
      <div className="rounded-2xl border bg-white p-8 shadow">

        <h2 className="text-2xl font-semibold text-[#1F2937]">
          Theme
        </h2>

        <p className="mt-2 text-gray-500">
          Choose your preferred application theme.
        </p>

        <div className="mt-6">

          <label className="mb-2 block font-medium">
            Theme
          </label>

          <select
            name="theme"
            value={appearance.theme}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#D4AF37]"
          >
            <option value="">
              Select Theme
            </option>

            <option value="Light">
              Light
            </option>

            <option value="Dark">
              Dark
            </option>

            <option value="System">
              System Default
            </option>
          </select>

        </div>

      </div>

      {/* Accent Color */}
      <div className="rounded-2xl border bg-white p-8 shadow">

        <h2 className="text-2xl font-semibold text-[#1F2937]">
          Accent Color
        </h2>

        <p className="mt-2 text-gray-500">
          Select the accent color used throughout the application.
        </p>

        <div className="mt-6">

          <label className="mb-2 block font-medium">
            Accent Color
          </label>

          <select
            name="accentColor"
            value={appearance.accentColor}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#D4AF37]"
          >
            <option value="">
              Select Accent Color
            </option>

            <option value="Gold">
              Gold
            </option>

            <option value="Blue">
              Blue
            </option>

            <option value="Green">
              Green
            </option>

            <option value="Purple">
              Purple
            </option>
          </select>

        </div>

      </div>

      {/* Display Density */}
      <div className="rounded-2xl border bg-white p-8 shadow">

        <h2 className="text-2xl font-semibold text-[#1F2937]">
          Display Density
        </h2>

        <p className="mt-2 text-gray-500">
          Control how much information is displayed on the screen.
        </p>

        <div className="mt-6">

          <label className="mb-2 block font-medium">
            Density
          </label>

          <select
            name="density"
            value={appearance.density}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#D4AF37]"
          >
            <option value="">
              Select Density
            </option>

            <option value="Compact">
              Compact
            </option>

            <option value="Comfortable">
              Comfortable
            </option>

            <option value="Spacious">
              Spacious
            </option>
          </select>

        </div>

      </div>

      {/* Sidebar */}
      <div className="rounded-2xl border bg-white p-8 shadow">

        <h2 className="text-2xl font-semibold text-[#1F2937]">
          Sidebar
        </h2>

        <p className="mt-2 text-gray-500">
          Configure the sidebar display mode.
        </p>

        <div className="mt-6">

          <label className="mb-2 block font-medium">
            Sidebar Mode
          </label>

          <select
            name="sidebar"
            value={appearance.sidebar}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none focus:border-[#D4AF37]"
          >
            <option value="">
              Select Sidebar Mode
            </option>

            <option value="Expanded">
              Expanded
            </option>

            <option value="Collapsed">
              Collapsed
            </option>

          </select>

        </div>

      </div>

    </div>
  );
};

export default AppearanceSection;