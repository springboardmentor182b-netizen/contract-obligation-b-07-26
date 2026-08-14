import { renderToStaticMarkup } from 'react-dom/server'
import { PriorityBadge, StatusBadge } from './Badges'

test('PriorityBadge renders the High priority style and label', () => {
  const markup = renderToStaticMarkup(<PriorityBadge priority="High" />)

  expect(markup).toContain('badge-high')
  expect(markup).toContain('>High</span>')
})

test('StatusBadge renders the completed status style and label', () => {
  const markup = renderToStaticMarkup(<StatusBadge status="Completed" />)

  expect(markup).toContain('badge-completed')
  expect(markup).toContain('>Completed</span>')
})
