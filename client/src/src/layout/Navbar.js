import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAnalytics } from '../components/context/AnalyticsContext';
import Dropdown from '../components/Buttons/Dropdown';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAnalytics();
  const navigate = useNavigate();

  const userOptions = [
    { label: 'Profile', value: 'profile' },
    { label: 'Settings', value: 'settings' },
    { label: 'Logout', value: 'logout' }
  ];

  const handleUserMenuSelect = (option) => {
    if (option.value === 'logout') {
      logout();
      navigate('/login');
    } else if (option.value === 'settings') {
      navigate('/settings');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          ContractIQ
        </Link>
        
        <div className="navbar-menu">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/contracts" className="navbar-link">Contracts</Link>
          <Link to="/obligations" className="navbar-link">Obligations</Link>
          <Link to="/reports" className="navbar-link">Reports</Link>
        </div>
        
        <div className="navbar-user">
          <span className="user-role">{user?.role}</span>
          <Dropdown 
            label={`${user?.first_name || 'User'}`} 
            options={userOptions}
            onSelect={handleUserMenuSelect}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
