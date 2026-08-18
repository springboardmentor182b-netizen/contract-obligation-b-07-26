import React from 'react';
import { FiSearch, FiBell, FiChevronDown } from 'react-icons/fi';
import './Navbar.css';
import Breadcrumb from './Breadcrumb';
import { useUser } from '../../context/UserContext';
import { roleDisplayNames } from '../../features/authentication/constants';

const Navbar = () => {
  const { userData, getInitials } = useUser();

  const getDisplayRole = () => {
    if (!userData || !userData.role) return 'No Role';
    return roleDisplayNames[userData.role] || userData.job_title || 'No Role';
  };

  return (
    <header className="global-navbar">
      <div className="navbar-left">
        <Breadcrumb />
      </div>
      
      <div className="navbar-right">
        <div className="search-container">
          <FiSearch className="search-icon" />
          <input type="text" placeholder="Search..." className="search-input" />
        </div>
        
        <button className="notification-btn">
          <FiBell />
          <span className="badge">3</span>
        </button>

        <div className="user-profile-nav">
          <div className="user-avatar-small">{getInitials()}</div>
          <div className="user-info">
            <span className="user-name">
              {userData ? `${userData.first_name || ''} ${userData.last_name || ''}`.trim() || 'User' : 'Loading...'}
            </span>
            <span className="user-role">{getDisplayRole()}</span>
          </div>
          <FiChevronDown className="dropdown-icon" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
