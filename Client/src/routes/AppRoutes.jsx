import { Routes, Route } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

import Dashboard from "../pages/Dashboard";
import ContractRepository from "../pages/ContractRepository";
import ContractManagement from "../pages/ContractManagement";
import ObligationTracking from "../pages/ObligationTracking";
import RenewalManagement from "../pages/RenewalManagement";
import ComplianceMonitoring from "../pages/ComplianceMonitoring";
import ReportsExport from "../pages/ReportsExport";
import AuditLogs from "../pages/AuditLogs";
import Notifications from "../pages/Notifications";
import UserManagement from "../pages/UserManagement";
import Settings from "../pages/Settings";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/repository" element={<ContractRepository />} />
        <Route path="/management" element={<ContractManagement />} />
        <Route path="/tracking" element={<ObligationTracking />} />
        <Route path="/renewals" element={<RenewalManagement />} />
        <Route path="/compliance" element={<ComplianceMonitoring />} />
        <Route path="/reports" element={<ReportsExport />} />
        <Route path="/audit" element={<AuditLogs />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/users" element={<UserManagement />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;