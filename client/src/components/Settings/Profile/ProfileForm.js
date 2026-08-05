import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateProfile } from '../../../api/settingsApi';
import { useUser } from '../../../context/UserContext';
import './ProfileForm.css';

const ProfileForm = () => {
  const { userData, isLoading: globalLoading, refreshUser, getInitials } = useUser();
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
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = React.createRef();

  useEffect(() => {
    if (userData) {
      const safeData = {
        first_name: userData.first_name || '',
        last_name: userData.last_name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        job_title: userData.job_title || '',
        department: userData.department || '',
        timezone: userData.timezone || 'America/New_York (UTC-5)',
        profile_image: userData.profile_image || ''
      };
      setFormData(safeData);
      setInitialData(safeData);
      if (userData.profile_image) {
        setImagePreview(userData.profile_image);
      }
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear validation error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.first_name.trim()) newErrors.first_name = 'First name is required';
    if (!formData.last_name.trim()) newErrors.last_name = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsSaving(true);
    try {
      await updateProfile(formData);
      await refreshUser();
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    if (initialData) {
      setFormData(initialData);
      setErrors({});
      setImagePreview(initialData.profile_image || null);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        setImagePreview(base64String);
        setFormData(prev => ({ ...prev, profile_image: base64String }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };


  return (
    <div className="profile-settings">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <h2>Profile Information</h2>
      
      <div className="profile-header-card">
        <div className="avatar-preview">
          {imagePreview ? (
            <img src={imagePreview} alt="Profile" />
          ) : (
            <div className="avatar-placeholder">
              {getInitials()}
            </div>
          )}
        </div>
        <div className="profile-details">
          <h3>{globalLoading ? 'Loading...' : (formData.first_name || formData.last_name ? `${formData.first_name} ${formData.last_name}` : 'User')}</h3>
          <p>{globalLoading ? 'Loading...' : (formData.job_title || '')}</p>
          <button className="btn-change-photo-text" type="button" onClick={handleButtonClick} disabled={globalLoading}>Change photo</button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageChange}
            accept="image/*"
            style={{ display: 'none' }}
          />
        </div>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label>First Name</label>
          <input 
            type="text" 
            name="first_name" 
            value={globalLoading ? 'Loading...' : formData.first_name} 
            onChange={handleChange} 
            className={errors.first_name ? 'input-error' : ''}
            disabled={globalLoading}
          />
          {errors.first_name && <span className="error-text">{errors.first_name}</span>}
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input 
            type="text" 
            name="last_name" 
            value={globalLoading ? 'Loading...' : formData.last_name} 
            onChange={handleChange} 
            className={errors.last_name ? 'input-error' : ''}
            disabled={globalLoading}
          />
          {errors.last_name && <span className="error-text">{errors.last_name}</span>}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input 
            type="email" 
            name="email" 
            value={globalLoading ? 'Loading...' : formData.email} 
            onChange={handleChange} 
            className={errors.email ? 'input-error' : ''}
            disabled={globalLoading}
          />
          {errors.email && <span className="error-text">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input type="tel" name="phone" value={globalLoading ? 'Loading...' : formData.phone} onChange={handleChange} disabled={globalLoading} />
        </div>
        <div className="form-group">
          <label>Job Title</label>
          <input type="text" name="job_title" value={globalLoading ? 'Loading...' : formData.job_title} onChange={handleChange} disabled={globalLoading} />
        </div>
        <div className="form-group">
          <label>Department</label>
          <input type="text" name="department" value={globalLoading ? 'Loading...' : formData.department} onChange={handleChange} disabled={globalLoading} />
        </div>
        <div className="form-group full-width">
          <label>Timezone</label>
          <select name="timezone" value={formData.timezone} onChange={handleChange} disabled={globalLoading}>
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

export default ProfileForm;
