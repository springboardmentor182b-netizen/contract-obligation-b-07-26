import React from 'react';
import './ButtonGroup.css';

const ButtonGroup = ({ children, align = 'left' }) => {
  return (
    <div className={`button-group button-group-${align}`}>
      {children}
    </div>
  );
};

export const Button = ({ 
  children, 
  onClick, 
  type = 'button', 
  variant = 'primary', 
  disabled = false,
  fullWidth = false 
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant} ${fullWidth ? 'btn-full-width' : ''}`}
    >
      {children}
    </button>
  );
};

export default ButtonGroup;
