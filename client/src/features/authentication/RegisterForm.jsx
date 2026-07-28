import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

export default function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registering:', formData);
    navigate('/login'); 
  };

  return (
    <form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <Input label="Full Name" type="text" name="name" placeholder="Alexandra Thornton" value={formData.name} onChange={handleChange} />
      <Input label="Email Address" type="email" name="email" placeholder="admin@contractiq.com" value={formData.email} onChange={handleChange} />
      <Input label="Password" type="password" name="password" placeholder="••••••••" value={formData.password} onChange={handleChange} />
      
      <div style={{ marginBottom: '24px' }}></div>
      <Button type="submit" fullWidth>Create Account</Button>
    </form>
  );
}