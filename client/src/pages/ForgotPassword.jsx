import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import { ShieldCheck } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Sending reset link to:', email);
    setIsSubmitted(true);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f3f4f6', width: '100%' }}>
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05), 0 10px 15px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '16px' }}>
          <div style={{ backgroundColor: '#eff6ff', padding: '12px', borderRadius: '50%' }}>
            <ShieldCheck size={28} color="#2563eb" />
          </div>
        </div>

        <h2 style={{ margin: '0 0 8px 0', fontSize: '24px', color: '#111827', textAlign: 'center', fontWeight: 'bold' }}>Reset Password</h2>
        
        {!isSubmitted ? (
          <>
            <p style={{ margin: '0 0 24px 0', fontSize: '14px', color: '#6b7280', textAlign: 'center' }}>
              Enter your email address and we'll send you a link to reset your password.
            </p>
            
            <form onSubmit={handleSubmit}>
              <Input 
                label="Email Address" 
                type="email" 
                name="email" 
                placeholder="admin@contractiq.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
              <div style={{ marginTop: '24px' }}>
                <Button type="submit" fullWidth>Send Reset Link</Button>
              </div>
            </form>
          </>
        ) : (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <p style={{ color: '#10b981', fontWeight: '500', marginBottom: '16px' }}>
              Check your email! A reset link has been sent to {email}.
            </p>
          </div>
        )}
        
        <p style={{ marginTop: '24px', fontSize: '14px', color: '#6b7280', textAlign: 'center' }}>
          Remember your password? <Link to="/login" style={{ color: '#2563eb', textDecoration: 'none', fontWeight: '600' }}>Back to login</Link>
        </p>
      </div>
    </div>
  );
}