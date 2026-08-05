import React, { useState } from 'react';
import {
  FiLock,
  FiShield,
  FiMonitor,
  FiSmartphone,
  FiClock,
  FiAlertCircle,
} from 'react-icons/fi';
import SettingsCard from '../SettingsCard';
import SettingsRow from '../SettingsRow';
import '../SettingsShared.css';
import './Security.css';

const Security = () => {
  const [sessions, setSessions] = useState([
    {
      id: 1,
      device: 'MacBook Pro · Chrome',
      location: 'New York, US',
      time: 'Now',
      icon: <FiMonitor />,
      current: true,
    },
    {
      id: 2,
      device: 'iPhone 14 · Safari',
      location: 'New York, US',
      time: '2h ago',
      icon: <FiSmartphone />,
      current: false,
    },
    {
      id: 3,
      device: 'Windows PC · Edge',
      location: 'Chicago, US',
      time: '3 days ago',
      icon: <FiMonitor />,
      current: false,
    },
  ]);

  const [twoFaEnabled, setTwoFaEnabled] = useState(true);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    current: '',
    newPass: '',
    confirm: '',
  });

  const loginHistory = [
    { date: 'Aug 5, 2026', time: '09:15 AM', location: 'New York, US', device: 'Chrome / macOS', status: 'success' },
    { date: 'Aug 4, 2026', time: '02:30 PM', location: 'New York, US', device: 'Safari / iOS', status: 'success' },
    { date: 'Aug 3, 2026', time: '11:00 AM', location: 'Chicago, US', device: 'Edge / Windows', status: 'success' },
    { date: 'Aug 2, 2026', time: '08:45 AM', location: 'Unknown', device: 'Chrome / Linux', status: 'failed' },
  ];

  const handleRevoke = (id) => {
    setSessions((prev) => prev.filter((s) => s.id !== id));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="settings-section">
      <div className="section-header">
        <h2>Security Settings</h2>
        <p>Manage your password, two-factor authentication, and active sessions</p>
      </div>

      {/* Password + 2FA */}
      <SettingsCard>
        <SettingsRow
          icon={<FiLock />}
          iconBg="#eff6ff"
          iconColor="#3b82f6"
          title="Password"
          subtitle="Last changed 3 months ago"
          action={
            <button
              className="btn-link"
              onClick={() => setShowChangePassword((v) => !v)}
            >
              {showChangePassword ? 'Cancel' : 'Change'}
            </button>
          }
        />

        {showChangePassword && (
          <div className="security-password-form">
            <div className="security-input-row">
              <div className="settings-input-group">
                <label>Current Password</label>
                <input
                  className="settings-input"
                  type="password"
                  name="current"
                  placeholder="••••••••"
                  value={passwordForm.current}
                  onChange={handlePasswordChange}
                />
              </div>
            </div>
            <div className="security-input-row two-col">
              <div className="settings-input-group">
                <label>New Password</label>
                <input
                  className="settings-input"
                  type="password"
                  name="newPass"
                  placeholder="••••••••"
                  value={passwordForm.newPass}
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="settings-input-group">
                <label>Confirm New Password</label>
                <input
                  className="settings-input"
                  type="password"
                  name="confirm"
                  placeholder="••••••••"
                  value={passwordForm.confirm}
                  onChange={handlePasswordChange}
                />
              </div>
            </div>
            <div className="security-form-actions">
              <button className="btn-primary">Update Password</button>
            </div>
          </div>
        )}

        <SettingsRow
          icon={<FiShield />}
          iconBg="#f0fdf4"
          iconColor="#16a34a"
          title="Two-Factor Authentication"
          subtitle={twoFaEnabled ? 'Authenticator app enabled' : 'Not enabled — your account is less secure'}
          action={
            <span
              className={twoFaEnabled ? 'badge-enabled' : 'badge-disabled'}
              onClick={() => setTwoFaEnabled((v) => !v)}
              style={{ cursor: 'pointer' }}
              title="Click to toggle"
            >
              {twoFaEnabled ? 'Enabled' : 'Disabled'}
            </span>
          }
        />
      </SettingsCard>

      {/* Active Sessions */}
      <SettingsCard title="Active Sessions">
        {sessions.length === 0 ? (
          <div className="security-empty">No active sessions found.</div>
        ) : (
          sessions.map((session) => (
            <SettingsRow
              key={session.id}
              icon={session.icon}
              iconBg={session.current ? '#eff6ff' : '#f3f4f6'}
              iconColor={session.current ? '#3b82f6' : '#6b7280'}
              title={
                <span>
                  {session.device}
                  {session.current && (
                    <span className="session-current-badge"> · Current</span>
                  )}
                </span>
              }
              subtitle={`${session.location} · ${session.time}`}
              action={
                !session.current && (
                  <button
                    className="btn-link-danger"
                    onClick={() => handleRevoke(session.id)}
                  >
                    Revoke
                  </button>
                )
              }
            />
          ))
        )}
      </SettingsCard>

      {/* Login History */}
      <SettingsCard title="Login History">
        <div className="security-history-table-wrapper">
          <table className="security-history-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Location</th>
                <th>Device</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {loginHistory.map((entry, i) => (
                <tr key={i}>
                  <td>{entry.date}</td>
                  <td>{entry.time}</td>
                  <td>{entry.location}</td>
                  <td>{entry.device}</td>
                  <td>
                    <span className={`login-status login-status--${entry.status}`}>
                      {entry.status === 'success' ? '✓ Success' : '✗ Failed'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </SettingsCard>

      {/* Connected Devices */}
      <SettingsCard title="Connected Devices">
        <SettingsRow
          icon={<FiMonitor />}
          iconBg="#f3f4f6"
          iconColor="#6b7280"
          title="MacBook Pro 14"
          subtitle="macOS 14.3 · Last used today"
          action={<button className="btn-secondary">Remove</button>}
        />
        <SettingsRow
          icon={<FiSmartphone />}
          iconBg="#f3f4f6"
          iconColor="#6b7280"
          title="iPhone 14 Pro"
          subtitle="iOS 17.2 · Last used 2 hours ago"
          action={<button className="btn-secondary">Remove</button>}
        />
        <SettingsRow
          icon={<FiClock />}
          iconBg="#fef3c7"
          iconColor="#d97706"
          title="Windows PC"
          subtitle="Windows 11 · Last used 3 days ago"
          action={<button className="btn-secondary">Remove</button>}
        />
      </SettingsCard>
    </div>
  );
};

export default Security;
