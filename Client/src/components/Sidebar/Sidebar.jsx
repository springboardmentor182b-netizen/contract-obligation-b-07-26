import { NavLink } from "react-router-dom";
import { ShieldCheck, Building2 } from "lucide-react";
import { mainMenu, accountMenu, logoutMenu } from "../../Data/sidebarMenu";

const Sidebar = () => {
  return (
    <aside className="w-70 bg-[#1B1B1B] flex flex-col justify-between shadow-2xl">
      {/* Top */}
      <div>

        {/* Logo */}
        <div className="px-6 py-6 border-t border-[#ECE7DE]">
  <h1 className="text-2xl font-bold text-white">
    ContractIQ
  </h1>

  <p className="mt-1 text-xs uppercase tracking-[0.1em] text-[#9CA3AF]">
    Compliance Platform
  </p>
</div>

        
        

        {/* Main Menu */}
        <div className="px-5">
          <p className="mb-4 mt-4 text-xs uppercase tracking-widest text-[#9CA3AF]">
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

      {/* Bottom */}
      <div className="border-b border-[#fdfdfd] p-4">

        <button className="mb-1 flex w-full items-center gap-3 rounded-xl px-4  text-[#f7f7f7] hover:bg-red-100 hover:text-red-600 transition">
          <logoutMenu.icon size={20} />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;