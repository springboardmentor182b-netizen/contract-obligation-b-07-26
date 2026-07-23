import React from 'react';

export default function StatCard({ title, value, subtitle, icon: Icon, subtitleColor = "gray" }) {
  return (
    <div style={{
      backgroundColor: 'white',
      padding: '20px',
      borderRadius: '8px',
      border: '1px solid #e5e7eb',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    }}>
      <div>
        <p style={{ margin: 0, fontSize: '12px', fontWeight: 'bold', color: '#6b7280', textTransform: 'uppercase' }}>
          {title}
        </p>
        <h2 style={{ margin: '10px 0', fontSize: '28px', color: '#111827' }}>
          {value}
        </h2>
        <p style={{ margin: 0, fontSize: '12px', color: subtitleColor }}>
          {subtitle}
        </p>
      </div>
      <div style={{
        padding: '10px',
        backgroundColor: '#f3f4f6',
        borderRadius: '8px',
        color: '#4f46e5'
      }}>
        {Icon && <Icon size={24} />}
      </div>
    </div>
  );
}