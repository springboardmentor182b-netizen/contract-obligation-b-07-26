import React, { useState } from 'react';
import {
  FiMail,
  FiMessageSquare,
  FiBell,
  FiRefreshCw,
  FiCalendar,
  FiAlertCircle,
  FiCheckCircle,
  FiFileText,
} from 'react-icons/fi';
import SettingsCard from '../SettingsCard';
import SettingsRow from '../SettingsRow';
import ToggleSwitch from '../ToggleSwitch';
import '../SettingsShared.css';

const NOTIFICATION_ITEMS = [
  {
    id: 'email',
    icon: <FiMail />,
    iconBg: '#eff6ff',
    iconColor: '#3b82f6',
    title: 'Email Notifications',
    subtitle: 'Receive updates via email',
    defaultOn: true,
  },
  {
    id: 'sms',
    icon: <FiMessageSquare />,
    iconBg: '#f3f4f6',
    iconColor: '#6b7280',
    title: 'SMS Notifications',
    subtitle: 'Critical alerts via SMS',
    defaultOn: false,
  },
  {
    id: 'inapp',
    icon: <FiBell />,
    iconBg: '#faf5ff',
    iconColor: '#7c3aed',
    title: 'In-App Notifications',
    subtitle: 'Platform notification center',
    defaultOn: true,
  },
  {
    id: 'renewals',
    icon: <FiRefreshCw />,
    iconBg: '#fff7ed',
    iconColor: '#ea580c',
    title: 'Contract Renewals',
    subtitle: 'Alerts 30, 60, 90 days before expiry',
    defaultOn: true,
  },
  {
    id: 'obligations',
    icon: <FiCalendar />,
    iconBg: '#f0fdf4',
    iconColor: '#16a34a',
    title: 'Obligation Due Dates',
    subtitle: 'Reminders before deadlines',
    defaultOn: true,
  },
  {
    id: 'compliance',
    icon: <FiAlertCircle />,
    iconBg: '#fef2f2',
    iconColor: '#dc2626',
    title: 'Compliance Alerts',
    subtitle: 'Violations and risk indicators',
    defaultOn: true,
  },
  {
    id: 'approvals',
    icon: <FiCheckCircle />,
    iconBg: '#eff6ff',
    iconColor: '#2563eb',
    title: 'Approval Requests',
    subtitle: 'When action is required',
    defaultOn: true,
  },
  {
    id: 'digest',
    icon: <FiFileText />,
    iconBg: '#f3f4f6',
    iconColor: '#6b7280',
    title: 'Weekly Digest',
    subtitle: 'Summary of key metrics',
    defaultOn: false,
  },
];

const Notifications = () => {
  const [prefs, setPrefs] = useState(() => {
    const init = {};
    NOTIFICATION_ITEMS.forEach((item) => {
      init[item.id] = item.defaultOn;
    });
    return init;
  });

  const [saved, setSaved] = useState(false);

  const handleToggle = (id) => {
    setPrefs((prev) => ({ ...prev, [id]: !prev[id] }));
    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="settings-section">
      <div className="section-header">
        <h2>Notification Preferences</h2>
        <p>Choose which notifications you want to receive and how</p>
      </div>

      <SettingsCard>
        {NOTIFICATION_ITEMS.map((item) => (
          <SettingsRow
            key={item.id}
            icon={item.icon}
            iconBg={item.iconBg}
            iconColor={item.iconColor}
            title={item.title}
            subtitle={item.subtitle}
            action={
              <ToggleSwitch
                id={`notif-${item.id}`}
                checked={prefs[item.id]}
                onChange={() => handleToggle(item.id)}
              />
            }
          />
        ))}
        <div className="settings-form-actions">
          <button className="btn-primary" onClick={handleSave}>
            {saved ? '✓ Preferences Saved' : 'Save Preferences'}
          </button>
        </div>
      </SettingsCard>
    </div>
  );
};

export default Notifications;
