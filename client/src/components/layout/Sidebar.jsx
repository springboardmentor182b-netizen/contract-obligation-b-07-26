import React from 'react';
import { Link, useLocation } from 'react-router-dom'; 
import { 
  Shield, LayoutDashboard, FileText, Folder, CheckCircle, 
  RefreshCw, ShieldCheck, BarChart2, Bell, Users, Activity, 
  Settings, LogOut 
} from 'lucide-react';

const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { name: 'Contracts', icon: FileText, path: '/contracts/management' },
  { name: 'Repository', icon: Folder, path: '/contracts/repository' },
  { name: 'Obligations', icon: CheckCircle, path: '/obligations' },
  { name: 'Renewals', icon: RefreshCw, path: '/renewals' },
  { name: 'Compliance', icon: ShieldCheck, path: '/compliance' },
  { name: 'Reports', icon: BarChart2, path: '/reports' },
  { name: 'Notifications', icon: Bell, path: '/notifications' },
  { name: 'Users', icon: Users, path: '/users' },
  { name: 'Audit & Logs', icon: Activity, path: '/audit' },
  { name: 'Settings', icon: Settings, path: '/settings' },
];

export default function Sidebar({ onClose, user }) {
  const location = useLocation();

  return (
    <aside style={{ 
      background: '#0f172a', 
      color: '#94a3b8',      
      display: 'flex', 
      flexDirection: 'column',
      height: '100%',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{ padding: '24px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ background: '#2563eb', padding: '8px', borderRadius: '8px', color: 'white', display: 'flex' }}>
          <Shield size={20} />
        </div>
        <div>
          <h2 style={{ margin: 0, fontSize: '18px', color: 'white', fontWeight: '600', letterSpacing: '0.5px' }}>
            ContractIQ
          </h2>
          <span style={{ fontSize: '12px', color: '#60a5fa' }}>Enterprise Suite</span>
        </div>
      </div>

      <div style={{ padding: '0 12px', flex: 1, overflowY: 'auto' }}>
        <div style={{ padding: '12px 8px', fontSize: '11px', fontWeight: '600', color: '#475569', letterSpacing: '1px' }}>
          MAIN MENU
        </div>
        
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path; 

            return (
              <li key={item.name}>
                <Link to={item.path} onClick={onClose} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '10px 12px', borderRadius: '8px', textDecoration: 'none',
                  color: isActive ? 'white' : '#94a3b8', 
                  background: isActive ? '#2563eb' : 'transparent',
                  fontWeight: isActive ? '500' : '400', 
                  transition: 'background 0.2s',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <Icon size={18} />
                    <span style={{ fontSize: '14px' }}>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span style={{ 
                      background: isActive ? 'rgba(255,255,255,0.2)' : '#1e293b',
                      color: isActive ? 'white' : '#cbd5e1', 
                      fontSize: '11px', padding: '2px 8px', borderRadius: '12px', fontWeight: '600'
                    }}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div style={{ padding: '20px', borderTop: '1px solid #1e293b', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: '#2563eb', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '14px' }}>
            {user?.initials || 'U'}
          </div>
          <div>
            <div style={{ color: 'white', fontSize: '14px', fontWeight: '500' }}>{user?.name || 'User Name'}</div>
            <div style={{ color: '#64748b', fontSize: '12px' }}>{user?.role || 'Role'}</div>
          </div>
        </div>
        <button style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', display: 'flex' }}>
          <LogOut size={18} />
        </button>
      </div>
    </aside>
  );
}