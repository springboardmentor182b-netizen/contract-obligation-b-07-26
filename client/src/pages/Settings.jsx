import React, { useState } from 'react';
import { useAuth } from '../features/authentication/authContext';
import { useSettings } from '../hooks/useSettings';
import ProfileSection from '../features/settings/ProfileSection';
import PasswordSection from '../features/settings/PasswordSection';
import NotificationPreferences from '../features/settings/NotificationPreferences';
import OrganizationSettings from '../features/settings/OrganizationSettings';

const TABS = [
  { key: 'profile', label: 'Profile' },
  { key: 'security', label: 'Security' },
  { key: 'notifications', label: 'Notifications' },
  { key: 'organization', label: 'Organization', adminOnly: true },
];

function SettingsSkeleton() {
  return (
    <div className="max-w-lg space-y-3 animate-pulse">
      <div className="h-40 bg-slate-100 rounded-xl" />
    </div>
  );
}
import Input from '../components/common/Input';
import Button from '../components/common/Button';

export default function Settings() {
  return (
    <div style={{ padding: '24px', backgroundColor: '#fafafa', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* Page Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ margin: 0, fontSize: '24px', color: '#111827' }}>Account Settings</h1>
        <p style={{ margin: '4px 0 0 0', color: '#6b7280', fontSize: '14px' }}>
          Manage your account preferences and personal information.
        </p>
      </div>

      {/* Settings Form Container */}
      <div style={{ backgroundColor: 'white', padding: '32px', borderRadius: '8px', border: '1px solid #e5e7eb', maxWidth: '600px' }}>
        <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', color: '#111827', borderBottom: '1px solid #e5e7eb', paddingBottom: '12px' }}>
          Profile Information
        </h3>
        
        <form onSubmit={(e) => e.preventDefault()}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <Input label="First Name" name="firstName" placeholder="Alexandra" />
            <Input label="Last Name" name="lastName" placeholder="Thornton" />
          </div>
          
          <Input label="Email Address" type="email" name="email" placeholder="admin@contractiq.com" />
          <Input label="Job Title" name="jobTitle" placeholder="System Administrator" />
          
          <div style={{ marginTop: '32px', display: 'flex', justifyContent: 'flex-end' }}>
            <Button type="submit">Save Changes</Button>
          </div>
        </form>
      </div>

    </div>
  );
}
