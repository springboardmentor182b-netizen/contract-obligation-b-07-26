import React from 'react'

export default function SignupForm({ onSubmit }) {
  return React.createElement(
    'form',
    { onSubmit, className: 'auth-form' },
    React.createElement('input', { name: 'name', placeholder: 'Full name' }),
    React.createElement('input', { name: 'email', type: 'email', placeholder: 'Email' }),
    React.createElement('input', { name: 'password', type: 'password', placeholder: 'Password' }),
    React.createElement('button', { type: 'submit' }, 'Create account'),
  )
}
