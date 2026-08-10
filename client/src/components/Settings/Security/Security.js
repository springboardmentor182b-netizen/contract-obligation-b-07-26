import React, { useEffect, useState } from 'react';
import { FiLock, FiMonitor, FiShield } from 'react-icons/fi';
import SettingsCard from '../SettingsCard';
import SettingsRow from '../SettingsRow';
import '../SettingsShared.css';
import './Security.css';
import { getSecurity, getSecuritySessions, revokeSecuritySession, updateSecurity } from '../../../api/settingsApi';

const Security = () => {
  const [sessions, setSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [twoFaEnabled, setTwoFaEnabled] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ current: '', newPass: '', confirm: '' });
  const [message, setMessage] = useState('');

  const load = async () => {
    try {
      const [security, sessionData] = await Promise.all([getSecurity(), getSecuritySessions()]);
      setTwoFaEnabled(Boolean(security.two_fa_enabled));
      setSessions(sessionData.sessions || []);
      setCurrentSessionId(sessionData.current_session_id || null);
    } catch { setMessage('Unable to load security details.'); }
  };
  useEffect(() => { load(); }, []);

  const savePassword = async () => {
    if (!passwordForm.current || !passwordForm.newPass || passwordForm.newPass !== passwordForm.confirm) {
      setMessage('Enter the current password and matching new passwords.'); return;
    }
    try { await updateSecurity({ current_password: passwordForm.current, new_password: passwordForm.newPass }); setPasswordForm({ current: '', newPass: '', confirm: '' }); setShowChangePassword(false); setMessage('Password updated.'); }
    catch (error) { setMessage(error.response?.data?.detail || 'Unable to update password.'); }
  };

  const toggleTwoFactor = async () => {
    try { const next = !twoFaEnabled; await updateSecurity({ two_fa_enabled: next }); setTwoFaEnabled(next); setMessage(`Two-factor authentication ${next ? 'enabled' : 'disabled'}.`); }
    catch { setMessage('Unable to update two-factor authentication.'); }
  };

  const revoke = async (id) => {
    try { await revokeSecuritySession(id); setSessions((current) => current.filter((session) => session.id !== id)); setMessage('Session revoked.'); }
    catch (error) { setMessage(error.response?.data?.detail || 'Unable to revoke session.'); }
  };

  return <div className="settings-section">
    <div className="section-header"><h2>Security Settings</h2><p>Manage your password, two-factor preference, and active sessions.</p></div>
    {message && <div className="org-save-toast">{message}</div>}
    <SettingsCard>
      <SettingsRow icon={<FiLock />} iconBg="#eff6ff" iconColor="#3b82f6" title="Password" subtitle="Use a unique password for your account." action={<button className="btn-link" onClick={() => setShowChangePassword((value) => !value)}>{showChangePassword ? 'Cancel' : 'Change'}</button>} />
      {showChangePassword && <div className="security-password-form"><div className="settings-input-group"><label>Current Password</label><input className="settings-input" type="password" value={passwordForm.current} onChange={(event) => setPasswordForm({ ...passwordForm, current: event.target.value })} /></div><div className="security-input-row two-col"><div className="settings-input-group"><label>New Password</label><input className="settings-input" type="password" value={passwordForm.newPass} onChange={(event) => setPasswordForm({ ...passwordForm, newPass: event.target.value })} /></div><div className="settings-input-group"><label>Confirm New Password</label><input className="settings-input" type="password" value={passwordForm.confirm} onChange={(event) => setPasswordForm({ ...passwordForm, confirm: event.target.value })} /></div></div><div className="security-form-actions"><button className="btn-primary" onClick={savePassword}>Update Password</button></div></div>}
      <SettingsRow icon={<FiShield />} iconBg="#f0fdf4" iconColor="#16a34a" title="Two-Factor Authentication" subtitle={twoFaEnabled ? 'Enabled for this account' : 'Not enabled'} action={<button className="btn-secondary" onClick={toggleTwoFactor}>{twoFaEnabled ? 'Disable' : 'Enable'}</button>} />
    </SettingsCard>
    <SettingsCard title="Active Sessions">
      {sessions.length === 0 && <div className="security-empty">No active sessions found.</div>}
      {sessions.map((session) => <SettingsRow key={session.id} icon={<FiMonitor />} iconBg={session.id === currentSessionId ? '#eff6ff' : '#f3f4f6'} iconColor="#3b82f6" title={session.id === currentSessionId ? 'Current browser session' : 'Browser session'} subtitle={`Last active ${new Date(session.last_active_at).toLocaleString()}`} action={session.id !== currentSessionId ? <button className="btn-link-danger" onClick={() => revoke(session.id)}>Revoke</button> : null} />)}
    </SettingsCard>
    <SettingsCard title="Login History">
      {sessions.length === 0 ? <div className="security-empty">No login history found.</div> : <div className="security-history-table-wrapper"><table className="security-history-table"><thead><tr><th>Started</th><th>Last active</th><th>Status</th></tr></thead><tbody>{sessions.map((session) => <tr key={session.id}><td>{new Date(session.created_at).toLocaleString()}</td><td>{new Date(session.last_active_at).toLocaleString()}</td><td><span className="login-status login-status--success">Active</span></td></tr>)}</tbody></table></div>}
    </SettingsCard>
  </div>;
};

export default Security;
