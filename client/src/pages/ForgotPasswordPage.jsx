import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ForgotPasswordPage.css';

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [demoOtp, setDemoOtp] = useState(''); // Store demo OTP

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await axios.post('/api/auth/forgot-password', { email });
      setSuccess(response.data.message);
      
      // Store demo OTP if available
      if (response.data.demo_otp) {
        setDemoOtp(response.data.demo_otp);
      }
      
      // Redirect to verify code page after 3 seconds
      setTimeout(() => {
        navigate('/forgot-password/verify', { 
          state: { 
            email,
            demoOtp: response.data.demo_otp // Pass OTP to verify page
          } 
        });
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to send reset code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="left-panel">
        <div className="logo">
          <div className="logo-icon">C</div>
          <span className="logo-text">ContractIQ</span>
        </div>

        <h1 className="title">Reset Password</h1>
        <p className="subtitle">We'll send you a code to reset your password securely.</p>

        <div className="features">
          <div className="feature-item">
            <span className="icon">✓</span>
            <span>Secure verification code</span>
          </div>
          <div className="feature-item">
            <span className="icon">✓</span>
            <span>Valid for 15 minutes</span>
          </div>
          <div className="feature-item">
            <span className="icon">✓</span>
            <span>One-time use only</span>
          </div>
          <div className="feature-item">
            <span className="icon">🔒</span>
            <span>Your security matters</span>
          </div>
        </div>

        <div className="footer">
          <p>© Secured by JWT · Authentication · Help</p>
        </div>
      </div>

      <div className="right-panel">
        <div className="auth-container">
          <h2 className="auth-title">Forgot<br />Password</h2>
          <p className="auth-subtitle">Enter your email to receive a reset code</p>

          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          
          {/* 🎯 DEMO MODE: Show OTP Code */}
          {demoOtp && (
            <div className="alert alert-info" style={{
              background: '#e3f2fd',
              color: '#1976d2',
              border: '2px solid #1976d2',
              padding: '20px',
              borderRadius: '8px',
              marginBottom: '20px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '14px', marginBottom: '10px', fontWeight: '600' }}>
                🔐 DEMO MODE - Your Reset Code:
              </div>
              <div style={{ 
                fontSize: '32px', 
                fontWeight: 'bold', 
                letterSpacing: '8px',
                fontFamily: 'monospace',
                color: '#0d47a1'
              }}>
                {demoOtp}
              </div>
              <div style={{ fontSize: '12px', marginTop: '10px', opacity: 0.8 }}>
                Copy this code for the next step
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Email Address *</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <small>We'll send a 6-digit code to this email</small>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Sending...' : 'Send Reset Code →'}
            </button>

            <p className="back-to-login">
              Remember your password? <a href="/login">Sign In</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
