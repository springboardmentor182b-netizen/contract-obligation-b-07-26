import { NavLink } from "react-router-dom";

/**
 * SidebarItem – uses React Router NavLink for active state detection.
 * The active class is applied automatically when the route matches.
 */
const SidebarItem = ({ icon: Icon, title, badge, to }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex w-full items-center justify-between rounded-xl px-4 py-3 transition-all duration-200 ${
          isActive
            ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
            : "text-slate-400 hover:bg-slate-800/80 hover:text-white"
        }`
      }
    >
      <div className="flex items-center gap-3">
        <Icon size={17} />
        <span className="text-sm font-medium">{title}</span>
      </div>

      {badge !== undefined && badge > 0 && (
        <span className="rounded-full bg-blue-500/20 px-2 py-0.5 text-xs font-semibold text-blue-300 ring-1 ring-blue-500/30">
          {badge}
        </span>
      )}
    </NavLink>
  );
};

export default SidebarItem;