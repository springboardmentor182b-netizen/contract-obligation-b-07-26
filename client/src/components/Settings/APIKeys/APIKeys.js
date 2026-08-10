import React, { useEffect, useState } from 'react';
import { FiCopy, FiKey, FiPlus, FiTrash2 } from 'react-icons/fi';
import SettingsCard from '../SettingsCard';
import '../SettingsShared.css';
import './APIKeys.css';
import { createApiKey, getApiKeys, revokeApiKey, updateWebhook } from '../../../api/settingsApi';

const APIKeys = () => {
  const [keys, setKeys] = useState([]);
  const [webhookUrl, setWebhookUrl] = useState('');
  const [newSecret, setNewSecret] = useState('');
  const [message, setMessage] = useState('');

  const load = async () => {
    try {
      const data = await getApiKeys();
      setKeys(data.keys || []);
      setWebhookUrl(data.webhook_url || '');
    } catch { setMessage('Unable to load API keys.'); }
  };

  useEffect(() => { load(); }, []);

  const generate = async () => {
    try {
      const created = await createApiKey({ label: 'ContractIQ API Key', environment: 'Production' });
      setNewSecret(created.secret);
      setKeys((current) => [created, ...current]);
      setMessage('Copy the new key now. It will not be shown again.');
    } catch { setMessage('Unable to generate an API key.'); }
  };

  const revoke = async (id) => {
    if (!window.confirm('Revoke this API key? Applications using it will stop working.')) return;
    try {
      await revokeApiKey(id);
      setKeys((current) => current.filter((key) => key.id !== id));
      setMessage('API key revoked.');
    } catch { setMessage('Unable to revoke the API key.'); }
  };

  const saveWebhook = async () => {
    try {
      await updateWebhook(webhookUrl);
      setMessage('Webhook URL saved.');
    } catch { setMessage('Enter a valid http:// or https:// webhook URL.'); }
  };

  const copy = async (value) => {
    await navigator.clipboard.writeText(value);
    setMessage('Copied to clipboard.');
  };

  return <div className="settings-section">
    <div className="section-header"><h2>API Keys</h2><p>Manage keys and webhook settings for ContractIQ access.</p></div>
    {message && <div className="org-save-toast">{message}</div>}
    <SettingsCard title="API Keys">
      {newSecret && <div className="apikey-value-row"><code className="apikey-value apikey-value--revealed">{newSecret}</code><button className="btn-secondary" onClick={() => copy(newSecret)}><FiCopy size={13} /> Copy</button></div>}
      {keys.length === 0 && <div className="security-empty">No active API keys.</div>}
      {keys.map((key) => <div key={key.id} className="apikey-row"><div className="apikey-row-top"><div className="apikey-meta"><div className="apikey-label"><FiKey className="apikey-icon" />{key.label}<span className="apikey-env-badge apikey-env-badge--production">{key.environment}</span></div><div className="apikey-created">Created {new Date(key.created_at).toLocaleString()}</div></div><div className="apikey-actions"><button className="btn-danger apikey-btn" onClick={() => revoke(key.id)}><FiTrash2 size={13} />Revoke</button></div></div><div className="apikey-value-row"><code className="apikey-value">{key.key_prefix}••••••••••••••••</code></div></div>)}
      <div className="settings-form-actions"><button className="btn-primary" onClick={generate}><FiPlus size={14} />Generate New API Key</button></div>
    </SettingsCard>
    <SettingsCard title="Webhook Configuration"><div className="apikey-webhook-section"><div className="settings-input-group"><label>Webhook URL</label><input className="settings-input" type="url" value={webhookUrl} onChange={(event) => setWebhookUrl(event.target.value)} placeholder="https://your-app.com/webhooks/contractiq" /></div><div className="apikey-webhook-actions"><button className="btn-primary" onClick={saveWebhook}>Save Webhook URL</button></div></div></SettingsCard>
  </div>;
};

export default APIKeys;
