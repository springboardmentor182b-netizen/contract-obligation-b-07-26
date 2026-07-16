import { NavLink } from "react-router-dom";
import { mainMenu, accountMenu, logoutMenu } from "../../data/sidebarMenu";

const Sidebar = () => {
  return (
    <aside className="w-75 bg-[#1B1B1B] flex flex-col justify-between shadow-2xl">
      {/* Top */}
      <div>

        {/* Logo */}
        <div className="px-8 py-8 border-b border-[#374151]">
  <h1 className="text-3xl font-bold text-white">
    ContractIQ
  </h1>

  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-[#9CA3AF]">
    Compliance Platform
  </p>
</div>

        
        

        {/* Main Menu */}
        <div className="px-5">
          <p className="mb-3 mt-3 text-xs uppercase tracking-widest text-[#9CA3AF]">
            Main Menu
          </p>

          {mainMenu.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `mb-2 flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                  isActive
                    ? "bg-[#D4AF37] text-[#1F2937] font-semibold"
                    : "text-[#6B7280] hover:bg-[#bea85f]"
                }`
              }
            >
              <item.icon size={20} />
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Account */}
        <div className="mt-8 px-5">
          <p className="mb-3 text-xs uppercase tracking-widest text-[#9CA3AF]">
            Account
          </p>

          {accountMenu.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `mb-2 flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                  isActive
                    ? "bg-[#D4AF37] text-[#1F2937] font-semibold"
                    : "text-[#6B7280] hover:bg-[#bea85f]"
                }`
              }
            >
              <item.icon size={20} />
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-[#ECE7DE] p-5">

        <button className="mb-6 flex w-full items-center gap-3 rounded-xl px-4 py-3 text-[#6B7280] hover:bg-red-100 hover:text-red-600 transition">
          <logoutMenu.icon size={20} />
          Logout
        </button>

        <div className="flex items-center gap-3">

          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#D4AF37] font-bold text-[#1F2937]">
            JD
          </div>

          <div>
            <h4 className="font-semibold text-[#1F2937]">
              Jennifer Davis
            </h4>

            <p className="text-sm text-[#6B7280]">
              Chief Compliance Officer
            </p>
          </div>

        </div>

      </div>

    </aside>
  );
};

export default Sidebar;