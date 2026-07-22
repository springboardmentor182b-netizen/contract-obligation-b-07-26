import React from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import AppRoutes from './routes';
import Sidebar from './components/layout/Sidebar';
import { AuthProvider } from './features/authentication/authContext';

function LayoutWrapper() {
  const location = useLocation();
  const isAuthPage = ['/login', '/register', '/forgot-password', '/'].includes(location.pathname);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#fafafa', margin: 0, padding: 0 }}>
      {!isAuthPage && <Sidebar />}
      
      <main style={{ flex: 1, overflowY: 'auto', display: 'flex' }}>
        <AppRoutes />
      </main>
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