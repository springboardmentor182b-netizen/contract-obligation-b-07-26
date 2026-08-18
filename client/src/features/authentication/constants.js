export const API_BASE_URL =
  import.meta.env.VITE_API_URL ||
  import.meta.env.VITE_API_BASE_URL ||
  'https://contractiq-server.onrender.com'

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

export const roleApiValues = {
  'Administrator': 'administrator',
  'Legal Manager': 'legal_manager',
  'Compliance Officer': 'compliance_officer',
  'Contract Manager': 'contract_manager',
  'Department Head': 'user',
  'Employee': 'user',
}

export const roleDisplayNames = {
  'administrator': 'Administrator',
  'legal_manager': 'Legal Manager',
  'compliance_officer': 'Compliance Officer',
  'contract_manager': 'Contract Manager',
  'department_head': 'Department Head',
  'employee': 'Employee',
}
