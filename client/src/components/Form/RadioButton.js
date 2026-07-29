import React from 'react';
import './RadioButton.css';

const RadioButton = ({ label, name, value, checked, onChange, disabled = false }) => {
  return (
    <div className="radio-wrapper">
      <label className="radio-label">
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="radio-input"
        />
        <span className="radio-text">{label}</span>
      </label>
    </div>
  );
};

export default RadioButton;
