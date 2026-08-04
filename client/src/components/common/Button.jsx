import React from 'react';

export default function Button({ 
  children, 
  onClick, 
  type = 'button', 
  styleType = 'primary', // Can be 'primary', 'secondary', or 'danger'
  disabled = false,
  className = '',
  style = {} // Allows passing extra inline styles when needed
}) {
  
  // 1. Base styling that applies to all buttons
  const baseStyle = {
    padding: '10px 20px',
    borderRadius: '8px',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontWeight: '500',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px', // Space between icon and text if both exist
    opacity: disabled ? 0.6 : 1,
    fontSize: '14px',
    transition: 'all 0.2s ease',
    width: '100%', // Defaults to 100% width, easily overridden by parent divs
  };

  // 2. Specific styles based on the 'styleType' prop (matching your Figma design)
  let typeStyle = {};
  
  if (styleType === 'primary') {
    typeStyle = {
      background: '#2563eb', // The blue color from your Figma "Upload Contract" button
      color: 'white',
    };
  } else if (styleType === 'secondary') {
    typeStyle = {
      background: 'white', // The white color from your Figma "Export" button
      color: '#0f172a',
      border: '1px solid #e2e8f0',
    };
  } else if (styleType === 'danger') {
    typeStyle = {
      background: '#ef4444', 
      color: 'white',
    };
  }

  // 3. Combine base styles, type styles, and any custom styles passed in
  const finalStyle = { ...baseStyle, ...typeStyle, ...style };

  return (
    <button 
      type={type} 
      onClick={onClick} 
      disabled={disabled}
      className={`btn btn-${styleType} ${className}`}
      style={finalStyle}
    >
      {children}
    </button>
  );
}