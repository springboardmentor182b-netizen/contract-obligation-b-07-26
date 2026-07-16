export const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/

export function canSubmitLogin(formData, roleTouched) {
  return formData.email.includes('@') && passwordPattern.test(formData.password) && roleTouched && Boolean(formData.role)
}

export function canSubmitRegistration(registrationData) {
  return (
    registrationData.name.trim().length >= 2 &&
    registrationData.email.includes('@') &&
    passwordPattern.test(registrationData.password)
  )
}

export function canSubmitPasswordReset(passwordResetData) {
  return passwordResetData.email.includes('@') && passwordPattern.test(passwordResetData.new_password)
}
