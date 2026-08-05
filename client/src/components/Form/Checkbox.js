import React from 'react'

export default function Checkbox({ label, checked, onChange, name }) {
  return React.createElement(
    'label',
    { className: 'form-checkbox' },
    React.createElement('input', { type: 'checkbox', name, checked, onChange }),
    React.createElement('span', null, label),
  )
}
