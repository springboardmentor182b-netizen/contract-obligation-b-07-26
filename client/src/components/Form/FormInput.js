import React from 'react';

const FormInput = ({ 
  label, 
  type = 'text', 
  name, 
  value, 
  onChange, 
  placeholder, 
  required = false,
  error,
  helpText 
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>
        {label} {required && <span style={{ color: '#e53e3e' }}>*</span>}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={{
          borderColor: error ? '#e53e3e' : '#e2e8f0'
        }}
      />
      {error && <small style={{ color: '#e53e3e' }}>{error}</small>}
      {!error && helpText && <small>{helpText}</small>}
    </div>
  );
};

export default FormInput;
