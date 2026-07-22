import React from 'react';
import './Checkbox.css';

const Checkbox = ({ label, name, checked, onChange, disabled = false }) => {
  return (
    <div className="checkbox-wrapper">
      <label className="checkbox-label">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="checkbox-input"
        />
        <span className="checkbox-text">{label}</span>
      </label>
    </div>
  );
};

export default Checkbox;
