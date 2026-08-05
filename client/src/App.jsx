import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Settings from './pages/Settings/Settings';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Navigate to="/settings" replace />} />
        <Route path="/settings" element={
          <Layout>
            <Settings />
          </Layout>
        } />
        <Route path="*" element={
          <Layout>
            <div style={{ padding: '40px', textAlign: 'center' }}>
              <h2>Page Not Found</h2>
              <p>Navigate to Settings to see the active module.</p>
            </div>
          </Layout>
        } />
      </Routes>
    </UserProvider>
  );
}

export default App;

