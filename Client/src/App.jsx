import { BrowserRouter, Routes, Route } from "react-router-dom";

import Loading from "./pages/Loading";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import ComplianceDashboard from "./pages/ComplianceDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Authentication */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/loading" element={<Loading />} />

        {/* Dashboards */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/compliance" element={<ComplianceDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;