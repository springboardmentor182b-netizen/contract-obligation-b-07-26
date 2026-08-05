import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    const userStr = localStorage.getItem('user');
    
    if (!token || !userStr) {
      navigate('/login');
      return;
    }

    setUser(JSON.parse(userStr));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (!user) return null;

  return (
    <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ 
        background: 'white', 
        borderRadius: '12px', 
        padding: '40px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '40px'
        }}>
          <div>
            <h1 style={{ fontSize: '32px', marginBottom: '8px', color: '#1a202c' }}>
              Welcome, {user.first_name} {user.last_name}!
            </h1>
            <p style={{ color: '#718096', fontSize: '16px' }}>
              Role: <strong>{user.role}</strong>
            </p>
          </div>
          <button 
            onClick={handleLogout}
            style={{
              background: '#e53e3e',
              color: 'white',
              padding: '12px 24px',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            Logout
          </button>
        </div>

        <div style={{ 
          background: '#f7fafc', 
          padding: '24px', 
          borderRadius: '8px',
          marginBottom: '24px'
        }}>
          <h2 style={{ fontSize: '20px', marginBottom: '16px', color: '#2d3748' }}>
            User Information
          </h2>
          <div style={{ display: 'grid', gap: '12px' }}>
            <div>
              <strong>Email:</strong> {user.email}
            </div>
            <div>
              <strong>Status:</strong> {user.is_active ? 'Active' : 'Inactive'}
            </div>
            <div>
              <strong>Created:</strong> {new Date(user.created_at).toLocaleDateString()}
            </div>
          </div>
        </div>

        <div style={{ 
          background: '#edf2f7', 
          padding: '24px', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h3 style={{ fontSize: '18px', marginBottom: '12px', color: '#2d3748' }}>
            🎉 ContractIQ Dashboard
          </h3>
          <p style={{ color: '#718096', marginBottom: '16px' }}>
            Your authentication system is working perfectly!
          </p>
          <button 
            onClick={() => navigate('/settings')}
            style={{
              background: 'linear-gradient(135deg, #5a67d8 0%, #667eea 100%)',
              color: 'white',
              padding: '12px 24px',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >
            Go to Settings →
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
