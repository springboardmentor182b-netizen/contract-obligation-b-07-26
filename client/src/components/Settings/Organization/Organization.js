import React, { useEffect, useState } from 'react';
import {
  FiGrid,
  FiGlobe,
  FiCreditCard,
  FiDatabase,
  FiClock,
  FiHeadphones,
} from 'react-icons/fi';
import SettingsCard from '../SettingsCard';
import SettingsRow from '../SettingsRow';
import '../SettingsShared.css';
import './Organization.css';
import { getOrganization, updateOrganization } from '../../../api/settingsApi';

const INITIAL_ORG = [
  {
    id: 'company',
    icon: <FiGrid />,
    iconBg: '#eff6ff',
    iconColor: '#3b82f6',
    title: 'Company Name',
    value: 'ContractIQ Inc.',
    field: 'company',
  },
  {
    id: 'domain',
    icon: <FiGlobe />,
    iconBg: '#f0fdf4',
    iconColor: '#16a34a',
    title: 'Domain',
    value: 'contractiq.com',
    field: 'domain',
  },
  {
    id: 'billing_plan',
    icon: <FiCreditCard />,
    iconBg: '#faf5ff',
    iconColor: '#7c3aed',
    title: 'Billing Plan',
    value: 'Enterprise — 25 seats',
    field: 'billing_plan',
  },
  {
    id: 'data_region',
    icon: <FiDatabase />,
    iconBg: '#fff7ed',
    iconColor: '#ea580c',
    title: 'Data Region',
    value: 'US East (N. Virginia)',
    field: 'data_region',
  },
  {
    id: 'timezone',
    icon: <FiClock />,
    iconBg: '#f3f4f6',
    iconColor: '#6b7280',
    title: 'Timezone',
    value: 'America/New_York (UTC-5)',
    field: 'timezone',
  },
  {
    id: 'support',
    icon: <FiHeadphones />,
    iconBg: '#fef2f2',
    iconColor: '#dc2626',
    title: 'Support Contact',
    value: 'support@contractiq.com',
    field: 'support',
  },
];

const Organization = () => {
  const [orgData, setOrgData] = useState(() => {
    const data = {};
    INITIAL_ORG.forEach((item) => {
      data[item.field] = item.value;
    });
    return data;
  });

  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getOrganization().then((data) => {
      if (data && typeof data === 'object') setOrgData((current) => ({ ...current, ...data }));
    }).catch(() => {});
  }, []);

  const startEdit = (field, currentValue) => {
    setEditingField(field);
    setEditValue(currentValue);
  };

  const cancelEdit = () => {
    setEditingField(null);
    setEditValue('');
  };

  const saveEdit = async (field) => {
    const next = { ...orgData, [field]: editValue };
    try {
      await updateOrganization(next);
      setOrgData(next);
      setEditingField(null);
      setEditValue('');
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch { setSaved(false); }
  };

  return (
    <div className="settings-section">
      <div className="section-header">
        <h2>Organization Settings</h2>
        <p>Manage your company profile, plan, and data preferences</p>
      </div>

      {saved && (
        <div className="org-save-toast">✓ Organization settings updated successfully</div>
      )}

      <SettingsCard>
        {INITIAL_ORG.map((item) => (
          <div key={item.id}>
            <SettingsRow
              icon={item.icon}
              iconBg={item.iconBg}
              iconColor={item.iconColor}
              title={item.title}
              subtitle={orgData[item.field]}
              action={
                editingField === item.field ? null : (
                  <button
                    className="btn-link"
                    onClick={() => startEdit(item.field, orgData[item.field])}
                  >
                    Edit
                  </button>
                )
              }
            />
            {editingField === item.field && (
              <div className="org-edit-row">
                <input
                  className="settings-input"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  autoFocus
                />
                <button className="btn-primary" onClick={() => saveEdit(item.field)}>
                  Save
                </button>
                <button className="btn-secondary" onClick={cancelEdit}>
                  Cancel
                </button>
              </div>
            )}
          </div>
        ))}
      </SettingsCard>
    </div>
  );
};

export default Organization;
