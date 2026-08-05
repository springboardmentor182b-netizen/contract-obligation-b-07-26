import React from 'react';

const Checkbox = ({ label, name, checked, onChange }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <input
        type="checkbox"
        id={name}
        name={name}
        checked={checked}
        onChange={onChange}
        style={{
          width: '18px',
          height: '18px',
          cursor: 'pointer'
        }}
      />
      <label 
        htmlFor={name}
        style={{ 
          cursor: 'pointer', 
          fontSize: '14px',
          color: '#2d3748'
        }}
      >
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
