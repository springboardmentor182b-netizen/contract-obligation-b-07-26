import React, { useState } from 'react';
import SettingsCard from '../SettingsCard';
import SettingsRow from '../SettingsRow';
import '../SettingsShared.css';
import './Integrations.css';

const INTEGRATIONS = [
  {
    id: 'slack',
    name: 'Slack',
    desc: 'Contract and compliance notifications',
    initials: 'SL',
    color: '#4a154b',
    connected: true,
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    desc: 'CRM contract sync',
    initials: 'SF',
    color: '#00a1e0',
    connected: true,
  },
  {
    id: 'docusign',
    name: 'DocuSign',
    desc: 'Electronic signature workflow',
    initials: 'DS',
    color: '#ffb900',
    connected: false,
  },
  {
    id: 'gdrive',
    name: 'Google Drive',
    desc: 'Document storage sync',
    initials: 'GD',
    color: '#34a853',
    connected: false,
  },
  {
    id: 'msteams',
    name: 'Microsoft Teams',
    desc: 'Team collaboration alerts',
    initials: 'MT',
    color: '#5059c9',
    connected: false,
  },
  {
    id: 'onedrive',
    name: 'OneDrive',
    desc: 'Cloud file storage and backup',
    initials: 'OD',
    color: '#0078d4',
    connected: false,
  },
  {
    id: 'dropbox',
    name: 'Dropbox',
    desc: 'File sharing and storage',
    initials: 'DB',
    color: '#0061ff',
    connected: false,
  },
  {
    id: 'outlook',
    name: 'Outlook',
    desc: 'Email and calendar integration',
    initials: 'OL',
    color: '#0072c6',
    connected: false,
  },
];

const Integrations = () => {
  const [integrations, setIntegrations] = useState(INTEGRATIONS);

  const toggleConnection = (id) => {
    setIntegrations((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, connected: !item.connected } : item
      )
    );
  };

  return (
    <div className="settings-section">
      <div className="section-header">
        <h2>Integrations</h2>
        <p>Connect external tools and services to enhance your workflow</p>
      </div>

      <SettingsCard>
        {integrations.map((integration) => (
          <SettingsRow
            key={integration.id}
            icon={
              <div
                className="integration-logo"
                style={{ backgroundColor: integration.color }}
              >
                {integration.initials}
              </div>
            }
            iconBg="transparent"
            title={integration.name}
            subtitle={integration.desc}
            action={
              integration.connected ? (
                <button
                  className="btn-secondary"
                  onClick={() => toggleConnection(integration.id)}
                >
                  Disconnect
                </button>
              ) : (
                <button
                  className="btn-primary"
                  onClick={() => toggleConnection(integration.id)}
                >
                  Connect
                </button>
              )
            }
          />
        ))}
      </SettingsCard>
    </div>
  );
};

export default Integrations;
