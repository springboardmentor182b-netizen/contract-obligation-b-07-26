import SidebarItem from "./SidebarItem";
import sidebarData from "./sidebarData";
import { FaShieldAlt } from "react-icons/fa";

const Sidebar = () => {
  return (
    <aside className="flex h-screen w-64 flex-col bg-slate-900 text-slate-300">
      {/* Logo */}
      <div className="border-b border-slate-800 p-6">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600">
            <FaShieldAlt className="text-xl text-white" />
          </div>

          <div>
            <h1 className="text-lg font-bold text-white">
              ContractIQ
            </h1>

            <p className="text-sm text-slate-400">
              Enterprise Suite
            </p>
          </div>
        </div>
      </div>

      {/* Menu Title */}
      <div className="px-6 pt-6 pb-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          Main Menu
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 px-3">
        {sidebarData.map((item) => (
          <SidebarItem
            key={item.title}
            title={item.title}
            icon={item.icon}
            active={item.title === "Users"}
            badge={item.badge}
          />
        ))}
      </nav>

      {/* Bottom Profile */}
      <div className="border-t border-slate-800 p-5">
        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/100?img=15"
            alt="Profile"
            className="h-12 w-12 rounded-full"
          />

          <div>
            <h3 className="font-semibold text-white">
              Alexandra Thornton
            </h3>

            <p className="text-sm text-slate-400">
              System Admin
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;