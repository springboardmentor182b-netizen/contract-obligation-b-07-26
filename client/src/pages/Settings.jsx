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

export default function Settings() {
  const { hasRole } = useAuth();
  const isAdmin = hasRole(['Administrator']);

  const {
    profile,
    notifications,
    organization,
    loading,
    error,
    refetch,
    saveProfile,
    savingProfile,
    savePassword,
    savingPassword,
    saveNotifications,
    savingNotifications,
    saveOrganization,
    savingOrganization,
  } = useSettings(isAdmin);

  const [activeTab, setActiveTab] = useState('profile');
  const visibleTabs = TABS.filter((t) => !t.adminOnly || isAdmin);

  return (
    <div className="flex-1 flex flex-col overflow-y-auto bg-slate-50">
      <main className="p-8 space-y-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">Settings</h1>
          <p className="text-sm text-slate-400 mt-1">Manage your profile, security, and notification preferences</p>
        </div>

        <div className="flex gap-1 border-b border-slate-200">
          {visibleTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition ${
                activeTab === tab.key
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {loading && <SettingsSkeleton />}

        {!loading && error && (
          <div className="max-w-lg text-center py-10">
            <p className="text-sm text-slate-600 mb-3">{error}</p>
            <button
              onClick={refetch}
              className="text-sm font-medium text-white bg-slate-900 rounded-lg px-4 py-2 hover:bg-slate-800"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && (
          <>
            {activeTab === 'profile' && <ProfileSection profile={profile} onSave={saveProfile} saving={savingProfile} />}
            {activeTab === 'security' && <PasswordSection onSave={savePassword} saving={savingPassword} />}
            {activeTab === 'notifications' && (
              <NotificationPreferences preferences={notifications} onSave={saveNotifications} saving={savingNotifications} />
            )}
            {activeTab === 'organization' && isAdmin && (
              <OrganizationSettings organization={organization} onSave={saveOrganization} saving={savingOrganization} />
            )}
          </>
        )}
      </main>
    </div>
  );
}
