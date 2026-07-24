import SideBar from "../components/Sidebar/Sidebar";
import TopBar from "../components/Topbar/Topbar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#FFFDF8] via-[#FFF9ED] to-[#FFF2C9]">
      <SideBar />

      <div className="flex flex-1 flex-col">
        <TopBar />

        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-[#FFFDF8] via-[#FFF9ED] to-[#FFF2C9] p-8">
          <div className="mx-auto w-full max-w-[1600px] min-h-full rounded-[32px] bg-white border border-[#F1E8D6] shadow-xl p-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;