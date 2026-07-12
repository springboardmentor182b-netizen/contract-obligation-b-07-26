import SideBar from "../components/Sidebar/Sidebar";
import TopBar from "../components/Topbar/Topbar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <SideBar />

      {/* Right Section */}
      <div className="flex flex-1 flex-col overflow-hidden">

        {/* Fixed Topbar */}
        <TopBar />

        {/* Only this section scrolls */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-[#FFFDF8] via-[#FFF9ED] to-[#FFF2C9] px-6 py-5">
          <Outlet />
        </main>

      </div>
    </div>
  );
};

export default DashboardLayout;