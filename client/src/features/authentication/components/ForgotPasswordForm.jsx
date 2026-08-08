import { StatusMessage } from './StatusMessage'

export function ForgotPasswordForm({
  canResetPassword,
  message,
  onChange,
  onSubmit,
  onSwitchMode,
  passwordResetData,
  status,
}) {
  return (
    <form className="login-form" onSubmit={onSubmit}>
      <label className="field">
        <span>Registered email</span>
        <input
          autoComplete="email"
          name="email"
          onChange={onChange}
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
          onChange={onChange}
          placeholder="Create a new password"
          type="password"
          value={passwordResetData.new_password}
        />
        <span className="field-hint">Use 8+ characters with uppercase, lowercase, and a special character.</span>
      </label>

      <StatusMessage message={message} status={status} />

      <button className="primary-button" disabled={!canResetPassword || status === 'loading'} type="submit">
        {status === 'loading' ? 'Resetting password...' : 'Reset password'}
      </button>

      <div className="register-row">
        <span>Remember your password?</span>
        <button className="link-button" onClick={() => onSwitchMode('login')} type="button">
          Back to sign in
        </button>
      </div>
    </form>
  )
}
