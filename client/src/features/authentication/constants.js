export const API_BASE_URL = 'http://127.0.0.1:8000'

export const emptyCredentials = {
  email: '',
  password: '',
  role: '',
}

export const emptyRegistration = {
  name: '',
  email: '',
  password: '',
  role: '',
  department: '',
}

export const emptyPasswordReset = {
  email: '',
  new_password: '',
}

export const roles = [
  'Administrator',
  'Legal Manager',
  'Compliance Officer',
  'Contract Manager',
  'Department Head',
  'Employee',
]
