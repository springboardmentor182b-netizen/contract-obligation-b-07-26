import React from 'react';

export default function StatCard({ title, value, subtext, subtextColor, Icon, iconColor, iconBg }) {
  return (
    <div style={{
      background: 'white', padding: '20px', borderRadius: '12px', 
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)', border: '1px solid #f1f5f9',
      display: 'flex', flexDirection: 'column', position: 'relative'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h4 style={{ margin: '0 0 10px 0', fontSize: '12px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            {title}
          </h4>
          <h2 style={{ margin: '0 0 10px 0', fontSize: '32px', color: '#0f172a' }}>{value}</h2>
        </div>
        <div style={{ background: iconBg, padding: '10px', borderRadius: '8px', color: iconColor }}>
          <Icon size={20} />
        </div>
      </div>
      <span style={{ fontSize: '13px', color: subtextColor, fontWeight: '500' }}>{subtext}</span>
    </div>
  );
}