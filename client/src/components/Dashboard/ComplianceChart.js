import React from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

const statusColors = {
  compliant: '#16a34a',
  pending: '#2563eb',
  delayed: '#f59e0b',
  'non-compliant': '#dc2626',
  'high risk': '#7c3aed',
  normal: '#64748b',
}
const fallbackColors = ['#0f766e', '#db2777', '#0891b2', '#ca8a04', '#4f46e5', '#be123c']

function colorForStatus(name, index) {
  return statusColors[String(name || '').trim().toLowerCase()] || fallbackColors[index % fallbackColors.length]
}

export default function ComplianceChart({ data = [] }) {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  return React.createElement('section', { className: 'dashboard-card compliance-card' },
    React.createElement('div', { className: 'card-heading' }, React.createElement('div', null, React.createElement('h2', null, 'Compliance Status'), React.createElement('p', null, 'All tracked obligations'))),
    React.createElement('div', { className: 'compliance-chart-area' }, React.createElement(ResponsiveContainer, { width: '100%', height: '100%' }, React.createElement(PieChart, null,
      React.createElement(Pie, { data, dataKey: 'value', nameKey: 'name', innerRadius: 53, outerRadius: 77, paddingAngle: 3, stroke: 'none' }, data.map((entry, index) => React.createElement(Cell, { key: entry.name, fill: colorForStatus(entry.name, index) }))),
      React.createElement(Tooltip, null),
    ))),
    React.createElement('div', { className: 'compliance-legend' }, data.map((item, index) => React.createElement('div', { className: 'compliance-row', key: item.name }, React.createElement('span', { className: 'legend-label' }, React.createElement('i', { style: { backgroundColor: colorForStatus(item.name, index) } }), item.name), React.createElement('strong', null, `${total ? Math.round(item.value * 100 / total) : 0}%`)))),
  )
}
