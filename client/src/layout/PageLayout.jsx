import { useState } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

export default function PageLayout({
  breadcrumbItems = [],
  primaryAction,
  notificationCount = 0,
  user,
  onSearch,
  children,
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-[#f5f6fa]">
      <Sidebar
        user={user}
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
