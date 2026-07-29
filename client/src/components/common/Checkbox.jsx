import React from 'react';

export default function Checkbox({ label, checked, onChange, name }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', gap: '8px' }}>
      <input 
        type="checkbox" 
        name={name}
        checked={checked} 
        onChange={onChange}
        style={{ cursor: 'pointer', width: '16px', height: '16px' }}
      />
      {label && <label style={{ cursor: 'pointer', fontSize: '14px' }}>{label}</label>}
    </div>
  );
}