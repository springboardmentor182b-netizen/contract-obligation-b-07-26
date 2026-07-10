import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, FolderOpen, ClipboardList, 
  RefreshCw, ShieldCheck, BarChart3, Bell, History, Users, Settings, ChevronLeft
} from 'lucide-react';
import styles from './Sidebar.css';

const navigationTree = [
  { path: '/', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/contracts', label: 'Contracts', icon: FileText, badge: 84 },
  { path: '/repository', label: 'Repository', icon: FolderOpen },
  { path: '/obligations', label: 'Obligations', icon: ClipboardList, badge: 12 },
  { path: '/renewals', label: 'Renewals', icon: RefreshCw, badge: 5 },
  { path: '/compliance', label: 'Compliance', icon: ShieldCheck, badge: 7 },
  { path: '/reports', label: 'Reports', icon: BarChart3 },
  { path: '/notifications', label: 'Notifications', icon: Bell, badge: 3 },
  { path: '/audit-logs', label: 'Audit Logs', icon: History },
  { path: '/users', label: 'Users', icon: Users },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({ isCollapsed, setIsCollapsed, isMobileOpen }) {
  const sidebarClasses = [
    styles.sidebar,
    isCollapsed ? styles.collapsed : '',
    isMobileOpen ? styles.mobileVisible : ''
  ].join(' ');

  return (
    <aside className={sidebarClasses}>
      <div className={styles.brandingHeader}>
        <div className={styles.brandGroup}>
          <div className={styles.brandIcon}><ShieldCheck size={18} /></div>
          {(!isCollapsed || isMobileOpen) && <span className={styles.brandTitle}>ContractIQ</span>}
        </div>
        <button onClick={() => setIsCollapsed(!isCollapsed)} className={styles.collapseBtn}>
          <ChevronLeft size={16} style={{ transform: isCollapsed ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
        </button>
      </div>

      <nav className={styles.navContainer}>
        {navigationTree.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `${styles.navLink} ${isActive ? styles.activeLink : ''}`}
            >
              <Icon size={18} style={{ flexShrink: 0 }} />
              {(!isCollapsed || isMobileOpen) && <span className={styles.linkLabel}>{item.label}</span>}
              {(!isCollapsed || isMobileOpen) && item.badge && (
                <span className={styles.badge}>{item.badge}</span>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div className={styles.footerProfile}>
        <div className={styles.avatar}>SM</div>
        {(!isCollapsed || isMobileOpen) && (
          <div className={styles.profileMeta}>
            <p className={styles.profileName}>Sarah Mitchell</p>
            <p className={styles.profileRole}>Legal Director</p>
          </div>
        )}
      </div>
    </aside>
  );
}