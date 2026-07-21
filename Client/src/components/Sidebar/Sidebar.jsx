import { NavLink } from "react-router-dom";
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

          {mainMenu.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `mb-1 flex items-center gap-3 rounded-xl px-3 py-2 transition ${
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
        <div className="mt-6 px-5">
          <p className="mb-1 text-xs uppercase tracking-widest text-[#9CA3AF]">
            Account
          </p>

          {accountMenu.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `mb-1 flex items-center gap-3 rounded-xl px-3 py-2 transition ${
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
      <div className="border-b border-[#fdfdfd] p-4">

        <button className="mb-1 flex w-full items-center gap-3 rounded-xl px-4  text-[#f7f7f7] hover:bg-red-100 hover:text-red-600 transition">
          <logoutMenu.icon size={20} />
          Logout
        </button>

        {/* <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D4AF37] font-bold text-[#f8f8f8]">
            JD
          </div>

          <div>
            <h4 className="font-semibold text-[#ECE7DE]">
              Jennifer Davis
            </h4>

            <p className="text-sm text-[#6B7280]">
              Chief Compliance Officer
            </p>
          </div>

        </div> */}

      </div>

    </aside>
  );
};

export default Sidebar;