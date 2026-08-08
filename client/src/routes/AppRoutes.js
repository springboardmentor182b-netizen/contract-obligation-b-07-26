import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Dashboard from "../pages/Dashboard/Dashboard";
import Profile from "../pages/Profile/Profile";
import ResetPassword from "../pages/ResetPassword/ResetPassword";
import Settings from "../pages/Settings/Settings";
import Layout from "../components/Layout/Layout";
import { UserProvider } from "../context/UserContext";

function AppRoutes() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/settings" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/settings"
          element={
            <Layout>
              <Settings />
            </Layout>
          }
        />
        <Route
          path="*"
          element={
            <Layout>
              <div style={{ padding: '40px', textAlign: 'center' }}>
                <h2>Page Not Found</h2>
                <p>Navigate to Settings to see the active module.</p>
              </div>
            </Layout>
          }
        />
      </Routes>
    </UserProvider>
  );
}

export default AppRoutes;
