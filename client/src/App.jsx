<<<<<<< HEAD
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
=======
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './routes';

function App() {
  return <RouterProvider router={router} />;
>>>>>>> origin/main-group-B
}

export default App;