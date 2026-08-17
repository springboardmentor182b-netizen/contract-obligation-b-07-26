export const passwordPattern = /^.{6,}$/

export function canSubmitLogin(formData, roleTouched) {
  return (
    formData.email.includes('@') &&
    formData.password.length >= 6 &&
    roleTouched &&
    Boolean(formData.role)
  )
}

export function canSubmitRegistration(registrationData) {
  return (
    registrationData.name.trim().length >= 2 &&
    registrationData.email.includes('@') &&
    registrationData.password.length >= 6 &&
    Boolean(registrationData.role)
  )
}

export function canSubmitPasswordReset(passwordResetData) {
  return (
    passwordResetData.email.includes('@') &&
    passwordResetData.new_password.length >= 6
  )
}
