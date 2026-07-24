import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserManagement from "./pages/UserManagement";
import ComplianceMonitoring from "./ComplianceMonitoring";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Management Page */}
        <Route path="/users" element={<UserManagement />} />

        {/* Compliance Monitoring Page */}
        <Route path="/compliance" element={<ComplianceMonitoring />} />

        {/* Default Route */}
        <Route path="/" element={<Navigate to="/users" replace />} />

        {/* Unknown Routes */}
        <Route path="*" element={<Navigate to="/users" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;