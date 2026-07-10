import React from 'react'

export default function PageContainer({ children }) {
  return React.createElement('main', { className: 'page-container' }, children)
}
