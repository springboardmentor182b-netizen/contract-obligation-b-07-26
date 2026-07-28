import React, { useState } from 'react';
import { useAnalytics } from '../components/context/AnalyticsContext';
import FormInput from '../components/Form/FormInput';
import { Button } from '../components/Buttons/ButtonGroup';
import './Settings.css';

const Settings = () => {
  const { user, updateUser } = useAnalytics();
  const [formData, setFormData] = useState({
    firstName: user?.first_name || '',
    lastName: user?.last_name || '',
    email: user?.email || ''
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser({
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email
    });
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="settings-page">
      <h1>Settings</h1>
      
      <div className="settings-container">
        <div className="settings-section">
          <h2>Profile Information</h2>
          {success && (
            <div className="success-message">Profile updated successfully!</div>
          )}
          
          <form onSubmit={handleSubmit}>
            <FormInput
              label="First Name"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            
            <FormInput
              label="Last Name"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            
            <FormInput
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            
            <div className="settings-info">
              <p><strong>Role:</strong> {user?.role}</p>
            </div>
            
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
