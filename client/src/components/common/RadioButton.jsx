import React from 'react';

export default function RadioButton({ label, name, value, checked, onChange }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', gap: '8px' }}>
      <input 
        type="radio" 
        name={name}
        value={value}
        checked={checked} 
        onChange={onChange}
        style={{ cursor: 'pointer', width: '16px', height: '16px' }}
      />
      {label && <label style={{ cursor: 'pointer', fontSize: '14px' }}>{label}</label>}
    </div>
  );
}