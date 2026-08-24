import React from 'react'

import LoginForm from '../features/authentication/components/LoginForm'

export default function Login() {
  return React.createElement('section', null, React.createElement('h1', null, 'Login'), React.createElement(LoginForm))
}
