import React from 'react'

export default function RadioButton({ label, name, value, checked, onChange }) {
  return React.createElement(
    'label',
    { className: 'form-radio' },
    React.createElement('input', { type: 'radio', name, value, checked, onChange }),
    React.createElement('span', null, label),
  )
}
