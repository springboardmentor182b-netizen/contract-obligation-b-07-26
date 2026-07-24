import { useEffect, useState, useCallback } from 'react';
import * as settingsApi from '../services/settingsApi';

/**
 * @param {boolean} isAdmin - whether to also load organization settings.
 *   Pass useAuth().hasRole(['Administrator']) from the page.
 */
export function useSettings(isAdmin = false) {
  const [profile, setProfile] = useState(null);
  const [notifications, setNotifications] = useState(null);
  const [organization, setOrganization] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);
  const [savingNotifications, setSavingNotifications] = useState(false);
  const [savingOrganization, setSavingOrganization] = useState(false);

  const fetchAll = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const calls = [settingsApi.getProfile(), settingsApi.getNotificationPreferences()];
      if (isAdmin) calls.push(settingsApi.getOrganizationSettings());

      const [profileRes, notificationsRes, organizationRes] = await Promise.all(calls);
      setProfile(profileRes);
      setNotifications(notificationsRes);
      if (isAdmin) setOrganization(organizationRes);
    } catch (err) {
      setError(err.message || 'Failed to load settings.');
    } finally {
      setLoading(false);
    }
  }, [isAdmin]);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  async function saveProfile(payload) {
    setSavingProfile(true);
    try {
      const updated = await settingsApi.updateProfile(payload);
      setProfile(updated);
      return updated;
    } finally {
      setSavingProfile(false);
    }
  }

  async function savePassword(currentPassword, newPassword) {
    setSavingPassword(true);
    try {
      await settingsApi.changePassword(currentPassword, newPassword);
    } finally {
      setSavingPassword(false);
    }
  }

  async function saveNotifications(payload) {
    setSavingNotifications(true);
    try {
      const updated = await settingsApi.updateNotificationPreferences(payload);
      setNotifications(updated);
      return updated;
    } finally {
      setSavingNotifications(false);
    }
  }

  async function saveOrganization(payload) {
    setSavingOrganization(true);
    try {
      const updated = await settingsApi.updateOrganizationSettings(payload);
      setOrganization(updated);
      return updated;
    } finally {
      setSavingOrganization(false);
    }
  }

  return {
    profile,
    notifications,
    organization,
    loading,
    error,
    refetch: fetchAll,
    saveProfile,
    savingProfile,
    savePassword,
    savingPassword,
    saveNotifications,
    savingNotifications,
    saveOrganization,
    savingOrganization,
  };
}
