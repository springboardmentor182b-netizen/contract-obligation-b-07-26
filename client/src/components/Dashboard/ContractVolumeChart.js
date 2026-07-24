import React from 'react'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export default function ContractVolumeChart({ data = [] }) {
  return React.createElement('section', { className: 'dashboard-card chart-card' },
    React.createElement('div', { className: 'card-heading' }, React.createElement('div', null, React.createElement('h2', null, 'Contract Volume'), React.createElement('p', null, 'Monthly contract lifecycle activity'))),
    React.createElement('div', { className: 'chart-area' }, React.createElement(ResponsiveContainer, { width: '100%', height: '100%' }, React.createElement(BarChart, { data, barGap: 5 },
      React.createElement(CartesianGrid, { vertical: false, stroke: '#eaf0f8' }),
      React.createElement(XAxis, { dataKey: 'month', axisLine: false, tickLine: false, tick: { fill: '#8aa0c6' } }),
      React.createElement(YAxis, { axisLine: false, tickLine: false, allowDecimals: false, tick: { fill: '#8aa0c6' } }),
      React.createElement(Tooltip, { cursor: { fill: '#f5f8fd' } }),
      React.createElement(Legend, { verticalAlign: 'top', align: 'right', iconType: 'circle' }),
      React.createElement(Bar, { dataKey: 'active', name: 'Active', fill: '#3d7ded', radius: [4, 4, 0, 0] }),
      React.createElement(Bar, { dataKey: 'new', name: 'New', fill: '#16b985', radius: [4, 4, 0, 0] }),
      React.createElement(Bar, { dataKey: 'expired', name: 'Expired', fill: '#ef555b', radius: [4, 4, 0, 0] }),
    ))),
  )
}
