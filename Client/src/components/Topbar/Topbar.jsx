import { Search, Bell, Plus } from "lucide-react";

const TopBar = () => {
  return (
    <header className="h-20 bg-[#FFFDF8] border-b border-[#ECE7DE] px-8 flex items-center justify-between">

      {/* Left */}
      <div className="flex items-center gap-6">

        {/* Search */}
        <div className="flex items-center gap-3 bg-white border border-[#ECE7DE] rounded-full px-5 py-3 w-[500px] shadow-sm">

          <Search size={18} className="text-gray-400" />

          <input
            type="text"
            placeholder="Search contracts, obligations, parties..."
            className="flex-1 bg-transparent outline-none text-sm placeholder:text-gray-400"
          />

        </div>

      </div>

      {/* Right */}
      <div className="flex items-center gap-6">

        <p className="text-sm text-gray-500">
          Thursday, July 10, 2026
        </p>

        <button className="flex items-center gap-2 rounded-full bg-[#D4AF37] px-6 py-3 font-medium text-[#1F2937] hover:brightness-105 transition">
          <Plus size={18} />
          New Contract
        </button>

        <button className="relative h-11 w-11 rounded-full bg-white border border-[#ECE7DE] flex items-center justify-center shadow-sm">
          <Bell size={18} />
          <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        <div className="flex items-center gap-3">

          <div className="h-11 w-11 rounded-full bg-[#D4AF37] flex items-center justify-center font-bold text-[#1F2937]">
            JD
          </div>

          <div>

            <h4 className="font-semibold text-[#1F2937]">
              Jennifer Davis
            </h4>

            <p className="text-xs text-gray-500">
              CCO &middot; Nexora Group
            </p>

          </div>

        </div>

      </div>

    </header>
  );
};

export default TopBar;