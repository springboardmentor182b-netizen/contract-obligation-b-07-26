import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Active', value: 89, color: '#10b981' }, // Green
  { name: 'In Review', value: 28, color: '#3b82f6' }, // Blue
  { name: 'Expired', value: 22, color: '#ef4444' }, // Red
  { name: 'Draft', value: 34, color: '#0ea5e9' }, // Light Blue
  { name: 'Approved', value: 67, color: '#f59e0b' }, // Orange/Yellow
];

export default function ContractStatusChart() {
  return (
    <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #f1f5f9', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
      <h3 style={{ margin: '0 0 5px 0', fontSize: '16px', color: '#0f172a' }}>Contract Status</h3>
      <p style={{ margin: '0 0 20px 0', fontSize: '13px', color: '#64748b' }}>Distribution by lifecycle stage</p>
      
      <div style={{ height: '220px', width: '100%', position: 'relative' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} innerRadius={60} outerRadius={80} paddingAngle={2} dataKey="value">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
              ))}
            </Pie>
            <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Custom Legend */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '20px' }}>
        {data.map((item) => (
          <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#475569' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color }}></span>
              {item.name}
            </div>
            <span style={{ fontWeight: '600', color: '#0f172a' }}>{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}