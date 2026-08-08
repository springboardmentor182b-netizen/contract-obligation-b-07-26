import React from 'react';
import './SettingsShared.css';

/**
 * SettingsRow — horizontal row with icon, title, subtitle, and right-side action.
 * Props:
 *   icon        — React node for the left icon
 *   iconBg      — background color for the icon circle (default #f3f4f6)
 *   iconColor   — icon color (default #6b7280)
 *   title       — row title string
 *   subtitle    — row subtitle string
 *   action      — React node rendered on the right side (button, toggle, badge…)
 *   onClick     — optional click handler for the entire row
 */
const SettingsRow = ({
  icon,
  iconBg,
  iconColor,
  title,
  subtitle,
  action,
  onClick,
}) => {
  return (
    <div className="settings-row" onClick={onClick} style={onClick ? { cursor: 'pointer' } : {}}>
      {icon && (
        <div
          className="settings-row-icon"
          style={{
            backgroundColor: iconBg || '#f3f4f6',
            color: iconColor || '#6b7280',
          }}
        >
          {icon}
        </div>
      )}
      <div className="settings-row-body">
        <div className="settings-row-title">{title}</div>
        {subtitle && <div className="settings-row-sub">{subtitle}</div>}
      </div>
      {action && <div className="settings-row-action">{action}</div>}
    </div>
  );
};

export default SettingsRow;
