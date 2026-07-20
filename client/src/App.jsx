import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import UserManagement from "./pages/UserManagement";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* User Management is the main implemented page */}
        <Route path="/users" element={<UserManagement />} />

        {/* Redirect root and all unknown paths to /users for now */}
        <Route path="/" element={<Navigate to="/users" replace />} />
        <Route path="*" element={<Navigate to="/users" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;