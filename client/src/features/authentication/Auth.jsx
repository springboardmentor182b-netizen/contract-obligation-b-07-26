import { useMemo, useState } from 'react'
import { ForgotPasswordForm } from './components/ForgotPasswordForm'
import { LoginForm } from './components/LoginForm'
import { RegisterForm } from './components/RegisterForm'
import { API_BASE_URL, emptyCredentials, emptyPasswordReset, emptyRegistration } from './constants'
import { login, post } from '../../../api';
import { canSubmitLogin, canSubmitPasswordReset, canSubmitRegistration } from './utils/authValidation'

export function Auth() {
  const [mode, setMode] = useState('login')
  const [formData, setFormData] = useState(emptyCredentials)
  const [registrationData, setRegistrationData] = useState(emptyRegistration)
  const [passwordResetData, setPasswordResetData] = useState(emptyPasswordReset)
  const [rememberMe, setRememberMe] = useState(true)
  const [status, setStatus] = useState('idle')
  const [message, setMessage] = useState('')
  const [roleTouched, setRoleTouched] = useState(false)

  const canSubmit = useMemo(() => canSubmitLogin(formData, roleTouched), [formData, roleTouched])
  const canRegister = useMemo(() => canSubmitRegistration(registrationData), [registrationData])
  const canResetPassword = useMemo(() => canSubmitPasswordReset(passwordResetData), [passwordResetData])

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
      const result = await login(formData.email, formData.password)

      window.localStorage.setItem('access_token', result.access_token)
      if (rememberMe) {
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
      await post('/users/', {
        email: registrationData.email,
        password: registrationData.password,
        full_name: registrationData.name,
        role: registrationData.role,
        department: registrationData.department || null,
      })

      setFormData({
        ...emptyCredentials,
        email: registrationData.email,
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
      await post('/auth/forgot-password', passwordResetData)
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
            <LoginForm
              canSubmit={canSubmit}
              formData={formData}
              message={message}
              onChange={handleChange}
              onRememberChange={setRememberMe}
              onSubmit={handleSubmit}
              onSwitchMode={switchMode}
              rememberMe={rememberMe}
              roleTouched={roleTouched}
              status={status}
            />
          ) : mode === 'register' ? (
            <RegisterForm
              canRegister={canRegister}
              message={message}
              onChange={handleRegistrationChange}
              onSubmit={handleRegisterSubmit}
              onSwitchMode={switchMode}
              registrationData={registrationData}
              status={status}
            />
          ) : (
            <ForgotPasswordForm
              canResetPassword={canResetPassword}
              message={message}
              onChange={handlePasswordResetChange}
              onSubmit={handlePasswordResetSubmit}
              onSwitchMode={switchMode}
              passwordResetData={passwordResetData}
              status={status}
            />
          )}
        </div>
      </section>
    </main>
  )
}
