import React from 'react';
import { FiBell, FiChevronDown } from 'react-icons/fi';
import './Navbar.css';
import Breadcrumb from './Breadcrumb';
import { useUser } from '../../context/UserContext';

const Navbar = () => {
  const { userData, getInitials } = useUser();

  return (
    <header className="global-navbar">
      <div className="navbar-left">
        <Breadcrumb />
      </div>
      
      <div className="navbar-right">
        <button className="notification-btn">
          <FiBell />
          <span className="badge">3</span>
        </button>

        <div className="user-profile-nav">
          {userData?.profile_image ? (
            <img className="user-avatar-small avatar-image" src={userData.profile_image} alt="User profile" />
          ) : (
            <div className="user-avatar-small">{getInitials()}</div>
          )}
          <div className="user-info">
            <span className="user-name">
              {userData ? `${userData.first_name || ''} ${userData.last_name || ''}`.trim() || 'User' : 'Loading...'}
            </span>
            <span className="user-role">{userData ? userData.job_title || 'No Role' : '...'}</span>
          </div>
          <FiChevronDown className="dropdown-icon" />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
