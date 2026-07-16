import React, { useState } from 'react';
import { 
  FiGrid, FiFileText, FiFolder, FiCheckSquare, 
  FiRefreshCw, FiShield, FiPieChart, FiBell, 
  FiList, FiUsers, FiSettings, FiChevronLeft, FiChevronRight,
  FiChevronDown, FiX
} from 'react-icons/fi';
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

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo-container">
          <div className="logo-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          {!isCollapsed && <span className="logo-text">ContractIQ</span>}
        </div>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={`nav-item ${item.active ? 'active' : ''}`}
            title={isCollapsed ? item.label : ''}
          >
            <item.icon className="nav-icon" />
            {!isCollapsed && <span className="nav-label">{item.label}</span>}
            {!isCollapsed && item.badge && (
              <span className={`nav-badge ${item.active ? 'active-badge' : ''}`}>{item.badge}</span>
            )}
          </a>
        ))}
      </nav>

      <div className="sidebar-footer">
        {!isCollapsed && (
          <div className="sidebar-profile">
            <div className="sidebar-avatar">PS</div>
            <div className="sidebar-user-info">
              <span className="sidebar-user-name">Pragna Sree</span>
              
            </div>
            <FiChevronDown className="sidebar-profile-chevron" />
          </div>
        )}
        <button 
          className="collapse-btn"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <FiChevronRight /> : (
             <>
               <FiX className="collapse-icon" />
               <span>Collapse</span>
             </>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
