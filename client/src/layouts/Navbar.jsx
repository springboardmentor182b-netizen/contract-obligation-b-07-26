import React from 'react';
import { Menu, Search, Bell, ChevronDown } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import styles from './Navbar.css';

export default function Navbar({ toggleSidebar, openMobileMenu }) {
  const location = useLocation();

  const getBreadcrumb = () => {
    const segment = location.pathname.split('/')[1];
    if (!segment) return 'Dashboard';
    return segment.charAt(0).toUpperCase() + segment.slice(1).replace('-', ' ');
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.leftSection}>
        <button onClick={openMobileMenu} className={`${styles.toggleBtn} ${styles.mobileToggle}`}>
          <Menu size={20} />
        </button>
        <button onClick={toggleSidebar} className={`${styles.toggleBtn} ${styles.desktopToggle}`}>
          <Menu size={20} />
        </button>

        <div className={styles.breadcrumb}>
          <span>ContractIQ</span>
          <span>&gt;</span>
          <span className={styles.breadcrumbActive}>{getBreadcrumb()}</span>
        </div>
      </div>

      <div className={styles.rightSection}>
        <div className={styles.searchWrapper}>
          <Search className={styles.searchIcon} size={15} />
          <input type="text" placeholder="Search reference lookup..." className={styles.searchInput} />
        </div>

        <button className={styles.notificationBtn}>
          <Bell size={18} />
          <span className={styles.alertBadge}></span>
        </button>

        <div className={styles.divider}></div>

        <div className={styles.userWidget}>
          <div className={styles.userAvatar}>SM</div>
          <div className={styles.userMeta}>
            <p className={styles.userName}>Sarah Mitchell</p>
            <p className={styles.userRole}>Legal Director</p>
          </div>
          <ChevronDown size={14} className={styles.chevron} />
        </div>
      </div>
    </header>
  );
}