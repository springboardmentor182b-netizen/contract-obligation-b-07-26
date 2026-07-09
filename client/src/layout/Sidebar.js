import React from 'react'

export default function Sidebar({ items = [] }) {
  return React.createElement(
    'aside',
    { className: 'sidebar' },
    items.map((item) => React.createElement('a', { key: item.href, href: item.href }, item.label)),
  )
}
