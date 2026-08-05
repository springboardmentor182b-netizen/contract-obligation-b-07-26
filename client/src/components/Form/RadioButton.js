import React from 'react';

const RadioButton = ({ label, name, value, checked, onChange }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <input
        type="radio"
        id={`${name}-${value}`}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        style={{
          width: '18px',
          height: '18px',
          cursor: 'pointer'
        }}
      />
      <label 
        htmlFor={`${name}-${value}`}
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

export default RadioButton;
