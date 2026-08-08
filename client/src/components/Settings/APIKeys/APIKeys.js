import React, { useState } from 'react';
import { FiKey, FiCopy, FiEye, FiEyeOff, FiTrash2, FiLink, FiPlus } from 'react-icons/fi';
import SettingsCard from '../SettingsCard';
import SettingsRow from '../SettingsRow';
import '../SettingsShared.css';
import './APIKeys.css';

const maskKey = (key) => key.slice(0, 8) + '•'.repeat(24) + key.slice(-6);

const APIKeys = () => {
  const [keys, setKeys] = useState([
    {
      id: 'prod',
      label: 'Production API Key',
      key: 'sk_live_ciq_4f8a2b1c9d3e7f0a5b8c1d4e7f2a5b8c',
      env: 'Production',
      created: 'Jan 15, 2026',
      revealed: false,
    },
    {
      id: 'dev',
      label: 'Development API Key',
      key: 'sk_test_ciq_7e2a5b8c1d4f8a2b1c9d3e7f0a5b8c1d',
      env: 'Development',
      created: 'Mar 3, 2026',
      revealed: false,
    },
  ]);

  const [webhookUrl, setWebhookUrl] = useState('https://your-app.com/webhooks/contractiq');
  const [webhookSaved, setWebhookSaved] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(null);

  const toggleReveal = (id) => {
    setKeys((prev) =>
      prev.map((k) => (k.id === id ? { ...k, revealed: !k.revealed } : k))
    );
  };

  const handleCopy = (id, key) => {
    navigator.clipboard.writeText(key).then(() => {
      setCopyFeedback(id);
      setTimeout(() => setCopyFeedback(null), 2000);
    });
  };

  const handleRevoke = (id) => {
    if (window.confirm('Are you sure you want to revoke this API key? This action cannot be undone.')) {
      setKeys((prev) => prev.filter((k) => k.id !== id));
    }
  };

  const handleGenerate = () => {
    const chars = 'abcdef0123456789';
    const rand = (n) =>
      Array.from({ length: n }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    const newKey = {
      id: `key_${Date.now()}`,
      label: 'New API Key',
      key: `sk_live_ciq_${rand(8)}${rand(8)}${rand(8)}${rand(6)}`,
      env: 'Production',
      created: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      revealed: false,
    };
    setKeys((prev) => [...prev, newKey]);
  };

  const handleWebhookSave = () => {
    setWebhookSaved(true);
    setTimeout(() => setWebhookSaved(false), 2500);
  };

  return (
    <div className="settings-section">
      <div className="section-header">
        <h2>API Keys</h2>
        <p>Manage API keys for programmatic access to ContractIQ</p>
      </div>

      {/* API Keys List */}
      <SettingsCard title="API Keys">
        {keys.map((k) => (
          <div key={k.id} className="apikey-row">
            <div className="apikey-row-top">
              <div className="apikey-meta">
                <div className="apikey-label">
                  <FiKey className="apikey-icon" />
                  {k.label}
                  <span className={`apikey-env-badge apikey-env-badge--${k.env.toLowerCase()}`}>
                    {k.env}
                  </span>
                </div>
                <div className="apikey-created">Created {k.created}</div>
              </div>
              <div className="apikey-actions">
                <button
                  className="btn-secondary apikey-btn"
                  onClick={() => handleCopy(k.id, k.key)}
                >
                  <FiCopy size={13} />
                  {copyFeedback === k.id ? 'Copied!' : 'Copy'}
                </button>
                <button
                  className="btn-secondary apikey-btn"
                  onClick={() => toggleReveal(k.id)}
                >
                  {k.revealed ? <FiEyeOff size={13} /> : <FiEye size={13} />}
                  {k.revealed ? 'Hide' : 'Reveal'}
                </button>
                <button
                  className="btn-danger apikey-btn"
                  onClick={() => handleRevoke(k.id)}
                >
                  <FiTrash2 size={13} />
                  Revoke
                </button>
              </div>
            </div>
            <div className="apikey-value-row">
              <code className={`apikey-value ${k.revealed ? 'apikey-value--revealed' : ''}`}>
                {k.revealed ? k.key : maskKey(k.key)}
              </code>
            </div>
          </div>
        ))}

        <div className="settings-form-actions">
          <button className="btn-primary" onClick={handleGenerate}>
            <FiPlus size={14} />
            Generate New API Key
          </button>
        </div>
      </SettingsCard>

      {/* Webhook URL */}
      <SettingsCard title="Webhook Configuration">
        <div className="apikey-webhook-section">
          <div className="settings-input-group">
            <label>Webhook URL</label>
            <div className="apikey-webhook-input-row">
              <div className="apikey-webhook-icon-wrap">
                <FiLink className="apikey-webhook-icon" />
              </div>
              <input
                className="settings-input apikey-webhook-input"
                type="url"
                value={webhookUrl}
                onChange={(e) => {
                  setWebhookUrl(e.target.value);
                  setWebhookSaved(false);
                }}
                placeholder="https://your-app.com/webhooks/contractiq"
              />
            </div>
            <span className="apikey-webhook-hint">
              We'll POST contract events (created, signed, renewed) to this URL.
            </span>
          </div>
          <div className="apikey-webhook-actions">
            <button className="btn-primary" onClick={handleWebhookSave}>
              {webhookSaved ? '✓ Saved' : 'Save Webhook URL'}
            </button>
            <button className="btn-secondary">Test Webhook</button>
          </div>
        </div>
      </SettingsCard>
    </div>
  );
};

export default APIKeys;
