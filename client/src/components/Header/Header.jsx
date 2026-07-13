import { FaChevronRight, FaSearch } from "react-icons/fa";

const Header = () => {
  return (
    <header className="h-20 bg-white border-b border-gray-200 px-8 flex items-center justify-between">
      {/* Left */}
      <div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>ContractIQ</span>

          <FaChevronRight className="text-xs" />

          <span>Administration</span>

          <FaChevronRight className="text-xs" />

          <span className="font-semibold text-gray-800">
            User Management
          </span>
        </div>
      </div>

      {/* Right */}
      <div className="relative">
        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

        <input
          type="text"
          placeholder="Search..."
          className="w-72 rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 outline-none focus:border-blue-500"
        />
      </div>
    </header>
  );
};

export default Header;