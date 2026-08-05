import React from 'react'

export default function ButtonGroup({ children, label }) {
  return React.createElement('div', { className: 'button-group', 'aria-label': label }, children)
}
