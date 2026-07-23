
import React, { useState, useEffect } from 'react';
import {
  FiGrid,
  FiFileText,
  FiFolder,
  FiCheckSquare,
  FiRefreshCw,
  FiShield,
  FiPieChart,
  FiBell,
  FiList,
  FiUsers,
  FiSettings,
  FiChevronRight,
  FiChevronDown,
  FiX
} from 'react-icons/fi';
import { getCurrentUser } from '../api';

import './Sidebar.css';

const menuItems = [
  { id: 'dashboard', label: 'Dashboard', icon: FiGrid },
  { id: 'contracts', label: 'Contracts', icon: FiFileText, active: true, badge: '84' },
  { id: 'repository', label: 'Repository', icon: FiFolder },
  { id: 'obligations', label: 'Obligations', icon: FiCheckSquare, badge: '12' },
  { id: 'renewals', label: 'Renewals', icon: FiRefreshCw, badge: '5' },
  { id: 'compliance', label: 'Compliance', icon: FiShield, badge: '7' },
  { id: 'reports', label: 'Reports', icon: FiPieChart },
  { id: 'notifications', label: 'Notifications', icon: FiBell, badge: '3' },
  { id: 'audit', label: 'Audit Logs', icon: FiList },
  { id: 'users', label: 'Users', icon: FiUsers },
  { id: 'settings', label: 'Settings', icon: FiSettings },
];


const Sidebar = () => {

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data);
      } catch (err) {
        console.error("Failed to fetch user:", err);
        setUser({ full_name: "User" });
      } finally {
        setLoadingUser(false);
      }
    };
    fetchUser();
  }, []);

  const getInitials = (name) => {
    if (!name || name === 'User') return 'U';
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0][0].toUpperCase();
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  };

  const displayName = loadingUser ? "Loading..." : (user?.full_name || "User");
  const displayInitials = loadingUser ? "..." : getInitials(user?.full_name);

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>

      <div className="sidebar-header">
        <div className="logo-container">

          <div className="logo-icon">
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none"
            >
              <path 
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="white"
                strokeWidth="2"
              />

              <path 
                d="M2 17L12 22L22 17"
                stroke="white"
                strokeWidth="2"
              />

              <path 
                d="M2 12L12 17L22 12"
                stroke="white"
                strokeWidth="2"
              />
            </svg>
          </div>

          {!isCollapsed && (
            <span className="logo-text">
              ContractIQ
            </span>
          )}

        </div>
      </div>


      <nav className="sidebar-nav">

        {menuItems.map((item) => {

          const Icon = item.icon;

          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav-item ${item.active ? 'active' : ''}`}
            >

              <Icon className="nav-icon" />

              {!isCollapsed && (
                <span className="nav-label">
                  {item.label}
                </span>
              )}

              {!isCollapsed && item.badge && (
                <span 
                  className={`nav-badge ${item.active ? 'active-badge' : ''}`}
                >
                  {item.badge}
                </span>
              )}

            </a>
          );

        })}

      </nav>


      <div className="sidebar-footer">


        {!isCollapsed && (

          <div className="sidebar-profile">

            <div className="sidebar-avatar">
              {displayInitials}
            </div>


            <div className="sidebar-user-info">

              <span className="sidebar-user-name">
                {displayName}
              </span>

            </div>


            <FiChevronDown 
              className="sidebar-profile-chevron"
            />

          </div>

        )}


        <button
          className="collapse-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >

          {isCollapsed ? (

            <FiChevronRight />

          ) : (

            <>
              <FiX className="collapse-icon" />
              <span>
                Collapse
              </span>
            </>

          )}

        </button>


      </div>


    </aside>
  );
};


export default Sidebar;