import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
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
          marginBottom: '40px',
          paddingBottom: '24px',
          borderBottom: '1px solid #e2e8f0'
        }}>
          <div>
            <h1 style={{ fontSize: '32px', marginBottom: '8px', color: '#1a202c' }}>
              Settings
            </h1>
            <p style={{ color: '#718096', fontSize: '14px' }}>
              Manage your account settings and preferences
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button 
              onClick={() => navigate('/home')}
              style={{
                background: '#edf2f7',
                color: '#2d3748',
                padding: '12px 24px',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              ← Back to Home
            </button>
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
        </div>

        <div style={{ display: 'grid', gap: '24px' }}>
          {/* Account Information */}
          <div style={{ 
            background: '#f7fafc', 
            padding: '24px', 
            borderRadius: '8px'
          }}>
            <h2 style={{ fontSize: '20px', marginBottom: '16px', color: '#2d3748' }}>
              Account Information
            </h2>
            <div style={{ display: 'grid', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '12px' }}>
                <strong>Name:</strong>
                <span>{user.first_name} {user.last_name}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '12px' }}>
                <strong>Email:</strong>
                <span>{user.email}</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '12px' }}>
                <strong>Role:</strong>
                <span style={{ 
                  background: '#5a67d8', 
                  color: 'white', 
                  padding: '4px 12px', 
                  borderRadius: '12px',
                  display: 'inline-block',
                  fontSize: '14px'
                }}>
                  {user.role}
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '12px' }}>
                <strong>Status:</strong>
                <span style={{ color: user.is_active ? '#48bb78' : '#e53e3e' }}>
                  {user.is_active ? '✓ Active' : '✗ Inactive'}
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', gap: '12px' }}>
                <strong>Member Since:</strong>
                <span>{new Date(user.created_at).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}</span>
              </div>
            </div>
          </div>

          {/* Security Section */}
          <div style={{ 
            background: '#fff5f5', 
            padding: '24px', 
            borderRadius: '8px',
            border: '1px solid #feb2b2'
          }}>
            <h2 style={{ fontSize: '20px', marginBottom: '16px', color: '#c53030' }}>
              🔒 Security
            </h2>
            <p style={{ color: '#718096', marginBottom: '16px' }}>
              Keep your account secure by using a strong password and enabling two-factor authentication.
            </p>
            <button 
              style={{
                background: '#e53e3e',
                color: 'white',
                padding: '10px 20px',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600'
              }}
            >
              Change Password
            </button>
          </div>

          {/* Preferences Section */}
          <div style={{ 
            background: '#f7fafc', 
            padding: '24px', 
            borderRadius: '8px'
          }}>
            <h2 style={{ fontSize: '20px', marginBottom: '16px', color: '#2d3748' }}>
              Preferences
            </h2>
            <div style={{ display: 'grid', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong>Email Notifications</strong>
                  <p style={{ color: '#718096', fontSize: '14px', marginTop: '4px' }}>
                    Receive email updates about your contracts
                  </p>
                </div>
                <input type="checkbox" defaultChecked style={{ width: '20px', height: '20px' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <strong>Push Notifications</strong>
                  <p style={{ color: '#718096', fontSize: '14px', marginTop: '4px' }}>
                    Get notified about important updates
                  </p>
                </div>
                <input type="checkbox" style={{ width: '20px', height: '20px' }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
