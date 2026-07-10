import React from 'react'

export default function FormSelect({ label, name, value, onChange, options = [] }) {
  return React.createElement(
    'label',
    { className: 'form-field' },
    React.createElement('span', null, label),
    React.createElement(
      'select',
      { name, value, onChange },
      options.map((option) =>
        React.createElement('option', { key: option.value, value: option.value }, option.label),
      ),
    ),
  )
}
