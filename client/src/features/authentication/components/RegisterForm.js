import { roles } from '../constants'
import { StatusMessage } from './StatusMessage'

export function RegisterForm({ canRegister, message, onChange, onSubmit, onSwitchMode, registrationData, status }) {
  return (
    <form className="login-form" onSubmit={onSubmit}>
      <label className="field">
        <span>Full name</span>
        <input
          autoComplete="name"
          name="name"
          onChange={onChange}
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
          onChange={onChange}
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
          onChange={onChange}
          placeholder="Create a password"
          type="password"
          value={registrationData.password}
        />
        <span className="field-hint">Use 8+ characters with uppercase, lowercase, and a special character.</span>
      </label>

      <label className="field">
        <span>Role</span>
        <select name="role" onChange={onChange} required value={registrationData.role}>
          <option value="">Select the role</option>
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
          onChange={onChange}
          placeholder="Enter department"
          type="text"
          value={registrationData.department}
        />
      </label>

      <StatusMessage message={message} status={status} />

      <button className="primary-button" disabled={!canRegister || status === 'loading'} type="submit">
        {status === 'loading' ? 'Creating account...' : 'Create account'}
      </button>

      <div className="register-row">
        <span>Already registered?</span>
        <button className="link-button" onClick={() => onSwitchMode('login')} type="button">
          Back to sign in
        </button>
      </div>
    </form>
  )
}
