import React from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import AppRoutes from './routes';
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar'; 
import { AuthProvider } from './features/authentication/authContext';

function LayoutWrapper() {
  const location = useLocation();
  const isAuthPage = ['/login', '/register', '/forgot-password', '/'].includes(location.pathname);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', margin: 0, padding: 0 }}>
      {!isAuthPage && <Sidebar />}
      
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        
        {!isAuthPage && <Navbar />}

        <main style={{ flex: 1, overflowY: 'auto' }}>
          <AppRoutes />
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <LayoutWrapper />
      </BrowserRouter>
    </AuthProvider>
  );
}