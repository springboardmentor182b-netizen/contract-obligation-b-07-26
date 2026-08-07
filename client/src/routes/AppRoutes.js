import { Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import Profile from "../pages/Profile/Profile";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import ContractRepository from "../pages/ContractRepository";
import Home from "../pages/Home";
import Notifications from "../pages/Notifications";
import ComplianceDashboard from "../pages/ComplianceDashboard";
import ObligationTracker from "../pages/ObligationTracker";
import { Auth } from "../features/authentication/Auth";

function ProtectedRoute({ children }) {
  const token = window.localStorage.getItem('contractiq_token')
    || window.sessionStorage.getItem('contractiq_token')
    || window.localStorage.getItem('access_token');
  return token ? children : <Navigate to="/login" replace />;
}

function AppRoutes(){
    return(
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/register" element={<Register />} />
            <Route 
                path="/dashboard" 
                element={
                    <ProtectedRoute>
                        <Dashboard />
                    </ProtectedRoute>
                } 
            />
            <Route 
                path="/repository" 
                element={
                    <ProtectedRoute>
                        <ContractRepository />
                    </ProtectedRoute>
                } 
            />
            <Route 
                path="/notifications" 
                element={
                    <ProtectedRoute>
                        <Notifications />
                    </ProtectedRoute>
                } 
            />
            <Route 
                path="/compliance" 
                element={
                    <ProtectedRoute>
                        <ComplianceDashboard />
                    </ProtectedRoute>
                } 
            />
            <Route 
                path="/compliance-dashboard" 
                element={
                    <ProtectedRoute>
                        <ComplianceDashboard />
                    </ProtectedRoute>
                } 
            />
            <Route 
                path="/obligations" 
                element={
                    <ProtectedRoute>
                        <ObligationTracker />
                    </ProtectedRoute>
                } 
            />
            <Route 
                path="/profile" 
                element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                } 
            />
            <Route 
                path="/reset-password" 
                element={<ResetPassword />} 
            />
            <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
    );
}

export default AppRoutes;
