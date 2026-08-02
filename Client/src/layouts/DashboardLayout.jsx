import SideBar from "../components/Sidebar/Sidebar";
import TopBar from "../components/Topbar/Topbar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-[#FFFDF8] via-[#FFF9ED] to-[#FFF2C9]">
      <SideBar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar />

        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto w-full max-w-7xl rounded-3xl bg-white border border-gray-200 shadow-lg p-8 min-h-full">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;