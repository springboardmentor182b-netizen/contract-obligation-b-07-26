import React, { useState } from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ObligationTracker from "./pages/ObligationTracker";
import ForgotPassword from './pages/ForgotPassword';
import Settings from './pages/Settings';
import Contracts from './pages/ContractsManagement';
import Repository from './pages/ContractsRepository';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Sidebar from './components/layout/Sidebar';

const RootLayout = () => {
  // State to manage mobile sidebar visibility
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="dashboard-layout">
      {/* Dark overlay when sidebar is open on mobile */}
      {isSidebarOpen && (
        <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>
      )}

      {/* Sidebar gets an 'open' class conditionally */}
      <div className={`sidebar-wrapper ${isSidebarOpen ? 'open' : ''}`}>
        <Sidebar onClose={() => setIsSidebarOpen(false)} />
      </div>

      <div className="main-wrapper">
        {/* Pass the toggle function to the Navbar */}
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main style={{ flex: 1, padding: '0px', background: '#f8fafc' }}>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'dashboard', element: <Dashboard /> },
      { path: "obligation-tracker", element: <ObligationTracker /> },
      { path: 'contracts/management', element: <Contracts /> },
      { path: 'contracts/repository', element: <Repository /> },
      { path: 'settings', element: <Settings /> },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
  { path: '/forgot-password', element: <ForgotPassword /> },
]);

export default router;