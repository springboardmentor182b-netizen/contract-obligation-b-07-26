import React from "react";
import {
  ShieldCheck,
  LayoutGrid,
  FileText,
  AlertTriangle,
  Users,
  Settings,
  Bell,
  LogOut,
  UserCheck,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const NAV_ITEMS = [
  { label: "Overview", path: "/", icon: LayoutGrid },
  { label: "Contract Repository", path: "/contracts", icon: FileText },
  { label: "Obligation Tracking", path: "/obligations", icon: AlertTriangle },
  { label: "Compliance Monitoring", path: "/compliance-monitoring", icon: ShieldCheck },
  { label: "Vendors", path: "/vendors", icon: Users },
  { label: "Settings", path: "/settings", icon: Settings },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="hidden lg:flex lg:w-64 shrink-0 flex-col border-r border-border bg-surface min-h-screen justify-between p-4">
      <div>
        {/* Header / Logo */}
        <div className="flex items-center gap-3 px-3 py-4 border-b border-border mb-4">
          <ShieldCheck className="h-7 w-7 text-brand" strokeWidth={2} />
          <div>
            <h2 className="font-display text-base font-bold tracking-tight text-ink">
              ContractIQ
            </h2>
            <p className="text-xs text-ink-faint">Compliance Platform</p>
          </div>
        </div>

        {/* Company Card */}
        <div className="mx-2 mb-6 p-3 rounded-lg bg-bg border border-border">
          <h3 className="text-sm font-semibold text-ink">Nexora Group</h3>
          <span className="text-xs text-ink-soft">234 Active Contracts</span>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1">
          <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-ink-faint">
            Main Menu
          </span>
          {NAV_ITEMS.map(({ label, path, icon: Icon }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={label}
                to={path}
                className={`focus-ring flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${
                  isActive
                    ? "bg-brand text-white font-medium"
                    : "text-ink-soft hover:bg-bg hover:text-ink"
                }`}
              >
                <Icon className="h-4 w-4" strokeWidth={2} />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Footer / Profile */}
      <div className="border-t border-border pt-4 space-y-3">
        <div className="flex items-center justify-between px-3 py-2 rounded-md hover:bg-bg cursor-pointer">
          <div className="flex items-center gap-3">
            <UserCheck className="h-8 w-8 text-brand bg-brand-light p-1.5 rounded-full" />
            <div>
              <p className="text-xs font-semibold text-ink">Jennifer Davis</p>
              <p className="text-[11px] text-ink-faint">Chief Compliance Officer</p>
            </div>
          </div>
        </div>

        <p className="font-mono text-[10px] text-ink-faint text-center">
          Audit sync: Jul 14, 2026
        </p>
      </div>
    </aside>
  );
}