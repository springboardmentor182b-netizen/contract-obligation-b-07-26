import React from 'react'

export default function Modal({ open, title, children, onClose }) {
  if (!open) return null

  return React.createElement(
    'div',
    { className: 'modal-backdrop', role: 'presentation' },
    React.createElement(
      'section',
      { className: 'modal', role: 'dialog', 'aria-modal': 'true', 'aria-label': title },
      React.createElement('header', null, React.createElement('h2', null, title)),
      React.createElement('div', { className: 'modal-body' }, children),
      React.createElement('button', { type: 'button', onClick: onClose }, 'Close'),
    ),
  )
}
