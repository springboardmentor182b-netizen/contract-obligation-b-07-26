import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  FaSearch,
  FaBell,
  FaChevronRight,
  FaBars,
} from "react-icons/fa";

/** Map pathname → breadcrumb label */
const ROUTE_LABELS = {
  "/": "Dashboard",
  "/contracts": "Contracts",
  "/repository": "Repository",
  "/obligations": "Obligations",
  "/renewals": "Renewals",
  "/compliance": "Compliance",
  "/reports": "Reports",
  "/notifications": "Notifications",
  "/users": "User Management",
  "/audit-logs": "Audit Logs",
  "/settings": "Settings",
};

/**
 * Header component.
 * Props:
 *   onMenuClick – callback to open mobile sidebar drawer
 */
const Header = ({ onMenuClick }) => {
  const location = useLocation();
  const pageLabel = ROUTE_LABELS[location.pathname] ?? "ContractIQ";
  const [search, setSearch] = useState("");

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white/95 px-6 backdrop-blur-sm">
      {/* ── Left ───────────────────────────────────────── */}
      <div className="flex items-center gap-4">
        {/* Hamburger – mobile only */}
        <button
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
        >
          <FaBars size={18} />
        </button>

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-sm">
          <span className="text-slate-400">ContractIQ</span>
          <FaChevronRight className="text-xs text-slate-300" />
          <span className="text-slate-400">Administration</span>
          <FaChevronRight className="text-xs text-slate-300" />
          <span className="font-semibold text-slate-800">{pageLabel}</span>
        </nav>
      </div>

      {/* ── Right ──────────────────────────────────────── */}
      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden sm:block">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={13} />
          <input
            type="text"
            placeholder="Quick search…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-56 rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-4 text-sm outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
          />
        </div>

        {/* Notification bell */}
        <button className="relative rounded-xl border border-slate-200 p-2.5 text-slate-500 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 transition-all">
          <FaBell size={16} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>

        {/* User avatar */}
        <button className="flex items-center gap-2.5 rounded-xl border border-slate-200 py-1.5 pl-1.5 pr-3 hover:border-blue-300 hover:bg-blue-50 transition-all">
          <img
            src="https://i.pravatar.cc/100?img=15"
            alt="User"
            className="h-7 w-7 rounded-lg"
          />
          <span className="hidden text-sm font-medium text-slate-700 md:block">
            Alexandra
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;