import { useState } from "react";

const AppearanceSection = () => {

  const [appearance, setAppearance] = useState({
    theme: "Light",
    sidebarWidth: "Default (240px)",
    tableDensity: "Default",
    pageSize: "25",
    stickyHeader: true,
    avatars: true,
    animations: true,
    accent: "Gold",
  });

  const handleChange = (e) => {
    setAppearance({
      ...appearance,
      [e.target.name]: e.target.value,
    });
  };

  const toggle = (key) => {
    setAppearance({
      ...appearance,
      [key]: !appearance[key],
    });
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
            Appearance
          </h1>

          <p className="mt-2 text-gray-500">
            Manage your appearance preferences
          </p>

        </div>

        <button className="rounded-xl bg-[#D4AF37] px-6 py-3 font-semibold">
          Save Changes
        </button>

      </div>

      {/* Theme */}

      <div className="rounded-2xl bg-white shadow border">

        <div className="border-b p-6">

          <h2 className="text-2xl font-semibold">
            Theme
          </h2>

          <p className="text-gray-500 mt-1">
            Choose your preferred interface color mode.
          </p>

        </div>

        <div className="p-6 space-y-4">          {/* Light */}

          <label className="flex cursor-pointer items-center justify-between rounded-xl border border-gray-300 p-5 hover:border-[#D4AF37]">

            <div>

              <h3 className="font-semibold text-[#1F2937]">
                Light
              </h3>

            </div>

            <input
              type="radio"
              name="theme"
              value="Light"
              checked={appearance.theme === "Light"}
              onChange={handleChange}
              className="h-5 w-5 accent-[#D4AF37]"
            />

          </label>

          {/* Dark */}

          <label className="flex cursor-pointer items-center justify-between rounded-xl border border-gray-300 p-5 hover:border-[#D4AF37]">

            <div>

              <h3 className="font-semibold text-[#1F2937]">
                Dark
              </h3>

            </div>

            <input
              type="radio"
              name="theme"
              value="Dark"
              checked={appearance.theme === "Dark"}
              onChange={handleChange}
              className="h-5 w-5 accent-[#D4AF37]"
            />

          </label>

          {/* System */}

          <label className="flex cursor-pointer items-center justify-between rounded-xl border border-gray-300 p-5 hover:border-[#D4AF37]">

            <div>

              <h3 className="font-semibold text-[#1F2937]">
                System
              </h3>

            </div>

            <input
              type="radio"
              name="theme"
              value="System"
              checked={appearance.theme === "System"}
              onChange={handleChange}
              className="h-5 w-5 accent-[#D4AF37]"
            />

          </label>

        </div>

      </div>

      {/* Density & Layout */}

      <div className="rounded-2xl bg-white shadow border">

        <div className="border-b p-6">

          <h2 className="text-2xl font-semibold">
            Density & Layout
          </h2>

          <p className="mt-1 text-gray-500">
            Adjust interface density and content display preferences.
          </p>

        </div>

        <div className="p-6 space-y-6">          {/* Sidebar Width */}

          <div>

            <label className="mb-2 block font-medium">
              Sidebar width
            </label>

            <p className="mb-3 text-sm text-gray-500">
              Width of the left navigation panel
            </p>

            <select
              name="sidebarWidth"
              value={appearance.sidebarWidth}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#D4AF37]"
            >
              <option>Default (240px)</option>
              <option>Compact (200px)</option>
              <option>Wide (280px)</option>
            </select>

          </div>

          {/* Table Density */}

          <div>

            <label className="mb-2 block font-medium">
              Table density
            </label>

            <p className="mb-3 text-sm text-gray-500">
              Row height in contract and log tables
            </p>

            <select
              name="tableDensity"
              value={appearance.tableDensity}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#D4AF37]"
            >
              <option>Compact</option>
              <option>Default</option>
              <option>Comfortable</option>
            </select>

          </div>

          {/* Default Page Size */}

          <div>

            <label className="mb-2 block font-medium">
              Default page size
            </label>

            <p className="mb-3 text-sm text-gray-500">
              Number of rows shown per page
            </p>

            <select
              name="pageSize"
              value={appearance.pageSize}
              onChange={handleChange}
              className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#D4AF37]"
            >
              <option>10</option>
              <option>25</option>
              <option>50</option>
              <option>100</option>
            </select>

          </div>

          {/* Sticky Header */}

          <div className="flex items-center justify-between rounded-xl border border-gray-200 p-5">

            <div>

              <h3 className="font-semibold text-[#1F2937]">
                Sticky header
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Keep table headers visible when scrolling
              </p>

            </div>

            <Toggle
              value={appearance.stickyHeader}
              onClick={() => toggle("stickyHeader")}
            />

          </div>

          {/* Show Avatars */}

          <div className="flex items-center justify-between rounded-xl border border-gray-200 p-5">

            <div>

              <h3 className="font-semibold text-[#1F2937]">
                Show avatars in tables
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Display user avatar thumbnails in tables
              </p>

            </div>

            <Toggle
              value={appearance.avatars}
              onClick={() => toggle("avatars")}
            />

          </div>

          {/* Animated Transitions */}

          <div className="flex items-center justify-between rounded-xl border border-gray-200 p-5">

            <div>

              <h3 className="font-semibold text-[#1F2937]">
                Animated transitions
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Enable smooth UI transition animations
              </p>

            </div>

            <Toggle
              value={appearance.animations}
              onClick={() => toggle("animations")}
            />

          </div>

        </div>

      </div>

      {/* Accent Color */}

      <div className="rounded-2xl bg-white shadow border">

        <div className="border-b p-6">

          <h2 className="text-2xl font-semibold">
            Accent Color
          </h2>

          <p className="mt-1 text-gray-500">
            Choose a highlight color for interactive elements.
          </p>

        </div>

        <div className="p-6 grid grid-cols-4 gap-4">          {["Gold", "Blue", "Green", "Purple"].map((color) => (

            <button
              key={color}
              onClick={() =>
                setAppearance({
                  ...appearance,
                  accent: color,
                })
              }
              className={`rounded-xl border-2 p-5 text-center transition ${
                appearance.accent === color
                  ? "border-[#D4AF37] bg-[#FFF8E1]"
                  : "border-gray-300 hover:border-[#D4AF37]"
              }`}
            >

              <div
                className={`mx-auto mb-3 h-10 w-10 rounded-full ${
                  color === "Gold"
                    ? "bg-yellow-500"
                    : color === "Blue"
                    ? "bg-blue-500"
                    : color === "Green"
                    ? "bg-green-500"
                    : "bg-purple-500"
                }`}
              />

              <p className="font-medium text-[#1F2937]">
                {color}
              </p>

            </button>

          ))}

        </div>

      </div>

    </div>
  );
};

export default AppearanceSection;