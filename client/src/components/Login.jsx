import { useState } from 'react'
import './Login.scss'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  const onLogin = (e) => {
    e.preventDefault()
    console.log('Login attempt', { email, password, rememberMe })
  }

  const onSignup = (e) => {
    e.preventDefault()
    console.log('Navigate to signup')
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Contract Management System</h1>
        <p className="subtitle">Sign in to your account</p>

        <form onSubmit={onLogin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
          </div>

          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="remember"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember">Remember me</label>
          </div>

          <button type="submit" className="btn btn-primary btn-block">Sign In</button>
        </form>

        <div className="signup-link">
          <p>Don't have an account? <a href="#" onClick={onSignup}>Sign up</a></p>
        </div>
      </div>
    </div>
  )
}

export default Login
