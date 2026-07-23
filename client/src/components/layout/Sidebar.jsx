import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, Folder, CheckSquare, 
  RefreshCw, ShieldCheck, BarChart2, Bell, 
  Users, Activity, Settings, LogOut, Shield 
} from 'lucide-react';

export default function Sidebar() {
  const location = useLocation();
  const currentPath = location.pathname;

  // This small component handles the styling for each link, 
  // turning it blue if it is the currently active page!
  const NavItem = ({ icon: Icon, label, path, badge }) => {
    const isActive = currentPath === path;
    
    return (
      <Link to={path} style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 16px',
        margin: '4px 16px',
        borderRadius: '8px',
        textDecoration: 'none',
        color: isActive ? 'white' : '#94a3b8',
        backgroundColor: isActive ? '#2563eb' : 'transparent', // Bright blue if active
        fontWeight: isActive ? '500' : 'normal'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Icon size={20} />
          <span style={{ fontSize: '14px' }}>{label}</span>
        </div>
        {/* If a badge number is provided, render this little bubble */}
        {badge && (
          <span style={{ backgroundColor: '#334155', color: 'white', fontSize: '12px', padding: '2px 8px', borderRadius: '12px' }}>
            {badge}
          </span>
        )}
      </Link>
    );
  };

  return (
    <div style={{ width: '260px', backgroundColor: '#0f172a', color: 'white', display: 'flex', flexDirection: 'column', height: '100vh' }}>
      
      {/* 1. Logo Area (Now with the Blue Shield!) */}
      <div style={{ padding: '24px 20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ backgroundColor: '#2563eb', padding: '8px', borderRadius: '8px', display: 'flex' }}>
          <Shield size={20} color="white" />
        </div>
        <div>
          <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>ContractIQ</div>
          <div style={{ fontSize: '11px', color: '#94a3b8', marginTop: '2px' }}>Enterprise Suite</div>
        </div>
      </div>

      <div style={{ padding: '0 20px', fontSize: '11px', fontWeight: '600', color: '#64748b', marginBottom: '8px', marginTop: '8px', letterSpacing: '0.5px' }}>
        MAIN MENU
      </div>
      
      {/* 2. Menu Items (With Figma badges and correct routing) */}
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <NavItem icon={LayoutDashboard} label="Dashboard" path="/home" />
        <NavItem icon={FileText} label="Contracts" path="/contracts" />
        <NavItem icon={Folder} label="Repository" path="/repository" />
        <NavItem icon={CheckSquare} label="Obligations" path="/obligations" badge="7" />
        <NavItem icon={RefreshCw} label="Renewals" path="/renewals" />
        <NavItem icon={ShieldCheck} label="Compliance" path="/compliance" />
        <NavItem icon={BarChart2} label="Reports" path="/reports" />
        <NavItem icon={Bell} label="Notifications" path="/notifications" badge="14" />
        <NavItem icon={Users} label="Users" path="/users" />
        
        {/* This points to /dashboard, which is where our Audit code currently lives */}
        <NavItem icon={Activity} label="Audit & Logs" path="/dashboard" />
        
        <NavItem icon={Settings} label="Settings" path="/settings" />
      </div>

      {/* 3. Bottom Logout Button */}
      <div style={{ padding: '24px' }}>
        <button style={{ 
          display: 'flex', alignItems: 'center', gap: '8px', width: '100%', 
          padding: '10px 16px', backgroundColor: 'transparent', 
          border: '1px solid #ef4444', color: '#ef4444', 
          borderRadius: '8px', cursor: 'pointer', fontWeight: '500' 
        }}>
          <LogOut size={18} />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}