import React, { useState } from 'react';

const Dropdown = ({ options, value, onChange, placeholder = 'Select an option' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        style={{
          width: '100%',
          padding: '12px 16px',
          border: '1px solid #e2e8f0',
          borderRadius: '6px',
          background: '#f7fafc',
          textAlign: 'left',
          cursor: 'pointer',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <span>{value ? value.label : placeholder}</span>
        <span>{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          marginTop: '4px',
          background: 'white',
          border: '1px solid #e2e8f0',
          borderRadius: '6px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          zIndex: 10,
          maxHeight: '200px',
          overflowY: 'auto'
        }}>
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => handleSelect(option)}
              style={{
                padding: '12px 16px',
                cursor: 'pointer',
                borderBottom: index < options.length - 1 ? '1px solid #e2e8f0' : 'none'
              }}
              onMouseEnter={(e) => e.target.style.background = '#f7fafc'}
              onMouseLeave={(e) => e.target.style.background = 'white'}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
