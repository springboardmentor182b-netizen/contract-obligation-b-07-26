import React from 'react';
import './SettingsShared.css';

/**
 * SettingsCard — white card container used across all settings sections.
 * Props:
 *   title (string?)  — optional card heading
 *   children         — card body content
 *   className (string?) — extra class names
 */
const SettingsCard = ({ title, children, className = '' }) => {
  return (
    <div className={`settings-card ${className}`}>
      {title && <h3 className="settings-card-title">{title}</h3>}
      {children}
    </div>
  );
};

export default SettingsCard;
