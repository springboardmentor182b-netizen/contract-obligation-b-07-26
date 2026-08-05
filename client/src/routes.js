import Notification_Screen from "./Notification_Screen";
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ForgotPassword from './pages/ForgotPassword';
import Settings from './pages/Settings';
import Reports from './pages/Reports';
import Users from './pages/Users';
import ComplianceMonitoring from './ComplianceMonitoring';
import ProtectedRoute from './components/common/ProtectedRoute';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      
      {/* Protected Routes */}
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
      
      <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
      <Route path="/users" element={<ProtectedRoute><Users /></ProtectedRoute>} />

      <Route
  path="/notification"
  element={
    <ProtectedRoute>
      <Notification_Screen />
    </ProtectedRoute>
  }
/>
      
      {/* Here is your correctly configured Compliance route! */}
      <Route path="/compliance" element={<ProtectedRoute><ComplianceMonitoring /></ProtectedRoute>} />
    </Routes>
  );
}