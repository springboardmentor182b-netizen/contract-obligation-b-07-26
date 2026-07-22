import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../features/authentication/LoginForm';

export default function Login() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f3f4f6', width: '100%' }}>
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05), 0 10px 15px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
        
        <h2 style={{ margin: '0 0 8px 0', fontSize: '24px', color: '#111827', textAlign: 'center', fontWeight: 'bold' }}>Welcome back</h2>
        <p style={{ margin: '0 0 32px 0', fontSize: '14px', color: '#6b7280', textAlign: 'center' }}>
          Please enter your details to sign in.
        </p>
        
        <LoginForm />
        
        <p style={{ marginTop: '24px', fontSize: '14px', color: '#6b7280', textAlign: 'center' }}>
          Don't have an account? <Link to="/register" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '600' }}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}