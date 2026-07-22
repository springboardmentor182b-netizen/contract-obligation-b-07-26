import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', events: 4, failed: 2 },
  { name: 'Tue', events: 10, failed: 1 },
  { name: 'Wed', events: 3, failed: 0 },
  { name: 'Thu', events: 11, failed: 3 },
  { name: 'Fri', events: 5, failed: 1 },
  { name: 'Sat', events: 2, failed: 0 },
  { name: 'Sun', events: 1, failed: 0 },
];

export default function SecurityChart() {
  return (
    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb', height: '350px' }}>
      <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', color: '#111827' }}>Security Events This Week</h3>
      <p style={{ margin: '0 0 20px 0', fontSize: '12px', color: '#6b7280' }}>Events and failed login attempts</p>
      
      <div style={{ height: '250px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
            <Tooltip cursor={{ fill: '#f3f4f6' }} />
            <Bar dataKey="events" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={20} />
            <Bar dataKey="failed" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}