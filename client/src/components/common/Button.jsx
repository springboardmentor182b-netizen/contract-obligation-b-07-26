import React from 'react';

export default function Button({ children, type = "button", onClick, fullWidth }) {
  return (
    <button
      type={type}
      onClick={onClick}
      style={{
        backgroundColor: '#2563eb',
        color: 'white',
        padding: '10px 16px',
        border: 'none',
        borderRadius: '6px',
        fontSize: '14px',
        fontWeight: '500',
        cursor: 'pointer',
        width: fullWidth ? '100%' : 'auto',
        transition: 'background-color 0.2s',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      {children}
    </button>
  );
}