import React from 'react';
import './SettingsShared.css';

/**
 * ToggleSwitch — animated iOS-style toggle.
 * Props:
 *   checked   — boolean state
 *   onChange  — change handler (event)
 *   id        — unique id for the input (required for label association)
 *   disabled  — boolean
 */
const ToggleSwitch = ({ checked, onChange, id, disabled = false }) => {
  return (
    <label className="toggle-switch" htmlFor={id}>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <span className="toggle-track" />
    </label>
  );
};

export default ToggleSwitch;
