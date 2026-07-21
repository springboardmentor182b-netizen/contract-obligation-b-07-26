import { useState } from "react";

export default function ComplianceTabs({ tabs }) {
  const [active, setActive] = useState(tabs[0]);

  return (
    <div className="flex gap-6 overflow-x-auto border-b border-[#ECE7DE] pb-3">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActive(tab)}
          className={`whitespace-nowrap pb-2 text-sm font-medium transition-colors ${
            active === tab
              ? "border-b-2 border-[#D4AF37] text-[#1F2937]"
              : "text-[#98A2B3] hover:text-[#6B7280]"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
