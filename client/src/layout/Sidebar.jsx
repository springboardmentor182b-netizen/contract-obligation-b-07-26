import { NavLink } from 'react-router-dom';
import {
  Archive,
  Bell,
  ClipboardCheck,
  FileBarChart,
  FileText,
  LayoutDashboard,
  PanelLeftClose,
  PanelLeftOpen,
  RefreshCw,
  ScrollText,
  Settings,
  ShieldCheck,
  Users,
  FileCheck2,
} from 'lucide-react';

const Sidebar = ({ collapsed, counts = {}, onToggle }) => {
  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Contracts', path: '/contracts', icon: FileText },
    { name: 'Repository', path: '/repository', icon: Archive },
    { name: 'Obligations', path: '/obligations', icon: ClipboardCheck },
    { name: 'Renewals', path: '/renewals', icon: RefreshCw },
    { name: 'Compliance', path: '/compliance', icon: ShieldCheck },
    { name: 'Reports', path: '/reports', icon: FileBarChart },
    { name: 'Notifications', path: '/notifications', icon: Bell },
    { name: 'Audit Logs', path: '/audit-logs', icon: ScrollText },
    { name: 'Users', path: '/users', icon: Users },
    { name: 'Settings', path: '/settings', icon: Settings },
  ];

  return (
    <aside className={`flex h-screen shrink-0 flex-col bg-slate-900 text-white transition-[width] duration-200 ${collapsed ? 'w-20' : 'w-64'}`}>
      <div className={`flex h-[73px] items-center border-b border-slate-700 ${collapsed ? 'justify-center' : 'justify-between px-5'}`}>
        <div className="flex items-center gap-3 overflow-hidden">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-600 shadow-sm">
            <FileCheck2 size={20} />
          </span>
          {!collapsed && <span className="whitespace-nowrap text-xl font-bold tracking-tight">ContractIQ</span>}
        </div>
        {!collapsed && <button onClick={onToggle} title="Minimize navigation" aria-label="Minimize navigation" className="rounded-md p-2 text-slate-300 hover:bg-slate-800 hover:text-white"><PanelLeftClose size={19} /></button>}
      </div>
      <nav className="mt-4 flex-1 overflow-y-auto">
        {collapsed && <button onClick={onToggle} title="Expand navigation" aria-label="Expand navigation" className="mx-auto mb-2 flex rounded-md p-2 text-slate-300 hover:bg-slate-800 hover:text-white"><PanelLeftOpen size={19} /></button>}
        {menuItems.map((item) => {
          const Icon = item.icon;
          return <NavLink
            key={item.name}
            to={item.path}
            title={collapsed ? item.name : undefined}
            className={({ isActive }) =>
              `mx-2 flex items-center rounded-lg py-3 text-sm font-medium hover:bg-slate-800 ${collapsed ? 'justify-center px-3' : 'gap-3 px-4'} ${isActive ? 'bg-blue-600' : ''}`
            }
          >
            <Icon size={18} strokeWidth={1.8} />
            {!collapsed && <><span className="flex-1">{item.name}</span>{counts[item.name] > 0 && <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-slate-700 px-1.5 text-xs text-slate-200">{counts[item.name]}</span>}</>}
          </NavLink>
        })}
      </nav>
      <div className={`border-t border-slate-800 p-4 ${collapsed ? "hidden" : "block"}`}>
        <div className="flex items-center gap-3"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-bold">SM</span><div className="min-w-0"><p className="truncate text-sm font-semibold">Sarah Mitchell</p><p className="text-xs text-slate-400">Legal Director</p></div></div>
        <button onClick={onToggle} className="mt-4 flex items-center gap-2 text-sm text-slate-400 hover:text-white"><PanelLeftClose size={15} /> Collapse</button>
      </div>
    </aside>
  );
};

export default Sidebar;
