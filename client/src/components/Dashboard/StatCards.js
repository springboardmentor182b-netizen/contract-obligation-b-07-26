import React from 'react'

const cardStyles = [
  ['D', 'blue'], ['A', 'green'], ['R', 'amber'], ['O', 'red'], ['C', 'cyan'],
]

export default function StatCards({ stats = [] }) {
  return React.createElement('section', { className: 'stat-cards', 'aria-label': 'Contract statistics' }, stats.map((stat, index) => {
    const [icon, tone] = cardStyles[index] || ['D', 'blue']
    return React.createElement('article', { className: 'stat-card', key: stat.key },
      React.createElement('div', { className: 'stat-card-top' }, React.createElement('span', { className: `stat-icon ${tone}` }, icon), React.createElement('span', { className: `stat-change ${stat.trend === 'down' ? 'negative' : ''}` }, stat.change || '')),
      React.createElement('strong', { className: 'stat-value' }, stat.value),
      React.createElement('span', { className: 'stat-label' }, stat.label),
      React.createElement('small', null, stat.detail || ''),
    )
  }))
}
