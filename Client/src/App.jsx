import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout.jsx";

import Dashboard from "./features/admin/pages/Dashboard.jsx";
import Users from "./features/admin/pages/Users.jsx";
import ActivityLogs from "./features/admin/pages/ActivityLogs.jsx";
import Notifications from "./features/admin/pages/Notifications.jsx";
import Settings from "./features/admin/pages/Settings.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />

      <Route
        path="/admin/dashboard"
        element={
          <AdminLayout>
            <Dashboard />
          </AdminLayout>
        }
      />

      <Route
        path="/admin/users"
        element={
          <AdminLayout>
            <Users />
          </AdminLayout>
        }
      />

      <Route
        path="/admin/activity-logs"
        element={
          <AdminLayout>
            <ActivityLogs />
          </AdminLayout>
        }
      />

      <Route
        path="/admin/notifications"
        element={
          <AdminLayout>
            <Notifications />
          </AdminLayout>
        }
      />

      <Route
        path="/admin/settings"
        element={
          <AdminLayout>
            <Settings />
          </AdminLayout>
        }
      />
    </Routes>
  );
}

export default App;