import { roles } from '../constants'
import { StatusMessage } from './StatusMessage'

export function LoginForm({
  canSubmit,
  formData,
  message,
  onChange,
  onRememberChange,
  onSwitchMode,
  onSubmit,
  rememberMe,
  roleTouched,
  status,
}) {
  return (
    <form className="login-form" onSubmit={onSubmit}>
      <label className="field">
        <span>Email address</span>
        <input
          autoComplete="email"
          name="email"
          onChange={onChange}
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
          onChange={onChange}
          placeholder="Enter your password"
          type="password"
          value={formData.password}
        />
        <span className="field-hint">Use 8+ characters with uppercase, lowercase, and a special character.</span>
      </label>

      <label className="field">
        <span>Role</span>
        <select name="role" onChange={onChange} required value={roleTouched ? formData.role : ''}>
          <option value="">Select the role</option>
          {roles.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </label>

      <div className="form-row">
        <label className="remember">
          <input checked={rememberMe} onChange={(event) => onRememberChange(event.target.checked)} type="checkbox" />
          <span>Remember me</span>
        </label>
        <button className="link-button" onClick={() => onSwitchMode('forgot-password')} type="button">
          Forgot password?
        </button>
      </div>

      <StatusMessage message={message} status={status} />

      <button className="primary-button" disabled={!canSubmit || status === 'loading'} type="submit">
        {status === 'loading' ? 'Signing in...' : 'Sign in'}
      </button>

      <div className="register-row">
        <span>New to ContractIQ?</span>
        <button className="link-button" onClick={() => onSwitchMode('register')} type="button">
          Register account
        </button>
      </div>
    </form>
  )
}
