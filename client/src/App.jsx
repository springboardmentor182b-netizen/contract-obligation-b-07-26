import { useMemo, useState } from 'react'
import { forgotPassword } from './features/authentication/services/forgotPassword'
import { login } from './features/authentication/services/login'
import { signup } from './features/authentication/services/signup'
import './App.css'

const API_BASE_URL = 'http://127.0.0.1:8000'
const emptyCredentials = {
  email: '',
  password: '',
  role: '',
}
const roles = [
  'Administrator',
  'Legal Manager',
  'Compliance Officer',
  'Contract Manager',
  'Department Head',
  'Employee',
]
const emptyRegistration = {
  name: '',
  email: '',
  password: '',
  role: '',
  department: '',
}
const emptyPasswordReset = {
  email: '',
  new_password: '',
}
const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/

function App() {
  const [mode, setMode] = useState('login')
  const [formData, setFormData] = useState(emptyCredentials)
  const [registrationData, setRegistrationData] = useState(emptyRegistration)
  const [passwordResetData, setPasswordResetData] = useState(emptyPasswordReset)
  const [rememberMe, setRememberMe] = useState(true)
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  const [roleTouched, setRoleTouched] = useState(false)

  const canSubmit = useMemo(() => {
    return formData.email.includes('@') && passwordPattern.test(formData.password) && roleTouched && Boolean(formData.role)
  }, [formData, roleTouched])

  const canRegister = useMemo(() => {
    return (
      registrationData.name.trim().length >= 2 &&
      registrationData.email.includes('@') &&
      passwordPattern.test(registrationData.password)
    )
  }, [registrationData])

  const canResetPassword = useMemo(() => {
    return passwordResetData.email.includes('@') && passwordPattern.test(passwordResetData.new_password)
  }, [passwordResetData])

  function handleChange(event) {
    const { name, value } = event.target
    if (name === 'role') {
      setRoleTouched(true)
    }
    setFormData((current) => ({ ...current, [name]: value }))
  }

  function handleRegistrationChange(event) {
    const { name, value } = event.target
    setRegistrationData((current) => ({ ...current, [name]: value }))
  }

  function handlePasswordResetChange(event) {
    const { name, value } = event.target
    setPasswordResetData((current) => ({ ...current, [name]: value }))
  }

  function switchMode(nextMode) {
    setMode(nextMode)
    setStatus('idle')
    setMessage('')
  }

  async function handleSubmit(event) {
    event.preventDefault()

    if (!canSubmit) {
      setStatus('error')
      setMessage('Enter a valid email, select a role, and use a stronger password.')
      return
    }

    setStatus('loading')
    setMessage('')

    try {
      const result = await login(API_BASE_URL, formData)

      if (rememberMe) {
        window.localStorage.setItem('contractiq_token', result.access_token)
        window.localStorage.setItem('contractiq_role', formData.role)
      }

      setStatus('success')
      setMessage(`Login successful as ${formData.role}. Token saved for the current frontend session.`)
    } catch (error) {
      setStatus('error')
      setMessage(error.message)
    }
  }

  async function handleRegisterSubmit(event) {
    event.preventDefault()

    if (!canRegister) {
      setStatus('error')
      setMessage('Enter your name, valid email, selected role, and a stronger password.')
      return
    }

    setStatus('loading')
    setMessage('')

    try {
      await signup(API_BASE_URL, {
        ...registrationData,
        department: registrationData.department || null,
      })

      setFormData({
        email: registrationData.email,
        password: '',
      })
      setRegistrationData(emptyRegistration)
      setMode('login')
      setStatus('success')
      setMessage('Account created. Sign in with your registered email.')
    } catch (error) {
      setStatus('error')
      setMessage(error.message)
    }
  }

  async function handlePasswordResetSubmit(event) {
    event.preventDefault()

    if (!canResetPassword) {
      setStatus('error')
      setMessage('Enter your registered email and a stronger new password.')
      return
    }

    setStatus('loading')
    setMessage('')

    try {
      await forgotPassword(API_BASE_URL, passwordResetData)
      setFormData({
        ...emptyCredentials,
        email: passwordResetData.email,
      })
      setPasswordResetData(emptyPasswordReset)
      setMode('login')
      setStatus('success')
      setMessage('Password reset successful. Sign in with your new password.')
    } catch (error) {
      setStatus('error')
      setMessage(error.message)
    }
  }

  return (
    <main className="login-page">
      <section className="login-panel" aria-labelledby="login-title">
        <div className="login-card">
          <div className="brand-block">
            <div className="brand-mark" aria-hidden="true">
              C
            </div>
            <div>
              <p className="eyebrow">Contract obligation platform</p>
              <h1 id="login-title">Contract Obligation Tracking Assistant</h1>
              <p className="intro">
                Manage contracts, renewals, obligations, and compliance activity from one secure workspace.
              </p>
            </div>
          </div>

          {mode === 'login' ? (
            <form className="login-form" onSubmit={handleSubmit}>
              <label className="field">
                <span>Email address</span>
                <input
                  autoComplete="email"
                  name="email"
                  onChange={handleChange}
                  placeholder="Enter your work email"
                  type="email"
                  value={formData.email}
                />
                <span className="field-hint">Use your registered work email address.</span>
              </label>

              <label className="field">
                <span>Password</span>
                <input
                  autoComplete="current-password"
                  name="password"
                  onChange={handleChange}
                  placeholder="Enter your password"
                  type="password"
                  value={formData.password}
                />
                <span className="field-hint">Use 8+ characters with uppercase, lowercase, and a special character.</span>
              </label>

              <label className="field">
                <span>Role</span>
                <select name="role" onChange={handleChange} required value={roleTouched ? formData.role : ''}>
                  <option value="">
                    Select the role
                  </option>
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </label>

              <div className="form-row">
                <label className="remember">
                  <input
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                    type="checkbox"
                  />
                  <span>Remember me</span>
                </label>
                <button className="link-button" onClick={() => switchMode('forgot-password')} type="button">
                  Forgot password?
                </button>
              </div>

              {message ? <p className={`status-message ${status}`}>{message}</p> : null}

              <button className="primary-button" disabled={!canSubmit || status === 'loading'} type="submit">
                {status === 'loading' ? 'Signing in...' : 'Sign in'}
              </button>

              <div className="register-row">
                <span>New to ContractIQ?</span>
                <button className="link-button" onClick={() => switchMode('register')} type="button">
                  Register account
                </button>
              </div>
            </form>
          ) : mode === 'register' ? (
            <form className="login-form" onSubmit={handleRegisterSubmit}>
              <label className="field">
                <span>Full name</span>
                <input
                  autoComplete="name"
                  name="name"
                  onChange={handleRegistrationChange}
                  placeholder="Enter your full name"
                  type="text"
                  value={registrationData.name}
                />
                <span className="field-hint">Use at least 2 characters.</span>
              </label>

              <label className="field">
                <span>Email address</span>
                <input
                  autoComplete="email"
                  name="email"
                  onChange={handleRegistrationChange}
                  placeholder="Enter your work email"
                  type="email"
                  value={registrationData.email}
                />
                <span className="field-hint">Use a valid work email address.</span>
              </label>

              <label className="field">
                <span>Password</span>
                <input
                  autoComplete="new-password"
                  name="password"
                  onChange={handleRegistrationChange}
                  placeholder="Create a password"
                  type="password"
                  value={registrationData.password}
                />
                <span className="field-hint">Use 8+ characters with uppercase, lowercase, and a special character.</span>
              </label>

              <label className="field">
                <span>Role</span>
                <select name="role" onChange={handleRegistrationChange} required value={registrationData.role}>
                  <option value="">
                    Select the role
                  </option>
                  {roles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </label>

              <label className="field">
                <span>Department</span>
                <input
                  autoComplete="organization-title"
                  name="department"
                  onChange={handleRegistrationChange}
                  placeholder="Enter department"
                  type="text"
                  value={registrationData.department}
                />
              </label>

              {message ? <p className={`status-message ${status}`}>{message}</p> : null}

              <button className="primary-button" disabled={!canRegister || status === 'loading'} type="submit">
                {status === 'loading' ? 'Creating account...' : 'Create account'}
              </button>

              <div className="register-row">
                <span>Already registered?</span>
                <button className="link-button" onClick={() => switchMode('login')} type="button">
                  Back to sign in
                </button>
              </div>
            </form>
          ) : (
            <form className="login-form" onSubmit={handlePasswordResetSubmit}>
              <label className="field">
                <span>Registered email</span>
                <input
                  autoComplete="email"
                  name="email"
                  onChange={handlePasswordResetChange}
                  placeholder="Enter your registered email"
                  type="email"
                  value={passwordResetData.email}
                />
                <span className="field-hint">Use the email linked to your account.</span>
              </label>

              <label className="field">
                <span>New password</span>
                <input
                  autoComplete="new-password"
                  name="new_password"
                  onChange={handlePasswordResetChange}
                  placeholder="Create a new password"
                  type="password"
                  value={passwordResetData.new_password}
                />
                <span className="field-hint">Use 8+ characters with uppercase, lowercase, and a special character.</span>
              </label>

              {message ? <p className={`status-message ${status}`}>{message}</p> : null}

              <button className="primary-button" disabled={!canResetPassword || status === 'loading'} type="submit">
                {status === 'loading' ? 'Resetting password...' : 'Reset password'}
              </button>

              <div className="register-row">
                <span>Remember your password?</span>
                <button className="link-button" onClick={() => switchMode('login')} type="button">
                  Back to sign in
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </main>
  )
}

export default App
