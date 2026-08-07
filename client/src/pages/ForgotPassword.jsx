import React from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  return (
    <div style={{ padding: '50px' }}>
      <h1>Forgot Password</h1>
      <Link to="/login">Back to Login</Link>
    </div>
  );
}