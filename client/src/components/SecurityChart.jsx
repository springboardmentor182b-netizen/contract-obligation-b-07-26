import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Added our smart variable right here!
const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL || process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000';

export default function SecurityChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Replaced the hardcoded URL with our variable
    fetch(`${API_BASE_URL}/system-metrics/`)
      .then(res => res.json())
      .then(result => setData(result.chart_data))
      .catch(err => console.error("Error fetching chart data:", err));
  }, []);

  return (
    <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', border: '1px solid #e5e7eb', height: '350px', boxSizing: 'border-box' }}>
      <h3 style={{ margin: '0 0 4px 0', fontSize: '16px', color: '#111827' }}>Security Events This Week</h3>
      <p style={{ margin: '0 0 20px 0', fontSize: '12px', color: '#6b7280' }}>Events and failed login attempts</p>
      
      <div style={{ height: '250px', width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
            <Tooltip cursor={{ fill: '#f3f4f6' }} />
            <Bar dataKey="events" fill="#2563eb" radius={[4, 4, 0, 0]} barSize={20} />
            <Bar dataKey="failures" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={20} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}