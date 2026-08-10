import React from 'react';

function RadioButton({ checked, onChange, label, name, value }) {
  return (
    <div className="form-check">
      <input type="radio" className="form-check-input" name={name} value={value} checked={checked} onChange={onChange} />
      <label className="form-check-label">{label}</label>
    </div>
  );
}

export default RadioButton;
