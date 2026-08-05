import React from 'react';

const FormSelect = ({ 
  label, 
  name, 
  value, 
  onChange, 
  options, 
  required = false,
  error,
  helpText 
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>
        {label} {required && <span style={{ color: '#e53e3e' }}>*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        style={{
          padding: '12px 16px',
          border: `1px solid ${error ? '#e53e3e' : '#e2e8f0'}`,
          borderRadius: '6px',
          fontSize: '14px',
          background: '#f7fafc',
          width: '100%'
        }}
      >
        <option value="">Select an option</option>
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <small style={{ color: '#e53e3e' }}>{error}</small>}
      {!error && helpText && <small>{helpText}</small>}
    </div>
  );
};

export default FormSelect;
