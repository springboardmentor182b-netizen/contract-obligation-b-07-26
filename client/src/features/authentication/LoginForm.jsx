import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { useAuth } from './authContext';

export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth(); // Bring in the login function from context
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Call the global login function
    login(formData.email, formData.password);
    
    // Navigate to the dashboard after logging in
    navigate('/dashboard'); 
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <Input label="Email Address" type="email" name="email" placeholder="admin@contractiq.com" value={formData.email} onChange={handleChange} />
      <Input label="Password" type="password" name="password" placeholder="••••••••" value={formData.password} onChange={handleChange} />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <label style={{ fontSize: '14px', color: '#4b5563', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
          <input type="checkbox" style={{ cursor: 'pointer' }} /> Remember me
        </label>
        <Link to="/forgot-password" style={{ fontSize: '14px', color: '#2563eb', textDecoration: 'none', fontWeight: '500' }}>
          Forgot password?
        </Link>
      </div>

      <Button type="submit" fullWidth>Sign In</Button>
    </form>
  );
}