import { NavLink } from "react-router-dom";
import { ShieldCheck, Building2 } from "lucide-react";
import { mainMenu, accountMenu, logoutMenu } from "../../Data/sidebarMenu";

const Sidebar = () => {
  return (
    <aside className="w-64 min-w-[256px] flex-shrink-0 bg-[#1B1B1B] flex flex-col justify-between shadow-2xl min-h-screen border-r border-[#262626]">
      {/* Top Header & Navigation */}
      <div>
        {/* Logo Section */}
        <div className="px-6 py-6 border-b border-[#262626]">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D4AF37] text-[#1F2937] font-extrabold">
              <ShieldCheck size={22} />
            </span>
            <div>
              <h1 className="text-lg font-extrabold leading-tight text-white tracking-tight">
                ContractIQ
              </h1>
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#9CA3AF]">
                Compliance Platform
              </p>
            </div>
          </div>

          {/* Workspace Switcher */}
          <div className="mt-5 flex items-center gap-3 rounded-xl bg-[#262626] px-4 py-3 border border-[#333333]">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#D4AF37]/20 text-[#D4AF37]">
              <Building2 size={18} />
            </span>
            <div>
              <p className="text-sm font-bold leading-tight text-white">
                Nexora Group
              </p>
              <p className="text-xs font-semibold text-[#9CA3AF]">
                Enterprise &middot; 214 contracts
              </p>
            </div>
          </div>
        </div>

        {/* Main Menu Section */}
        <div className="px-4 mt-6">
          <p className="mb-3 px-3 text-xs font-extrabold uppercase tracking-widest text-[#9CA3AF]">
            Main Menu
          </p>

          <div className="flex flex-col gap-2.5">
            {mainMenu.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-bold tracking-wide transition-all ${
                    isActive
                      ? "bg-[#D4AF37] text-[#1F2937] shadow-md"
                      : "text-white hover:bg-[#262626] hover:text-white"
                  }`
                }
              >
                <item.icon size={20} />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </div>
        </div>

        {/* Account Section */}
        <div className="mt-8 px-4">
          <p className="mb-3 px-3 text-xs font-extrabold uppercase tracking-widest text-[#9CA3AF]">
            Account
          </p>

          <div className="flex flex-col gap-2.5">
            {accountMenu.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-bold tracking-wide transition-all ${
                    isActive
                      ? "bg-[#D4AF37] text-[#1F2937] shadow-md"
                      : "text-white hover:bg-[#262626] hover:text-white"
                  }`
                }
              >
                <item.icon size={20} />
                <span>{item.name}</span>
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {/* Logout Footer */}
      <div className="p-4 border-t border-[#262626]">
        <button className="flex w-full items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-extrabold text-rose-400 hover:bg-rose-500/10 transition">
          <logoutMenu.icon size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;