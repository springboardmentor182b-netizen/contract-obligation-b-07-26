import React from 'react';
import { Search, Bell } from 'lucide-react';

export default function Navbar() {
  return (
    <div style={{
      height: '64px',
      backgroundColor: 'white',
      borderBottom: '1px solid #e5e7eb',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 32px',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      
      {/* Left Side: Search Bar */}
      <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f3f4f6', padding: '8px 16px', borderRadius: '8px', width: '320px' }}>
        <Search size={16} color="#9ca3af" style={{ marginRight: '8px' }} />
        <input 
          type="text" 
          placeholder="Search..." 
          style={{ border: 'none', backgroundColor: 'transparent', outline: 'none', width: '100%', fontSize: '14px' }} 
        />
      </div>

      {/* Right Side: Notifications and Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        
        {/* Bell Icon with Notification Dot */}
        <button style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center' }}>
          <Bell size={20} color="#64748b" />
          <span style={{ position: 'absolute', top: '-2px', right: '-2px', backgroundColor: '#ef4444', width: '8px', height: '8px', borderRadius: '50%' }}></span>
        </button>

        {/* User Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', borderLeft: '1px solid #e5e7eb', paddingLeft: '24px' }}>
          <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#2563eb', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold' }}>
            AT
          </div>
          <div style={{ textAlign: 'left' }}>
            <div style={{ fontSize: '14px', fontWeight: '600', color: '#0f172a' }}>Alexandra T.</div>
            <div style={{ fontSize: '12px', color: '#64748b' }}>System Admin</div>
          </div>
        </div>

      </div>
    </div>
  );
}