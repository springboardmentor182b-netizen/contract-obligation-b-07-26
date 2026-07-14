import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import api from "../services/api";

export default function PageLayout({
  breadcrumbItems = [],
  primaryAction,
  notificationCount = 0,
  user,
  onSearch,
  children,
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [navigationCounts, setNavigationCounts] = useState({});

  useEffect(() => {
    api.get("/dashboard").then(({ data }) => setNavigationCounts(data.dashboard?.navigation ?? {
      Contracts: data.contracts?.length ?? 0,
      Obligations: data.pending_obligations ?? 0,
      Renewals: data.upcoming_renewals ?? 0,
      Compliance: data.compliance?.overdue_obligations ?? 0,
      Notifications: data.unread_notifications ?? 0,
    })).catch(() => {});
  }, []);

  return (
    <div className="flex h-screen bg-[#f5f6fa]">
      <Sidebar
        user={user}
        counts={navigationCounts}
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed((collapsed) => !collapsed)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar
          breadcrumbItems={breadcrumbItems}
          primaryAction={primaryAction}
          notificationCount={notificationCount}
          user={user}
          onSearch={onSearch}
        />

        <main className="flex-1 overflow-y-auto px-8 py-6">{children}</main>
      </div>
    </div>
  );
}
