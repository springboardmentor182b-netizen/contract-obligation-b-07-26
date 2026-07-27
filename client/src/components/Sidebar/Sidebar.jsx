import SidebarItem from "./SidebarItem";
import sidebarData from "./sidebarData";
import { FaShieldAlt, FaSignOutAlt } from "react-icons/fa";
import { HiX } from "react-icons/hi";

/**
 * Sidebar component.
 * Props:
 *   mobileOpen  – boolean, whether the mobile drawer is open
 *   onClose     – callback to close mobile drawer
 */
const Sidebar = ({ mobileOpen = false, onClose }) => {
  return (
    <>
      {/* ── Mobile overlay ─────────────────────────────────── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* ── Sidebar panel ──────────────────────────────────── */}
      <aside
        className={`
          fixed top-0 left-0 z-50 flex h-screen w-64 flex-col bg-slate-900 text-slate-300
          transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          lg:relative lg:translate-x-0 lg:z-auto
        `}
      >
        {/* Logo */}
        <div className="flex items-center justify-between border-b border-slate-800 p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg shadow-blue-600/30">
              <FaShieldAlt className="text-white" size={18} />
            </div>

            <div>
              <h1 className="text-base font-bold text-white">ContractIQ</h1>
              <p className="text-xs text-slate-500">Enterprise Suite</p>
            </div>
          </div>

          {/* Close button – mobile only */}
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white lg:hidden"
          >
            <HiX size={18} />
          </button>
        </div>

        {/* Menu section label */}
        <div className="px-5 pt-5 pb-2">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-600">
            Main Menu
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 pb-4">
          {sidebarData.map((item) => (
            <SidebarItem
              key={item.title}
              title={item.title}
              icon={item.icon}
              badge={item.badge}
              to={item.to}
            />
          ))}
        </nav>

        {/* Bottom – user profile + logout */}
        <div className="border-t border-slate-800 p-4">
          <div className="flex items-center gap-3">
            <img
              src="https://i.pravatar.cc/100?img=15"
              alt="Profile"
              className="h-10 w-10 rounded-full ring-2 ring-slate-700"
            />

            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-semibold text-white">
                Alexandra Thornton
              </h3>
              <p className="text-xs text-slate-500">System Admin</p>
            </div>

            <button
              title="Sign out"
              className="rounded-lg p-2 text-slate-500 hover:bg-slate-800 hover:text-red-400 transition-colors"
            >
              <FaSignOutAlt size={15} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;