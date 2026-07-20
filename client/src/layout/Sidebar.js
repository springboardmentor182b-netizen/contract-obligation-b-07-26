import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAnalytics } from '../components/context/AnalyticsContext';
import navigationData from '../data/defaultTools.json';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const { user } = useAnalytics();
  
  const userRole = user?.role || 'Employee';
  const allowedItems = navigationData.roleBasedAccess[userRole] || [];
  
  const visibleNavItems = navigationData.navigationItems.filter(
    item => allowedItems.includes(item.id)
  );

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {visibleNavItems.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className={`sidebar-link ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
