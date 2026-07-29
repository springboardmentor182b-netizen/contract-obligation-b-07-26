import React from 'react';
import {
  LayoutGrid, FileText, FolderOpen, ClipboardList, RefreshCw,
  ShieldCheck, BarChart2, Bell, Users, Activity, Settings, ShieldHalf,
} from 'lucide-react';

const NAV_ITEMS = [
  { key: 'dashboard', label: 'Dashboard', icon: LayoutGrid, path: '/dashboard' },
  { key: 'contracts', label: 'Contracts', icon: FileText, path: '/contracts' },
  { key: 'repository', label: 'Repository', icon: FolderOpen, path: '/repository' },
  { key: 'obligations', label: 'Obligations', icon: ClipboardList, path: '/obligations', badge: 7 },
  { key: 'renewals', label: 'Renewals', icon: RefreshCw, path: '/renewals' },
  { key: 'compliance', label: 'Compliance', icon: ShieldCheck, path: '/compliance' },
  { key: 'reports', label: 'Reports', icon: BarChart2, path: '/reports' },
  { key: 'notifications', label: 'Notifications', icon: Bell, path: '/notifications', badge: 14 },
  { key: 'users', label: 'Users', icon: Users, path: '/users' },
  { key: 'audit', label: 'Audit & Logs', icon: Activity, path: '/audit' },
  { key: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
];

/**
 * Left navigation sidebar, shared across every authenticated page.
 *
 * NOTE: this fills the previously-empty `components/layout/Sidebar.jsx`
 * placeholder. It assumes react-router-dom for navigation — swap the
 * <button onClick> for <Link to={path}> / useNavigate() if that's what
 * routes.js ends up using.
 *
 * @param {string} active - key of the currently active nav item
 * @param {(key: string) => void} [onNavigate]
 */
export default function Sidebar({ active, onNavigate }) {
  return (
    <aside className="w-64 shrink-0 bg-slate-900 text-slate-300 flex flex-col h-full">
      <div className="flex items-center gap-2 px-5 py-5">
        <span className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
          <ShieldHalf size={18} className="text-white" />
        </span>
        <div>
          <p className="text-white font-semibold text-sm leading-none">ContractIQ</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Enterprise Suite</p>
        </div>
      </div>

      <p className="px-5 text-[10px] tracking-wider text-slate-500 font-medium mt-2 mb-1">MAIN MENU</p>

      <nav className="flex-1 px-2 overflow-y-auto">
        {NAV_ITEMS.map(({ key, label, icon: Icon, badge }) => {
          const isActive = key === active;
          return (
            <button
              key={key}
              onClick={() => onNavigate?.(key)}
              className={`w-full flex items-center justify-between gap-2 px-3 py-2 rounded-lg text-sm mb-0.5 transition ${
                isActive ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-300'
              }`}
            >
              <span className="flex items-center gap-2">
                <Icon size={16} />
                {label}
              </span>
              {badge != null && (
                <span
                  className={`text-[11px] rounded-full px-1.5 leading-5 ${
                    isActive ? 'bg-white/20 text-white' : 'bg-slate-700 text-slate-200'
                  }`}
                >
                  {badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
