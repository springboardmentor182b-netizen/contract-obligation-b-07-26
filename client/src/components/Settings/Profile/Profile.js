import React, { useState, useEffect } from 'react';
import { getProfile, updateProfile } from '../../../api/settingsApi';
import './Profile.css';

const Profile = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    job_title: '',
    department: '',
    timezone: 'UTC',
    profile_image: ''
  });

  const [initialData, setInitialData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        const safeData = {
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          email: data.email || '',
          phone: data.phone || '',
          job_title: data.job_title || '',
          department: data.department || '',
          timezone: data.timezone || 'UTC',
          profile_image: data.profile_image || ''
        };
        setFormData(safeData);
        setInitialData(safeData);
      } catch (error) {
        setMessage({ type: 'error', text: 'Failed to load profile data.' });
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage({ type: '', text: '' });
    try {
      const data = await updateProfile(formData);
      setFormData(data);
      setInitialData(data);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update profile.' });
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (initialData) {
      setFormData(initialData);
      setMessage({ type: '', text: '' });
    }
  };

  if (isLoading) {
    return <div className="profile-loading">Loading profile...</div>;
  }

  // Get initials for avatar
  const getInitials = () => {
    const first = formData.first_name ? formData.first_name.charAt(0).toUpperCase() : '';
    const last = formData.last_name ? formData.last_name.charAt(0).toUpperCase() : '';
    return first + last || 'U';
  };

  return (
    <div className="profile-settings">
      <h2>Profile Information</h2>
      
      {message.text && (
        <div className={`message-banner ${message.type}`}>
          {message.text}
        </div>
      )}

      <div className="profile-header-card">
        <div className="avatar-preview">
          {formData.profile_image ? (
            <img src={formData.profile_image} alt="Profile" />
          ) : (
            <div className="avatar-placeholder">
              {getInitials()}
            </div>
          )}
        </div>
        <div className="profile-details">
          <h3>{formData.first_name || formData.last_name ? `${formData.first_name} ${formData.last_name}` : 'User'}</h3>
          <p>{formData.job_title || 'Legal Director'} • Joined Jan 2023</p>
          <button className="btn-change-photo-text" type="button">Change photo</button>
        </div>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>First Name</label>
          <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Job Title</label>
          <input type="text" name="job_title" value={formData.job_title} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Department</label>
          <input type="text" name="department" value={formData.department} onChange={handleChange} />
        </div>
        <div className="form-group full-width">
          <label>Timezone</label>
          <select name="timezone" value={formData.timezone} onChange={handleChange}>
            <option value="America/New_York (UTC-5)">America/New_York (UTC-5)</option>
            <option value="UTC">UTC (Universal Coordinated Time)</option>
            <option value="EST">EST (Eastern Standard Time)</option>
            <option value="CST">CST (Central Standard Time)</option>
            <option value="MST">MST (Mountain Standard Time)</option>
            <option value="PST">PST (Pacific Standard Time)</option>
            <option value="IST">IST (Indian Standard Time)</option>
          </select>
        </div>
      </div>

      <div className="form-actions">
        <button className="btn-save" onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
        <button className="btn-cancel" onClick={handleCancel} disabled={isSaving}>Cancel</button>
      </div>
    </div>
  );
};

export default Profile;
