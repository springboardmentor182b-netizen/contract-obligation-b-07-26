import React from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div style={{ padding: '50px' }}>
      <h1>Login Page</h1>
      <p>Notice there is no Navbar or Footer here.</p>
      <Link to="/">Go back to Home</Link>
    </div>
  );
}