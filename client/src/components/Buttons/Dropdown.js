import React from 'react'

export default function Dropdown({ label, options = [], onSelect }) {
  return React.createElement(
    'select',
    {
      className: 'dropdown',
      'aria-label': label,
      onChange: (event) => onSelect?.(event.target.value),
    },
    options.map((option) =>
      React.createElement('option', { key: option.value, value: option.value }, option.label),
    ),
  )
}
