import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FiPieChart,
  FiFileText,
  FiCalendar,
  FiRefreshCw,
  FiCheckCircle,
  FiBarChart2,
  FiBell,
  FiList,
  FiUsers,
  FiSettings,
  FiX
} from 'react-icons/fi';
import './Sidebar.css';
import { useUser } from '../../context/UserContext';
import { roleDisplayNames } from '../../features/authentication/constants';

const Sidebar = () => {
  const { userData, getInitials } = useUser();

  const getDisplayRole = () => {
    if (!userData || !userData.role) return 'No Role';
    return roleDisplayNames[userData.role] || userData.job_title || 'No Role';
  };

  const menuItems = [
    { name: 'Dashboard', icon: <FiPieChart />, path: '/dashboard' },
    { name: 'Contracts', icon: <FiFileText />, path: '/contracts' },
    { name: 'Obligations', icon: <FiCalendar />, path: '/obligations' },
    { name: 'Renewals', icon: <FiRefreshCw />, path: '/renewals' },
    { name: 'Compliance', icon: <FiCheckCircle />, path: '/compliance' },
    { name: 'Reports', icon: <FiBarChart2 />, path: '/reports' },
    { name: 'Notifications', icon: <FiBell />, path: '/notifications' },
    { name: 'Audit Logs', icon: <FiList />, path: '/audit-logs' },
    { name: 'Users', icon: <FiUsers />, path: '/users' },
    { name: 'Settings', icon: <FiSettings />, path: '/settings' },
  ];

  return (
    <aside className="global-sidebar">
      <div className="sidebar-logo">
        <h2>ContractIQ</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item) => (
            <li key={item.name}>
              <NavLink 
                to={item.path} 
                className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'}
              >
                <span className="icon">{item.icon}</span>
                <span className="text">{item.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        <div className="sidebar-user-block">
          <div className="sidebar-avatar">{getInitials()}</div>
          <div className="sidebar-user-info">
            <span className="sidebar-user-name">
              {userData ? `${userData.first_name || ''} ${userData.last_name || ''}`.trim() || 'User' : 'Loading...'}
            </span>
            <span className="sidebar-user-role">{getDisplayRole()}</span>
          </div>
        </div>
        <button className="sidebar-collapse-btn">
          <FiX />
          <span>Collapse</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
