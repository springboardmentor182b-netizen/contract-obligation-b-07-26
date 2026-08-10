import {
  Search,
  List,
  LayoutGrid,
} from "lucide-react";

import { useUsers } from "../../../context/UsersContext";

const UserFilters = () => {
  const {
    search,
    setSearch,

    department,
    setDepartment,

    status,
    setStatus,

    view,
    setView,

    filteredUsers,
  } = useUsers();

  const departments = [
    "All",
    "Legal",
    "Finance",
    "HR",
    "IT",
    "Operations",
    "Procurement",
    "Sales",
    "Marketing",
  ];

  const statuses = [
    "All",
    "Active",
    "Pending",
    "Inactive",
    "Suspended",
  ];

  return (
    <div className="mb-6 flex items-center justify-between gap-4">

      {/* Left Side */}
      <div className="flex items-center gap-3">

        {/* Search */}

        <div className="relative">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-11 w-64 rounded-xl border border-gray-200 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-[#F5A000]"
          />
        </div>

        {/* Department */}

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none"
        >
          {departments.map((dept) => (
            <option
              key={dept}
              value={dept}
            >
              {dept}
            </option>
          ))}
        </select>

        {/* Status */}

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="h-11 rounded-xl border border-gray-200 bg-white px-4 text-sm outline-none"
        >
          {statuses.map((item) => (
            <option
              key={item}
              value={item}
            >
              {item}
            </option>
          ))}
        </select>

      </div>

      {/* Right Side */}

      <div className="flex items-center gap-3">

        <div className="flex overflow-hidden rounded-xl border border-gray-200">

          <button
            onClick={() => setView("table")}
            className={`p-2 ${
              view === "table"
                ? "bg-[#F5A000] text-white"
                : "bg-white text-gray-500"
            }`}
          >
            <List size={18} />
          </button>

          <button
            onClick={() => setView("grid")}
            className={`p-2 ${
              view === "grid"
                ? "bg-[#F5A000] text-white"
                : "bg-white text-gray-500"
            }`}
          >
            <LayoutGrid size={18} />
          </button>

        </div>

        <span className="text-sm text-gray-500">
          {filteredUsers.length} users
        </span>

      </div>

    </div>
  );
};

export default UserFilters;