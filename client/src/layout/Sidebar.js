import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: '/home', label: 'Dashboard', icon: '📊' },
    { path: '/settings', label: 'Settings', icon: '⚙️' }
  ];

  return (
    <aside style={{
      width: '250px',
      background: '#2d3748',
      color: 'white',
      padding: '24px',
      minHeight: '100vh'
    }}>
      <nav>
        {menuItems.map(item => (
          <div
            key={item.path}
            onClick={() => navigate(item.path)}
            style={{
              padding: '12px 16px',
              marginBottom: '8px',
              borderRadius: '6px',
              cursor: 'pointer',
              background: location.pathname === item.path ? '#4a5568' : 'transparent',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
