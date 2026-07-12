import { Search, Bell, ChevronDown } from "lucide-react";
import Breadcrumb from "./Breadcrumb";

export default function Navbar({
  breadcrumbItems,
  primaryAction,
  user,
  notificationCount = 0,
  onSearch,
}) {
  const PrimaryIcon = primaryAction?.icon;

  return (
    <header className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-8 py-4">
      <Breadcrumb items={breadcrumbItems} />

      <div className="flex items-center gap-4">
        {primaryAction && (
          <button
            onClick={primaryAction.onClick}
            className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            {PrimaryIcon && <PrimaryIcon size={16} />}
            {primaryAction.label}
          </button>
        )}

        <div className="relative">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => onSearch?.(e.target.value)}
            className="w-56 rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>

        <button className="relative rounded-full p-2 text-slate-500 hover:bg-slate-100">
          <Bell size={20} />
          {notificationCount > 0 && (
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
          )}
        </button>

        <button className="flex items-center gap-2 rounded-lg py-1 pl-1 pr-2 hover:bg-slate-100">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-semibold text-white">
            {user?.initials ?? "SM"}
          </div>
          <span className="text-left text-sm leading-tight">
            <span className="block font-medium text-slate-900">
              {user?.name ?? "Sarah Mitchell"}
            </span>
            <span className="block text-xs text-slate-500">
              {user?.role ?? "Legal Director"}
            </span>
          </span>
          <ChevronDown size={16} className="text-slate-400" />
        </button>
      </div>
    </header>
  );
}