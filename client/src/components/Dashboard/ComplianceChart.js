import React from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

const colors = ['#13b981', '#3c7ded', '#f59b0b', '#f25b61', '#7a45e8']

export default function ComplianceChart({ data = [] }) {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  return React.createElement('section', { className: 'dashboard-card compliance-card' },
    React.createElement('div', { className: 'card-heading' }, React.createElement('div', null, React.createElement('h2', null, 'Compliance Status'), React.createElement('p', null, 'All tracked obligations'))),
    React.createElement('div', { className: 'compliance-chart-area' }, React.createElement(ResponsiveContainer, { width: '100%', height: '100%' }, React.createElement(PieChart, null,
      React.createElement(Pie, { data, dataKey: 'value', nameKey: 'name', innerRadius: 53, outerRadius: 77, paddingAngle: 3, stroke: 'none' }, data.map((entry, index) => React.createElement(Cell, { key: entry.name, fill: colors[index % colors.length] }))),
      React.createElement(Tooltip, null),
    ))),
    React.createElement('div', { className: 'compliance-legend' }, data.map((item, index) => React.createElement('div', { className: 'compliance-row', key: item.name }, React.createElement('span', { className: 'legend-label' }, React.createElement('i', { style: { backgroundColor: colors[index % colors.length] } }), item.name), React.createElement('strong', null, `${total ? Math.round(item.value * 100 / total) : 0}%`)))),
  )
}
