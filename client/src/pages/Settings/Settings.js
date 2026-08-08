import React, { useState } from 'react';
import { FiUser, FiLock, FiBell, FiSettings, FiDroplet } from 'react-icons/fi';
import { VscOrganization } from 'react-icons/vsc';
import './Settings.css';
import ProfileForm from '../../components/Settings/Profile/ProfileForm';
import Security from '../../components/Settings/Security/Security';
import Notifications from '../../components/Settings/Notifications/Notifications';
import Integrations from '../../components/Settings/Integrations/Integrations';
import Organization from '../../components/Settings/Organization/Organization';
import Appearance from '../../components/Settings/Appearance/Appearance';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileForm />;
      case 'security':
        return <Security />;
      case 'notifications':
        return <Notifications />;
      case 'integrations':
        return <Integrations />;
      case 'organization':
        return <Organization />;
      case 'appearance':
        return <Appearance />;
      default:
        return <ProfileForm />;
    }
  };

  const navItems = [
    { id: 'profile',       label: 'Profile',       sub: 'Name, email, avatar',       icon: <FiUser size={18} /> },
    { id: 'security',      label: 'Security',      sub: 'Password, 2FA, sessions',   icon: <FiLock size={18} /> },
    { id: 'notifications', label: 'Notifications', sub: 'Alerts and preferences',    icon: <FiBell size={18} /> },
    { id: 'integrations',  label: 'Integrations',  sub: 'Connect external tools',    icon: <FiSettings size={18} /> },
    { id: 'organization',  label: 'Organization',  sub: 'Company settings',          icon: <VscOrganization size={18} /> },
    { id: 'appearance',    label: 'Appearance',    sub: 'Theme, colors, language',   icon: <FiDroplet size={18} /> },
  ];

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h1>Settings</h1>
        <p className="settings-subtitle">Manage your account and platform preferences</p>
      </div>
      <div className="settings-layout">
        <aside className="settings-sidebar">
          <ul>
            {navItems.map(item => (
              <li
                key={item.id}
                className={activeTab === item.id ? 'active' : ''}
                onClick={() => setActiveTab(item.id)}
              >
                <div className="sidebar-icon">
                  {item.icon}
                </div>
                <div className="sidebar-text">
                  <span className="sidebar-label">{item.label}</span>
                  <span className="sidebar-sub">{item.sub}</span>
                </div>
              </li>
            ))}
          </ul>
        </aside>
        <main className="settings-content">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Settings;
