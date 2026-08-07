import React from 'react';
import { Search, Bell, ChevronDown, Menu } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function Navbar({ toggleSidebar }) {
  const location = useLocation();
  const path = location.pathname;

  let breadcrumbs = ['ContractIQ'];

  if (path === '/contracts/repository') {
    breadcrumbs.push('Contracts', 'Repository');
  } else if (path === '/contracts/management') {
    breadcrumbs.push('Contracts', 'Management');
  } else {
    const pageName = path.substring(1); 
    if (pageName) {
      const formattedName = pageName.charAt(0).toUpperCase() + pageName.slice(1);
      breadcrumbs.push(formattedName);
    }
  }

  return (
    <nav style={{ 
      background: 'white', padding: '16px 20px', 
      borderBottom: '1px solid #e2e8f0', display: 'flex', 
      justifyContent: 'space-between', alignItems: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      
      {/* Left Side: Hamburger & Breadcrumbs */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button className="mobile-menu-btn" onClick={toggleSidebar}>
          <Menu size={24} />
        </button>
        
        <div className="nav-breadcrumbs">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              <span style={{
                color: index === breadcrumbs.length - 1 ? '#0f172a' : '#64748b', 
                fontWeight: index === breadcrumbs.length - 1 ? '500' : '400' 
              }}>
                {crumb}
              </span>
              {index < breadcrumbs.length - 1 && (
                <span style={{ margin: '0 8px', color: '#64748b' }}>›</span>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Right Side: Search, Notifications, Profile */}
      <div className="nav-tools">
        <div className="search-input-wrapper" style={{ position: 'relative' }}>
          <Search size={16} color="#94a3b8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text" 
            placeholder="Search..." 
            style={{ 
              padding: '8px 12px 8px 36px', borderRadius: '6px', 
              border: '1px solid #e2e8f0', background: '#f8fafc',
              outline: 'none', fontSize: '14px', width: '200px'
            }}
          />
        </div>

        <button style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', position: 'relative', display: 'flex' }}>
          <Bell size={20} />
          <span style={{ position: 'absolute', top: '0px', right: '2px', width: '6px', height: '6px', background: '#ef4444', borderRadius: '50%' }}></span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', borderLeft: '1px solid #e2e8f0', paddingLeft: '16px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#2563eb', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '13px' }}>
            AT
          </div>
          <div className="profile-text" style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ color: '#0f172a', fontSize: '14px', fontWeight: '500' }}>Alexandra T.</span>
            <span style={{ color: '#64748b', fontSize: '12px' }}>System Admin</span>
          </div>
          <ChevronDown size={16} color="#64748b" />
        </div>
      </div>
    </nav>
  );
}