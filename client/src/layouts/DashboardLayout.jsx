import Sidebar from "../components/Sidebar/Sidebar";
import Header from "../components/Header/Header";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-slate-100">
      {/* Sidebar */}

      <Sidebar />

      {/* Main */}

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}

        <Header />

        {/* Page Content */}

        <main className="flex-1 overflow-y-auto">
          <div className="px-8 py-8 max-w-[1700px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;