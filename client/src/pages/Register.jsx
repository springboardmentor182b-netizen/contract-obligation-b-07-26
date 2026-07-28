import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../features/authentication/RegisterForm';

export default function Register() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f3f4f6', width: '100%' }}>
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05), 0 10px 15px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
        
        <h2 style={{ margin: '0 0 8px 0', fontSize: '24px', color: '#111827', textAlign: 'center', fontWeight: 'bold' }}>Create an account</h2>
        <p style={{ margin: '0 0 32px 0', fontSize: '14px', color: '#6b7280', textAlign: 'center' }}>
          Join ContractIQ to manage your logs.
        </p>
        
        <RegisterForm />
        
        <p style={{ marginTop: '24px', fontSize: '14px', color: '#6b7280', textAlign: 'center' }}>
          Already have an account? <Link to="/login" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '600' }}>Log in</Link>
        </p>
      </div>
    </div>
  );
}