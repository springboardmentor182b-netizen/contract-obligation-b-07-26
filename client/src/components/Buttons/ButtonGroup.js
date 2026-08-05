import React from 'react';

const ButtonGroup = ({ buttons, activeButton, onButtonClick }) => {
  return (
    <div style={{ display: 'flex', gap: '8px' }}>
      {buttons.map((button, index) => (
        <button
          key={index}
          onClick={() => onButtonClick(button.value)}
          style={{
            padding: '10px 20px',
            border: activeButton === button.value ? '2px solid #5a67d8' : '1px solid #e2e8f0',
            background: activeButton === button.value ? '#5a67d8' : 'white',
            color: activeButton === button.value ? 'white' : '#2d3748',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'all 0.2s'
          }}
        >
          {button.label}
        </button>
      ))}
    </div>
  );
};

export default ButtonGroup;
