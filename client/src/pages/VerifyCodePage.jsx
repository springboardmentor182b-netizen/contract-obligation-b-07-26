import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './ForgotPasswordPage.css';

const VerifyCodePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const demoOtp = location.state?.demoOtp; // Get demo OTP from state

  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentDemoOtp, setCurrentDemoOtp] = useState(demoOtp || ''); // Store current OTP

  useEffect(() => {
    if (!email) {
      navigate('/forgot-password');
    }
  }, [email, navigate]);

  const handleResendCode = async () => {
    try {
      const response = await axios.post('/api/auth/forgot-password', { email });
      
      // Update demo OTP if available
      if (response.data.demo_otp) {
        setCurrentDemoOtp(response.data.demo_otp);
      }
      
      setSuccess('New code sent to your email');
      setError('');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to resend code');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await axios.post('/api/auth/verify-otp', { email, otp: code });
      setSuccess('Code verified! Redirecting...');
      
      // Redirect to reset password page
      setTimeout(() => {
        navigate('/forgot-password/reset', { state: { email, otp: code } });
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.detail || 'Invalid code. Please try again.');
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
          <h2 className="auth-title">Enter Code</h2>
          <p className="auth-subtitle">
            Enter the 6-digit code sent to <strong>{email}</strong>
          </p>

          {error && <div className="alert alert-error">{error}</div>}
          {success && <div className="alert alert-success">{success}</div>}
          
          {/* 🎯 DEMO MODE: Show OTP Code */}
          {currentDemoOtp && (
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
                🔐 DEMO MODE - Your Verification Code:
              </div>
              <div style={{ 
                fontSize: '32px', 
                fontWeight: 'bold', 
                letterSpacing: '8px',
                fontFamily: 'monospace',
                color: '#0d47a1'
              }}>
                {currentDemoOtp}
              </div>
              <div style={{ fontSize: '12px', marginTop: '10px', opacity: 0.8 }}>
                Copy and paste this code below
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label>Reset Code *</label>
              <input
                type="text"
                name="code"
                placeholder="Enter 6-digit code"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                maxLength="6"
                required
                className="code-input"
              />
              <small>Check your email for the code</small>
            </div>

            <button type="submit" className="submit-btn" disabled={loading || code.length !== 6}>
              {loading ? 'Verifying...' : 'Verify Code →'}
            </button>

            <p className="resend-code">
              Didn't receive code? <button type="button" onClick={handleResendCode} className="link-btn">Resend Code</button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyCodePage;
