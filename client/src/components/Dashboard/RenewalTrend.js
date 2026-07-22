import React from 'react'
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

export default function RenewalTrend({ data = [] }) {
  return React.createElement('section', { className: 'dashboard-card chart-card' },
    React.createElement('div', { className: 'card-heading' }, React.createElement('div', null, React.createElement('h2', null, 'Renewals Trend'), React.createElement('p', null, 'Monthly renewal activity'))),
    React.createElement('div', { className: 'chart-area' }, React.createElement(ResponsiveContainer, { width: '100%', height: '100%' }, React.createElement(LineChart, { data },
      React.createElement(CartesianGrid, { vertical: false, stroke: '#eaf0f8' }),
      React.createElement(XAxis, { dataKey: 'month', axisLine: false, tickLine: false, tick: { fill: '#8aa0c6' } }),
      React.createElement(YAxis, { axisLine: false, tickLine: false, allowDecimals: false, tick: { fill: '#8aa0c6' } }),
      React.createElement(Tooltip, null),
      React.createElement(Line, { type: 'monotone', dataKey: 'renewals', stroke: '#f59a00', strokeWidth: 3, dot: { r: 4, fill: '#f59a00' }, activeDot: { r: 6 } }),
    ))),
  )
}
