import React from 'react'

export default function FormInput({ label, name, type = 'text', value, onChange, placeholder }) {
  return React.createElement(
    'label',
    { className: 'form-field' },
    React.createElement('span', null, label),
    React.createElement('input', { name, type, value, onChange, placeholder }),
  )
}
