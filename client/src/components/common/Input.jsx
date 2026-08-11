import React from 'react';

export default function Input({ label, type = "text", placeholder, value, onChange, name }) {
  return (
    <div style={{ marginBottom: '16px' }}>
      {label && (
        <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        style={{
          width: '100%',
          padding: '10px 12px',
          border: '1px solid #d1d5db',
          borderRadius: '6px',
          fontSize: '14px',
          boxSizing: 'border-box',
          outline: 'none',
          backgroundColor: '#f9fafb',
          color: '#111827'
        }}
      />
    </div>
  );
}